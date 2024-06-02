export const config = () => ({
	redis: {
		host: process.env.REDIS_HOST,
		port: +process.env.REDIS_PORT,
	},
	session: {
		secretKey: process.env.SESSION_SECRET_KEY,
	},
	database: {
		host: process.env.DATABASE_HOST,
		port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
	},
});
