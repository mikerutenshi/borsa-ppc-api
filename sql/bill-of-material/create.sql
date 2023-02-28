INSERT INTO factory.bill_of_material(product_id, material_id, qty_req) 
VALUES(${product_id}, ${material_id}, ${qty_req}) RETURNING *
