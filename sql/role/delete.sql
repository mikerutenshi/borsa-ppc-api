DELETE FROM factory.role
WHERE factory.role.id in (${id:csv})
