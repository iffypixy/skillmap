import OpenAI from "openai";

import {Nullable} from "./types";

export const openai: {
	client: Nullable<OpenAI>;
	setUp(): void;
} = {
	client: null,
	setUp() {
		this.client = new OpenAI({
			apiKey: process.env.OPENAI_API_KEY,
		});
	},
};
