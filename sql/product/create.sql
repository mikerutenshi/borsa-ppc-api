INSERT INTO factory.product(code, product_group_id, attributes) 
VALUES(${code}, ${product_group_id}, ${attributes}) RETURNING *
