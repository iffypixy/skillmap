declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV: string;
			REDIS_HOST: string;
			REDIS_PORT: string;
			GEMINI_API_KEY: string;
			SESSION_SECRET_KEY: string;
			CLIENT_ORIGIN: string;
			PORT: string;
			OPENAI_API_KEY: string;
			GEMINI_API_KEY: string;
		}
	}
}

export {};
