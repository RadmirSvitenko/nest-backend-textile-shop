export default () => ({
  port: process.env.PORT,
  db_port: process.env.DB_PORT,
  db_host: process.env.DB_HOST,
  db_username: process.env.DB_USERNAME,
  db_password: process.env.DB_PASSWORD,
  db_name: process.env.DB_NAME,
  secret_jwt: process.env.SECRET_JWT_TOKEN,
  expire_jwt: process.env.EXPIRE_JWT_TOKEN,
})
