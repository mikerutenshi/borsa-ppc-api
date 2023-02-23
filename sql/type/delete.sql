DELETE FROM factory.${table_name~}
WHERE factory.${table_name~}.id in (${id:csv})
