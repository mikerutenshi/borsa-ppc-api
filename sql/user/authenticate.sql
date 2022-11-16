UPDATE factory.user SET
refresh_token = ${refresh_token},
refresh_token_exp_date = ${refresh_token_exp_date}
WHERE id = ${id} RETURNING *
