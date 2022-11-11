INSERT INTO 
factory.user(username, first_name, last_name, password, role_id) 
VALUES(
  ${username}, ${first_name}, ${last_name}, ${password}, ${role_id}
)
RETURNING *
