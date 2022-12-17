SELECT id, username, first_name, last_name, password, role_id, is_active, refresh_token, refresh_token_exp_date FROM factory.user
WHERE ${column~} = ${value}
