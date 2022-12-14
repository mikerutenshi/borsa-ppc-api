UPDATE factory.user SET
first_name = ${first_name},
last_name = ${last_name},
role_id = ${role_id},
is_active = ${is_active:raw}
WHERE id = ${id}
RETURNING id, username, first_name, last_name, role_id, is_active, refresh_token, refresh_token_exp_date
