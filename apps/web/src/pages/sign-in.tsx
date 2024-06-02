import {Button, Container, Input} from "@shared/ui";

export const SignInPage: React.FC = () => {
	return (
		<div className="w-full h-screen flex items-center">
			<Container>
				<div className="w-[44rem] mx-auto space-y-24">
					<h1 className="text-44 uppercase font-black text-center">
						Log in
					</h1>

					<form className="flex flex-col space-y-12">
						<Input
							type="text"
							placeholder="Username"
							className="w-full"
						/>

						<Input
							type="password"
							placeholder="Password"
							className="w-full"
						/>

						<Button className="w-full">Log in</Button>
					</form>
				</div>
			</Container>
		</div>
	);
};
