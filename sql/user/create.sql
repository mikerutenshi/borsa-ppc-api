INSERT INTO 
factory.user(username, first_name, last_name, password, role_id) 
VALUES(
  ${username}, ${first_name}, ${last_name}, ${password}, ${role_id}
)
RETURNING username, first_name, last_name, role_id, is_active
