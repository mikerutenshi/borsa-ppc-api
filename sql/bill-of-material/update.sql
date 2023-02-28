UPDATE factory.bill_of_material SET 
product_id = ${product_id},
material_id = ${material_id},
qty_req = ${qty_req}
WHERE id = ${id} RETURNING *
