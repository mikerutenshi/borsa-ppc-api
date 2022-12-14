const Roles = {
  superuser: 'superuser',
  production: 'production',
  finance: 'finance',
  qualityControl: 'quality_control',
};

const Status = {
  200: 'OK',
  201: 'Created',
  400: 'Bad Request',
  409: 'Conflict',
  404: 'Not Found',
  403: 'Forbidden',
  500: 'Internal Server Error',
};

export { Roles, Status };
