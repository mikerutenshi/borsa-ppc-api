import express from 'express';

export default (dependencies) => {
  const router = express.Router();
  const controller = RoleController(dependencies);
};
