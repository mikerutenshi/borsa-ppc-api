UPDATE factory.material SET 
name = ${name},
attributes = ${attributes},
material_group_id = ${material_group_id}
WHERE id = ${id} RETURNING *
