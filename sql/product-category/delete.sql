DELETE FROM factory.product_category
WHERE factory.product_category.id in (${id:csv})
