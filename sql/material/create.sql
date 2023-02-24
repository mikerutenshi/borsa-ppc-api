INSERT INTO factory.material(name, attributes, material_group_id) 
VALUES(${name}, ${attributes}, ${material_group_id}) RETURNING *
