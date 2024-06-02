import {Credentials} from "@entities/user";
import {request} from "@shared/lib/request";
import {Dto} from "@shared/lib/types";

export type GetCredentialsDto = Dto<
	void,
	{
		credentials: Credentials;
	}
>;

export const getCredentials = () =>
	request<GetCredentialsDto["res"]>({
		url: "/auth/credentials",
		method: "GET",
	});

export type SignUpAnonymouslyDto = Dto<
	void,
	{
		credentials: Credentials;
	}
>;

export const signUpAnonymously = () =>
	request<SignUpAnonymouslyDto["res"]>({
		url: "/auth/register/anonym",
		method: "POST",
	});
