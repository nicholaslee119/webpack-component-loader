import buildJSandCSS from './buildJSandCSS';
import buildTemplate from './buildTemplate';

export default function buildComponents(components, buildOption) {
  buildJSandCSS(components, buildOption);
  buildTemplate(components, buildOption);
}
