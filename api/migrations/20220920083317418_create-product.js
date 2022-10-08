/* eslint-disable camelcase */

exports.shorthands = {
  createdBy: {
    type: 'integer',
    references: { schema: 'v2', name: 'app_user' },
  },
  updatedBy: {
    type: 'integer',
    references: { schema: 'v2', name: 'app_user' },
  },
};

exports.up = (pgm) => {
  pgm.createTable(
    { schema: 'v2', name: 'gender' },
    {
      id: 'id',
      name: 'varchar(16)',
      created_at: 'createdAt',
      updated_at: 'updatedAt',
      created_by: 'createdBy',
      updated_by: 'updatedBy',
    }
  );
  pgm.createTable(
    { schema: 'v2', name: 'product_category' },
    {
      id: 'id',
      name: 'varchar(32)',
      gender_id: {
        type: 'integer',
        references: { schema: 'v2', name: 'gender' },
      },
      created_at: 'createdAt',
      updated_at: 'updatedAt',
      created_by: 'createdBy',
      updated_by: 'updatedBy',
    }
  );
  pgm.createTable(
    { schema: 'v2', name: 'product' },
    {
      id: 'id',
      code: 'varchar(16)',
      name: 'varchar(32)',
      created_at: 'createdAt',
      updated_at: 'updatedAt',
      product_category_id: {
        type: 'integer',
        references: { schema: 'v2', name: 'product_category' },
      },
      created_at: 'createdAt',
      updated_at: 'updatedAt',
      created_by: 'createdBy',
      updated_by: 'updatedBy',
    }
  );
};
