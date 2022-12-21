UPDATE factory.product_category SET 
name = ${name},
product_category_type_id = ${product_category_type_id},
parent_id = ${parent_id}
WHERE id = ${id} RETURNING *
