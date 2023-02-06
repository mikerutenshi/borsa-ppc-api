INSERT INTO factory.product_category_type(name, parent_id) 
VALUES(${name}, ${parent_id}) RETURNING *
