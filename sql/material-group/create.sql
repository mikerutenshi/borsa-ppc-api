INSERT INTO factory.material_group(name, material_type_id) 
VALUES(${name}, ${material_type_id}) RETURNING *
