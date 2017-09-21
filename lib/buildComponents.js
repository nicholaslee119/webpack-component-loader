import buildJSandCSS from './buildJSandCSS';
import buildTemplate from './buildTemplate';

export default function buildComponents(components, injector, buildOption) {
  buildJSandCSS(components, injector, buildOption);
  buildTemplate(components, buildOption);
}
