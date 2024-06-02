import {Redirect, Route, RouteProps} from "wouter";

import {useCredentials} from "@shared/queries/auth";

export const PublicOnlyRoute: React.FC<RouteProps> = (props) => {
	const {isAuthenticated} = useCredentials();

	if (isAuthenticated) return <Redirect to="/" />;

	return <Route {...props} />;
};

export const PrivateRoute: React.FC<RouteProps> = (props) => {
	const {isAuthenticated} = useCredentials();

	if (isAuthenticated) return <Route {...props} />;

	return <Redirect to="/" />;
};
