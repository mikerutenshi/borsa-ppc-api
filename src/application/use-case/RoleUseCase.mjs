import { GenericError } from '../../model/Error.mjs';
import { BaseUseCase } from './BaseUseCase.mjs';

export const AddRole = (roleRepository) => {
  return BaseUseCase(async (role) => {
    const roles = await roleRepository.getByName(role.name);

    if (roles.length == 0) {
      const roles = await roleRepository.add(role);
      const results = roles.map((role) => {
        const { id, ...rest } = role;
        return rest;
      });
      return results;
    } else {
      throw new GenericError(409, 'Role already exists');
    }
  });
};
export const GetRoles = (roleRepository) => {
  return BaseUseCase(async () => {
    const roles = await roleRepository.getAll();
    const results = roles.map((role) => {
      const { id, ...rest } = role;
      return rest;
    });
    return results;
  });
};
export const GetFilteredRoles = (roleRepository) => {
  return BaseUseCase(async (key, value) => {
    return await roleRepository.getByProp(key, value);
  });
};
export const GetRole = (roleRepository) => {
  return BaseUseCase(async (id) => {
    return await roleRepository.getById(id);
  });
};
export const UpdateRole = (roleRepository) => {
  return BaseUseCase(async (id, data) => {
    const roleDuplicates = await roleRepository.getByName(data.name);
    const roleExists = await roleRepository.getById(id);

    if (roleExists.length == 0) {
      throw new GenericError(404, 'Role not found');
    }

    if (roleDuplicates.length > 0) {
      throw new GenericError(409, 'Role already exists');
    }

    data.id = id;
    return await roleRepository.update(data);
  });
};
export const DeleteRole = (roleRepository) => {
  return BaseUseCase(async (id) => {
    const foundRoles = await roleRepository.getById(id);

    if (foundRoles.length > 0) {
      await roleRepository.delete(id);
    } else {
      throw new GenericError(404, 'Role not found');
    }
  });
};
