UPDATE factory.labour_cost SET 
product_group_id = ${product_group_id},
job_type_id = ${job_type_id},
cost = ${cost}
WHERE id = ${id} RETURNING *
