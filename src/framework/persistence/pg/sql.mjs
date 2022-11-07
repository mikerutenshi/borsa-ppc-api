import { QueryFile } from 'pg-promise';
import { join, resolve } from 'path';

const sql = (file) => {
  const fullPath = join(resolve('./sql'), file);
  return new QueryFile(fullPath, { minify: true });
};
