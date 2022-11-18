UPDATE factory.role SET
name = ${name}
WHERE id = ${id} RETURNING *
