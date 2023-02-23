DELETE FROM factory.product_group
WHERE factory.product_group.id in (${id:csv})
