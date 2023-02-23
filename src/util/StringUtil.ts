const prettierTableName = (tableName: string): string => {
  return tableName
    ? tableName
        .split('_')
        .map((s) => s[0].toUpperCase() + s.substring(1))
        .join(' ')
    : '';
};

export { prettierTableName };
