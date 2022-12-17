import ProjectDependencies from '../../di/projectDependencies.mjs';
import { ValidationError } from '../../model/Error.mjs';
import { finance, invalidRole, production } from '../../model/mock/Roles.mjs';
import Role from '../../model/Role.mjs';
import Roles from '../../model/Roles.mjs';

describe('Test role repository methods', () => {
  const { RoleRepository } = ProjectDependencies.DatabaseService;
  test('Add valid', async () => {
    const newRole = await RoleRepository.add(production);
    const newRole1 = await RoleRepository.add(finance);
    expect(newRole.name).toBe(Roles.production);
    expect(newRole1.name).toBe(Roles.finance);
  });

  //test('Add invalid', async () => {
  //  await RoleRepository.add(invalidRole).catch((err) => {
  //    expect(err.body).toHaveProperty('name');
  //  });
  //  await expect(RoleRepository.add(invalidRole)).rejects.toThrow(
  //    ValidationError
  //  );
  //});

  test('Get roles', async () => {
    const results = await RoleRepository.getAll();
    expect(results).toHaveLength(2);
  });

  test('Update role', async () => {
    finance.name = Roles.superuser;
    finance.id = 2;
    const results = await RoleRepository.update(finance);
    expect(results[0].name).toBe(Roles.superuser);
  });

  test('Get role by id', async () => {
    const results = await RoleRepository.getById(2);
    expect(results[0].id).toBe(2);
  });

  test('get role by prop name', async () => {
    const results = await RoleRepository.getByProp('name', finance.name);
    expect(results[0]).toHaveProperty('name');
    expect(results[0].name).toBe(finance.name);
  });

  test('Delete role', async () => {
    await RoleRepository.delete(2);
    expect(await RoleRepository.getById(2)).toHaveLength(0);
  });
});
