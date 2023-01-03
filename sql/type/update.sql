UPDATE factory.${table~} SET
name = ${name}
WHERE id = ${id} RETURNING *
