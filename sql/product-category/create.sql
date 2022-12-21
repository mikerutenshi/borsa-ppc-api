INSERT INTO factory.product_category(name, product_category_type_id, parent_id) 
VALUES(${name}, ${product_category_type_id}, ${parent_id}) RETURNING *
