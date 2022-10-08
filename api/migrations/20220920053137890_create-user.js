const { PgLiteral } = require('../node_modules/node-pg-migrate/dist/index');

exports.shorthands = {
  createdAt: {
    type: 'timestamp without time zone',
    default: new PgLiteral('current_timestamp'),
  },
  updatedAt: {
    type: 'timestamp without time zone',
  },
};

exports.up = (pgm) => {
  pgm.createSchema('v2');
  pgm.createTable(
    { schema: 'v2', name: 'app_user_role' },
    {
      id: 'id',
      name: 'varchar(32)',
      created_at: 'createdAt',
      updated_at: 'updatedAt',
    }
  );
  pgm.createTable(
    { schema: 'v2', name: 'app_user' },
    {
      id: 'id',
      username: {
        type: 'varchar(36)',
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
      app_user_role_id: {
        type: 'integer',
        references: { schema: 'v2', name: 'app_user_role' },
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
