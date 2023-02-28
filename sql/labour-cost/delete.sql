DELETE FROM factory.labour_cost
WHERE factory.labour_cost.id in (${id:csv})
