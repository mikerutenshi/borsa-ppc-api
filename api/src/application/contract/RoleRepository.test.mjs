import ProjectDependencies from '../../di/projectDependencies.mjs';
import Role from '../../model/Role.mjs';
import Roles from '../../model/Roles.mjs';

describe('Test role repository methods', () => {
  const { RoleRepository } = ProjectDependencies.DatabaseService;
  const role = new Role(Roles.production);
  test('Add method', async () => {
    const newRole = await RoleRepository.add(role);
    expect(newRole.name).toBe(Roles.production);
  });
});
