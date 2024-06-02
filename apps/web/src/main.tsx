import {createRoot} from "react-dom/client";
import {QueryClientProvider} from "@tanstack/react-query";

import {CredentialsLoader} from "@features/auth";
import {queryClient} from "@shared/queries/client";

import {App} from "./app";

import "./index.css";

const root = document.getElementById("root")!;

createRoot(root).render(
	<QueryClientProvider client={queryClient}>
		<CredentialsLoader>
			<App />
		</CredentialsLoader>
	</QueryClientProvider>,
);
