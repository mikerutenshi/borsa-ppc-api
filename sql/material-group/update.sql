UPDATE factory.material_group SET 
name = ${name},
material_type_id = ${material_type_id}
WHERE id = ${id} RETURNING *
