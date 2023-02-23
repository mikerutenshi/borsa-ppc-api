DELETE FROM factory.user
WHERE factory.user.id in (${id:csv})
