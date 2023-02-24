DELETE FROM factory.material
WHERE factory.material.id in (${id:csv})
