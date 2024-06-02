import {cx} from "class-variance-authority";
import * as Dialog from "@radix-ui/react-dialog";
import {useIsMutating} from "@tanstack/react-query";

import {useRoadmapStore, Roadmap} from "@entities/roadmap";
import {CreateRoadmap} from "@features/roadmap/create";
import {Button, Loader, MD, StatefulDialog} from "@shared/ui";
import {roadmapsKeys, useGuide, useRoadmaps} from "@shared/queries";
import {Branch} from "@shared/lib/branch";

export const AuthenticatedHomePage: React.FC = () => {
	const {currentRoadmapId, currentTopicId} = useRoadmapStore();

	const {roadmaps} = useRoadmaps();

	const {guide, isFetching: isGuideFetching} = useGuide({
		roadmapId: currentRoadmapId!,
		topicId: currentTopicId!,
	});

	const isRoadmapGettingGenerated =
		useIsMutating({
			mutationKey: roadmapsKeys.generateRoadmap.queryKey,
			status: "pending",
		}) > 0;

	const roadmap = roadmaps?.find((r) => r.id === currentRoadmapId) || null;

	const isRoadmapOpen = Boolean(roadmap) || isRoadmapGettingGenerated;

	return (
		<div className="h-screen flex p-24 space-x-36 sm:flex-col sm:space-x-0 sm:space-y-38 sm:h-auto">
			<Branch if={isRoadmapOpen}>
				<Roadmap />
				<Sidebar />
			</Branch>

			<main className="h-full flex flex-1 bg-paper-contrast/5 rounded-18 overflow-hidden border border-paper-contrast/15 animate-in zoom-in-75 duration-300">
				<Branch if={Boolean(guide)}>
					<div className="overflow-auto scrollbar-thin">
						<MD>{guide?.markdown}</MD>
					</div>

					<div className="w-full h-full flex items-center justify-center text-center lg:p-72 sm:h-[340px]">
						<Branch if={isGuideFetching}>
							<Loader className="w-116 h-116" />

							<h3 className="uppercase font-bold text-34">
								Select a{" "}
								<span className="text-secondary">topic</span> to
								get the{" "}
								<span className="text-secondary">guide</span>
							</h3>
						</Branch>
					</div>
				</Branch>
			</main>
		</div>
	);
};

const Sidebar: React.FC = () => {
	const {roadmaps, isFetching} = useRoadmaps();

	const {setCurrentRoadmapId, currentRoadmapId} = useRoadmapStore();

	return (
		<aside className="flex flex-col w-[38rem] sm:w-full h-full bg-paper-contrast/5 p-26 space-y-32 rounded-18 border border-paper-contrast/15 overflow-auto scrollbar-none animate-in slide-in-from-left-44 zoom-in-75 duration-300">
			<StatefulDialog>
				{(close) => (
					<>
						<Dialog.Trigger asChild>
							<Button className="py-8">Generate</Button>
						</Dialog.Trigger>

						<CreateRoadmap close={close} />
					</>
				)}
			</StatefulDialog>

			<div className="w-84 min-h-6 bg-secondary rounded-8 mx-auto" />

			<Branch if={isFetching}>
				<div className="w-full flex flex-1 items-center justify-center">
					<Loader className="w-132 h-132" />
				</div>

				<div className="flex flex-col space-y-12">
					{roadmaps?.map((roadmap) => (
						<div
							key={roadmap.id}
							role="presentation"
							onClick={() => {
								setCurrentRoadmapId(roadmap.id);
							}}
							className={cx(
								"rounded-8 bg-paper-contrast/10 text-paper-contrast py-12 px-16 cursor-pointer group hover:bg-secondary hover:scale-110 duration-300",
								{
									"bg-primary text-primary-contrast":
										roadmap.id === currentRoadmapId,
								},
							)}
						>
							<p className="text-14 uppercase font-normal group-hover:text-secondary-contrast duration-300">
								{roadmap.title}
							</p>
						</div>
					))}
				</div>
			</Branch>
		</aside>
	);
};
