/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable(
    { schema: 'factory', name: 'material_type' },
    {
      id: 'id',
      name: 'varchar(16)',
      created_at: 'createdAt',
      updated_at: 'updatedAt',
    }
  );

  pgm.createTable(
    { schema: 'factory', name: 'job_type' },
    {
      id: 'id',
      name: 'varchar(16)',
      created_at: 'createdAt',
      updated_at: 'updatedAt',
    }
  );

  pgm.createTable(
    { schema: 'factory', name: 'job_status' },
    {
      id: 'id',
      name: 'varchar(16)',
      created_at: 'createdAt',
      updated_at: 'updatedAt',
    }
  );

  pgm.createTable(
    { schema: 'factory', name: 'size' },
    {
      id: 'id',
      name: 'varchar(16)',
      created_at: 'createdAt',
      updated_at: 'updatedAt',
    }
  );

  pgm.createTable(
    { schema: 'factory', name: 'color' },
    {
      id: 'id',
      name: 'varchar(16)',
      created_at: 'createdAt',
      updated_at: 'updatedAt',
    }
  );

  pgm.createTable(
    { schema: 'factory', name: 'material_group' },
    {
      id: 'id',
      name: 'varchar(16)',
      material_type_id: {
        type: 'integer',
        references: { schema: 'factory', name: 'material_type' },
      },
      created_at: 'createdAt',
      updated_at: 'updatedAt',
      created_by: 'createdBy',
      updated_by: 'updatedBy',
    }
  );

  pgm.createTable(
    { schema: 'factory', name: 'material' },
    {
      id: 'id',
      name: 'varchar(16)',
      attributes: 'jsonb',
      created_at: 'createdAt',
      updated_at: 'updatedAt',
      created_by: 'createdBy',
      updated_by: 'updatedBy',
    }
  );

  pgm.createTable(
    { schema: 'factory', name: 'bill_of_material' },
    {
      product_id: {
        type: 'integer',
        references: { schema: 'factory', name: 'product' },
      },
      material_id: {
        type: 'integer',
        references: { schema: 'factory', name: 'material' },
      },
      qty_req: {
        type: 'numeric(4, 2)',
      },
      created_at: 'createdAt',
      updated_at: 'updatedAt',
      created_by: 'createdBy',
      updated_by: 'updatedBy',
    }
  );

  pgm.createTable(
    { schema: 'factory', name: 'labour_cost' },
    {
      id: 'id',
      product_group_id: {
        type: 'integer',
        references: { schema: 'factory', name: 'product_group' },
      },
      job_type_id: {
        type: 'integer',
        references: { schema: 'factory', name: 'job_type' },
      },
      cost: 'integer',
      created_at: 'createdAt',
      updated_at: 'updatedAt',
      created_by: 'createdBy',
      updated_by: 'updatedBy',
    }
  );
};
