DELETE FROM factory.material_group
WHERE factory.material_group.id in (${id:csv})
