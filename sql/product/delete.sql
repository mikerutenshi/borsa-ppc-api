DELETE FROM factory.product
WHERE factory.product.id in (${id:csv})
