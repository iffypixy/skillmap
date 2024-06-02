import {Route, Switch} from "wouter";

import {HomePage} from "./home";
import {SignInPage} from "./sign-in";
import {SignUpPage} from "./sign-up";

export const Routes: React.FC = () => (
	<Switch>
		<Route path="/:roadmapId?/:topicId?" component={HomePage} />
		<Route path="/sign-in" component={SignInPage} />
		<Route path="/sign-up" component={SignUpPage} />
	</Switch>
);
