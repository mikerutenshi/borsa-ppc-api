SELECT id, username, first_name, last_name, role_id, is_active, refresh_token, refresh_token_exp_date FROM factory.user
WHERE ${column~} = ${value}
