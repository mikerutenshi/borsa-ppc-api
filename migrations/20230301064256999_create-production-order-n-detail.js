/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable(
    { schema: 'factory', name: 'production_order' },
    {
      id: 'id',
      code: 'name',
      created_at: 'createdAt',
      updated_at: 'updatedAt',
      created_by: 'createdBy',
      updated_by: 'updatedBy',
    }
  );

  pgm.createTable(
    { schema: 'factory', name: 'production_order_detail' },
    {
      id: 'id',
      production_order_id: 'name',
      size_id: {
        type: 'integer',
        references: { schema: 'factory', name: 'size' },
      },
      quantity: 'integer',
      created_at: 'createdAt',
      updated_at: 'updatedAt',
      created_by: 'createdBy',
      updated_by: 'updatedBy',
    }
  );

  pgm.dropConstraint(
    { schema: 'factory', name: 'production_order_detail' },
    'production_order_detail_pkey',
    { ifExists: true }
  );
  pgm.addConstraint(
    { schema: 'factory', name: 'production_order_detail' },
    'production_order_detail_pkey',
    {
      primaryKey: ['id', 'production_order_id', 'size_id'],
    }
  );
};

exports.down = (pgm) => {};
