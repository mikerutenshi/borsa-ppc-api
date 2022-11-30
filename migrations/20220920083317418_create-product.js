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
    { schema: 'factory', name: 'product_category' },
    {
      id: 'id',
      name: 'varchar(16)',
      parent_id: {
        type: 'integer',
        references: { schema: 'factory', name: 'product_category' },
      },
      created_at: 'createdAt',
      updated_at: 'updatedAt',
    }
  );

  pgm.createTable(
    { schema: 'factory', name: 'product_category_type' },
    {
      id: 'id',
      name: 'varchar(16)',
      parent_id: {
        type: 'integer',
        references: { schema: 'factory', name: 'product_category_type' },
      },
      created_at: 'createdAt',
      updated_at: 'updatedAt',
    }
  );

  pgm.createTable(
    { schema: 'factory', name: 'product_group' },
    {
      id: 'id',
      code: 'varchar(16)',
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
  pgm.createTable(
    { schema: 'factory', name: 'product' },
    {
      id: 'id',
      code: 'varchar(16)',
      product_group_id: {
        type: 'integer',
        references: { schema: 'factory', name: 'product_group' },
      },
      attributes: 'jsonb',
      created_at: 'createdAt',
      updated_at: 'updatedAt',
      created_by: 'createdBy',
      updated_by: 'updatedBy',
    }
  );
};
