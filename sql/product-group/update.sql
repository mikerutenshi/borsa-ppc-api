UPDATE factory.product_group SET 
code = ${code},
name = ${name},
product_category_id = ${product_category_id}
WHERE id = ${id} RETURNING *
