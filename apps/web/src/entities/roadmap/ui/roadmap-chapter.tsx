import {cx} from "class-variance-authority";

import {PropsWithClassName} from "@shared/lib/types";

import {IRoadmapChapter} from "../types";
import {useRoadmapStore} from "../store";

interface RoadmapChapterProps extends PropsWithClassName {
	chapter: IRoadmapChapter;
}

export const RoadmapChapter: React.FC<RoadmapChapterProps> = ({
	className,
	chapter,
}) => {
	const {currentTopicId, setCurrentTopicId} = useRoadmapStore();

	const isChapterSelected = chapter.topics.some(
		(t) => t.id === currentTopicId,
	);

	return (
		<div
			className={cx(
				"flex flex-col rounded-12 border-4 border-paper-contrast/10 transition-colors duration-200 ease-linear",
				{
					"border-primary border-4": isChapterSelected,
				},
				className,
			)}
		>
			<div
				className={cx(
					"border-b-4 border-paper-contrast/10 text-primary p-16 transition-colors duration-200 ease-linear",
					{
						"bg-primary text-primary-contrast border-primary":
							isChapterSelected,
					},
				)}
			>
				<p className="text-16 font-bold text-center uppercase">
					{chapter.title}
				</p>
			</div>

			<div className="w-full flex flex-col space-y-12 mx-auto p-12">
				{chapter.topics.map((topic, idx) => (
					<div
						key={idx}
						role="presentation"
						onClick={() => {
							setCurrentTopicId(topic.id);
						}}
						className={cx(
							"text-paper-contrast bg-paper-contrast/10 cursor-pointer rounded-6 p-12 duration-200 ease-linear hover:scale-105",
							{
								"bg-primary text-primary-contrast":
									topic.id === currentTopicId,
							},
						)}
					>
						<p className="text-12 font-medium text-center uppercase">
							{topic.title}
						</p>
					</div>
				))}
			</div>
		</div>
	);
};

export const RoadmapEdge: React.FC<PropsWithClassName> = () => (
	<div className="w-[6px] min-h-52 bg-secondary rounded-24 mx-auto" />
);
