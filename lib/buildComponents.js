import path from 'path';
import fs from 'fs';
import fsx from 'fs-extra';

import buildJSandCSS from './buildJSandCSS';
import buildTemplate from './buildTemplate';

export default function buildComponents(components, buildOption) {
  buildJSandCSS(components, buildOption);
  buildTemplate(components, buildOption);
}
