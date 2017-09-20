import path from 'path';
import fs from 'fs';

export default function parsePage(source, extractor, srcPath, components, pushedComponents) {
  const includes = extractor(source);
  if (!includes) return null;
  includes.forEach((componentPath) => {
    if (pushedComponents.get(componentPath)) return;
    pushedComponents.set(componentPath, true);
    const parsed = path.parse(componentPath);
    components.push(parsed)
    parsePage(fs.readFileSync(path.join(srcPath, parsed.dir, parsed.name, parsed.base), 'utf8'), extractor, srcPath, components, pushedComponents);
  });
}