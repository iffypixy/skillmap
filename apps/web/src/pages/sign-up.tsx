import {Button, Container, Input} from "@shared/ui";

export const SignUpPage: React.FC = () => {
	return (
		<div className="w-full h-screen flex items-center">
			<Container>
				<div className="w-[44rem] mx-auto space-y-24">
					<h1 className="text-44 uppercase font-black text-center">
						Sign up
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

						<Input
							type="password"
							placeholder="Confirm password"
							className="w-full"
						/>

						<Button className="w-full">Sign up</Button>
					</form>
				</div>
			</Container>
		</div>
	);
};
