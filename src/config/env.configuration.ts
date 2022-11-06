export const configurationEnv = () => ({
  database: {
    host: process.env.HOST,
    port: process.env.PORT_DATABASE,
    database: process.env.DATABASE,
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
  },
  storage: {
    aws_bucket: process.env.AWS_BUCKET,
    aws_region: process.env.AWS_REGION,
    aws_public_key: process.env.AWS_PUBLIC_KEY,
    aws_secret_key: process.env.AWS_SECRET_KEY,
  },
});
