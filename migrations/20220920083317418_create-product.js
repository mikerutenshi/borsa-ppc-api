/* eslint-disable camelcase */

exports.shorthands = {
  createdBy: {
    type: 'integer',
    references: { schema: 'factory', name: 'user' },
  },
  updatedBy: {
    type: 'integer',
    references: { schema: 'factory', name: 'user' },
  },
};

exports.up = (pgm) => {
  pgm.createTable(
    { schema: 'factory', name: 'product_category_type' },
    {
      id: 'id',
      name: 'name',
      parent_id: {
        type: 'integer',
        references: { schema: 'factory', name: 'product_category_type' },
      },
      created_at: 'createdAt',
      updated_at: 'updatedAt',
    }
  );

  pgm.createTable(
    { schema: 'factory', name: 'product_category' },
    {
      id: 'id',
      name: 'name',
      parent_id: {
        type: 'integer',
        references: { schema: 'factory', name: 'product_category' },
      },
      product_category_type_id: {
        type: 'integer',
        references: {
          schema: 'factory',
          name: 'product_category_type',
        },
        onDelete: 'cascade',
      },
      created_at: 'createdAt',
      updated_at: 'updatedAt',
    }
  );

  pgm.createTable(
    { schema: 'factory', name: 'product_group' },
    {
      id: 'id',
      code: 'name',
      name: 'varchar(36)',
      product_category_id: {
        type: 'integer',
        references: { schema: 'factory', name: 'product_category' },
      },
      created_at: 'createdAt',
      updated_at: 'updatedAt',
      created_by: 'createdBy',
      updated_by: 'updatedBy',
    }
  );
  pgm.createIndex({ schema: 'factory', name: 'product_group' }, [
    'code',
    'name',
  ]);

  pgm.createTable(
    { schema: 'factory', name: 'product' },
    {
      id: 'id',
      code: 'name',
      product_group_id: {
        type: 'integer',
        references: { schema: 'factory', name: 'product_group' },
        onDelete: 'cascade',
      },
      attributes: 'jsonb',
      created_at: 'createdAt',
      updated_at: 'updatedAt',
      created_by: 'createdBy',
      updated_by: 'updatedBy',
    }
  );
  pgm.createIndex({ schema: 'factory', name: 'product' }, 'code');
};
