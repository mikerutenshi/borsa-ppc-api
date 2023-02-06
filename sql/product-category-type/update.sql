UPDATE factory.product_category_type SET
name = ${name},
parent_id = ${parent_id}
WHERE id = ${id} RETURNING *
