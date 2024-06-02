import {useCredentials} from "@shared/queries";

import {AuthenticatedHomePage} from "./authenticated";
import {GuestHomePage} from "./guest";

export const HomePage: React.FC = () => {
	const {isAuthenticated} = useCredentials();

	return isAuthenticated ? <AuthenticatedHomePage /> : <GuestHomePage />;
};
