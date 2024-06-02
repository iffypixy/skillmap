import {GoogleGenerativeAI} from "@google/generative-ai";

import {Nullable} from "./types";

export const gemini: {
	client: Nullable<GoogleGenerativeAI>;
	setUp(): void;
} = {
	client: null,
	setUp() {
		this.client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
	},
};
