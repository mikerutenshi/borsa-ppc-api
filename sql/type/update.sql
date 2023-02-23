UPDATE factory.${table_name~} SET
name = ${name}
WHERE id = ${id} RETURNING *
