import { GenericError } from '../../model/Error.mjs';

export const AddRole = (roleRepository) => {
  const execute = async (role) => {
    const roles = await roleRepository.getByProp('name', role.name);

    if (roles.length == 0) {
      return await roleRepository.add(role);
    } else {
      throw new GenericError(409, 'Role already exists');
    }
  };
  return { execute };
};
export const GetRoles = (roleRepository) => {
  const execute = async () => {
    return await roleRepository.getAll();
  };
  return { execute };
};
export const GetFilteredRoles = (roleRepository) => {
  const execute = async (key, value) => {
    return await roleRepository.getByProp(key, value);
  };
  return { execute };
};
export const GetRole = (roleRepository) => {
  const execute = async (id) => {
    return await roleRepository.getById(id);
  };

  return { execute };
};
export const UpdateRole = (roleRepository) => {
  const execute = async (id, data) => {
    data.id = id;
    return await roleRepository.update(data);
  };

  return { execute };
};
export const DeleteRole = (roleRepository) => {
  const execute = async (id) => {
    const isSuccess = await roleRepository.delete(id);
    return isSuccess;
  };

  return { execute };
};
