SELECT * FROM factory.product_group
WHERE ${column~} ilike '%${value#}%'
ORDER BY ${order_by} ${direction}
LIMIT $[limit]
