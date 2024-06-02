import {useCredentials} from "@shared/queries";
import {Loader} from "@shared/ui";

export const CredentialsLoader: React.FC<React.PropsWithChildren> = ({
	children,
}) => {
	const {isFetching} = useCredentials();

	if (isFetching)
		return (
			<div className="w-screen h-screen flex items-center justify-center">
				<Loader className="w-[38rem] h-[38rem]" />
			</div>
		);

	return children;
};
