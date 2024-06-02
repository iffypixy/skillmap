import {Fragment} from "react";
import {useIsMutating} from "@tanstack/react-query";

import {Icon, Loader} from "@shared/ui";
import {roadmapsKeys, useRoadmaps} from "@shared/queries";
import {Branch} from "@shared/lib/branch";

import {useRoadmapStore} from "../store";
import {RoadmapChapter, RoadmapEdge} from "./roadmap-chapter";

export const Roadmap: React.FC = () => {
	const {roadmaps} = useRoadmaps();

	const {setCurrentRoadmapId, setCurrentTopicId, currentRoadmapId} =
		useRoadmapStore();

	const isRoadmapGettingGenerated =
		useIsMutating({
			mutationKey: roadmapsKeys.generateRoadmap.queryKey,
			status: "pending",
		}) > 0;

	const roadmap = roadmaps?.find((r) => r.id === currentRoadmapId) || null;

	return (
		<div className="w-[48rem] sm:w-full flex flex-col bg-paper-contrast/5 rounded-18 space-y-48 p-44 border border-paper-contrast/15 overflow-auto scrollbar-none animate-in slide-in-from-left-64 zoom-in-75 duration-300">
			<Branch if={isRoadmapGettingGenerated}>
				<div className="w-full h-full flex items-center justify-center">
					<Loader className="w-116 h-116" />
				</div>

				<>
					<div className="flex justify-center items-center relative">
						<button
							onClick={() => {
								setCurrentRoadmapId(null);
								setCurrentTopicId(null);
							}}
							className="absolute left-0 top-1/2 -translate-y-1/2 hover:scale-110 duration-300"
						>
							<Icon.GoBack className="w-28 fill-paper-contrast/70" />
						</button>

						<h3 className="uppercase font-black text-center text-28 mx-38">
							{roadmap?.title}
						</h3>
					</div>

					<RoadmapEdge />

					<div className="flex flex-col space-y-24">
						{roadmap?.chapters.map((chapter, idx) => (
							<Fragment key={idx}>
								{idx !== 0 && <RoadmapEdge />}

								<RoadmapChapter
									key={chapter.id}
									chapter={chapter}
								/>
							</Fragment>
						))}
					</div>
				</>
			</Branch>
		</div>
	);
};
