import { QueryFile } from 'pg-promise';

interface SqlFiles {
  [method: string]: QueryFile;
}

interface ArbitraryModel {
  [property: string]: string;
}

export { SqlFiles, ArbitraryModel };
