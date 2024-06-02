import {createQueryKeys} from "@lukemorales/query-key-factory";
import {useMutation, useQuery} from "@tanstack/react-query";

import {api} from "@shared/api";
import {Nullable} from "@shared/lib/types";
import {Credentials} from "@entities/user";
import {queryClient} from "./client";

const keys = createQueryKeys("auth", {
	getCredentials: ["get-credentials"],
	signUpAnonymously: ["sign-up-anonymously"],
});

export const authKeys = keys;

export const useCredentials = () => {
	const {data, ...query} = useQuery({
		...keys.getCredentials,
		queryFn: async () => {
			const res = await api.auth.getCredentials();

			return res.data;
		},
	});

	const credentials = data?.credentials;
	const isAuthenticated = Boolean(credentials);

	return {credentials, isAuthenticated, ...query} as const;
};

export const useSignUpAnonymously = () => {
	const {mutateAsync: signUpAnonymously, ...mutation} = useMutation({
		...keys.signUpAnonymously,
		mutationFn: async () => {
			const res = await api.auth.signUpAnonymously();

			return res.data;
		},
	});

	return {signUpAnonymously, ...mutation} as const;
};

export const setCredentials = (credentials: Nullable<Credentials>) => {
	queryClient.setQueryData(keys.getCredentials.queryKey, {
		credentials,
	});
};
