UPDATE factory.product SET 
code = ${code},
product_group_id = ${product_group_id},
attributes = ${attributes}
WHERE id = ${id} RETURNING *
