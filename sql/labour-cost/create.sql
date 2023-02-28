INSERT INTO factory.labour_cost(product_group_id, job_type_id, cost) 
VALUES(${product_group_id}, ${job_type_id}, ${cost}) RETURNING *
