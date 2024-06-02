import {useState} from "react";

import {Container, Input} from "@shared/ui";
import {useRoadmapStore} from "@entities/roadmap";
import {
	setCredentials,
	setRoadmaps,
	useGenerateRoadmap,
	useSignUpAnonymously,
} from "@shared/queries";

export const GuestHomePage: React.FC = () => {
	const [domain, setDomain] = useState("");

	const {signUpAnonymously} = useSignUpAnonymously();
	const {generateRoadmap} = useGenerateRoadmap();

	const {setCurrentRoadmapId} = useRoadmapStore();

	const generate = (domain: string) => {
		signUpAnonymously()
			.then(({credentials}) => {
				setCredentials(credentials);
			})
			.then(() => {
				generateRoadmap({domain}).then(({roadmap}) => {
					setRoadmaps([roadmap]);

					setCurrentRoadmapId(roadmap.id);
				});
			});
	};

	return (
		<div className="h-screen py-32">
			<main className="h-full flex flex-col justify-between">
				<section>
					<Container>
						<div className="flex flex-col items-center space-y-8">
							<div className="flex items-center space-x-18">
								<h3 className="text-44 uppercase text-primary font-black">
									<span className="bg-primary text-primary-contrast rounded-8 py-2 px-8 italic mr-4">
										Skill
									</span>
									map
								</h3>
							</div>

							<p className="text-paper-contrast/75 text-14 uppercase">
								Practice makes perfect
							</p>
						</div>
					</Container>
				</section>

				<section>
					<Container>
						<div className="flex flex-col items-center space-y-20">
							<h1 className="text-60 uppercase font-medium">
								I <span className="text-primary">want</span> to{" "}
								<span className="italic text-primary">
									learn...
								</span>
							</h1>

							<div className="flex flex-col space-y-16">
								<form
									onSubmit={(event) => {
										event.preventDefault();

										generate(domain);
									}}
								>
									<Input
										value={domain}
										onChange={(event) => {
											setDomain(
												event.currentTarget.value,
											);
										}}
										placeholder="Any domain you want to learn"
										className="bg-paper-contrast/5 border-paper-contrast/25"
									/>
								</form>

								<div className="flex space-x-8">
									{[
										"Product management",
										"UI/UX",
										"Frontend",
										"API",
										"Discrete math",
									].map((tag, idx) => (
										<div
											key={idx}
											role="presentation"
											onClick={() => {
												generate(tag);
											}}
											className="bg-primary/75 text-12 text-primary-contrast uppercase rounded-6 hover:bg-primary hover:scale-105 duration-300 cursor-pointer py-10 px-20"
										>
											<p>{tag}</p>
										</div>
									))}
								</div>
							</div>
						</div>
					</Container>
				</section>

				<div />
			</main>
		</div>
	);
};
