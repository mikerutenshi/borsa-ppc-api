export default {
  nodeEnv: process.env.NODE_ENV,
  postgres: {
    url: process.env.DATABASE_URL,
  },
  port: process.env.PORT || 8000,
  jwtSecret: process.env.JWT_SECRET || 'e3VmKxw77xb8RxMspoB6',
  accessTokenExpIn: process.env.ACCESS_TOKEN_EXP_IN || '24h',
};
