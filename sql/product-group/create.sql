INSERT INTO factory.product_group(name, product_category_id) 
VALUES(${name}, ${product_category_id}) RETURNING *
