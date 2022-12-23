export default {
  transformTableName(tableName: string): string {
    return tableName
      .split('_')
      .map((s) => s[0].toUpperCase() + s.substring(1))
      .join(' ');
  },
};
