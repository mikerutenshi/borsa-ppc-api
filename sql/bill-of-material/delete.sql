DELETE FROM factory.bill_of_material
WHERE factory.bill_of_material.id in (${id:csv})
