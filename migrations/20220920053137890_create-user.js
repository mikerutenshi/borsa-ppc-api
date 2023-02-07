const { PgLiteral } = require('../node_modules/node-pg-migrate/dist/index');

exports.shorthands = {
  createdAt: {
    type: 'timestamp without time zone',
    default: new PgLiteral('current_timestamp'),
  },
  updatedAt: {
    type: 'timestamp without time zone',
  },
  name: {
    type: 'varchar(32)',
  },
};

exports.up = (pgm) => {
  pgm.createSchema('factory');
  pgm.createTable(
    { schema: 'factory', name: 'role' },
    {
      id: 'id',
      name: 'name',
      created_at: 'createdAt',
      updated_at: 'updatedAt',
    }
  );
  pgm.createTable(
    { schema: 'factory', name: 'user' },
    {
      id: 'id',
      username: {
        type: 'name',
        notNull: true,
        unique: true,
      },
      first_name: {
        type: 'varchar(16)',
        notNull: true,
      },
      last_name: 'varchar(24)',
      password: {
        type: 'varchar',
        notNull: true,
      },
      role_id: {
        type: 'integer',
        references: { schema: 'factory', name: 'role' },
      },
      is_active: {
        type: 'boolean',
        default: false,
      },
      refresh_token: 'char(60)',
      refresh_token_exp_date: 'timestamp without time zone',
      created_at: 'createdAt',
      updated_at: 'updatedAt',
    }
  );
};
