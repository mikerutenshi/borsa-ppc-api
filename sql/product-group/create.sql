INSERT INTO factory.product_group(code, name, product_category_id) 
VALUES(${code}, ${name}, ${product_category_id}) RETURNING *
