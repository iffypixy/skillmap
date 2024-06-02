import {useState} from "react";
import {DialogContent} from "@shared/ui";

import {Input} from "@shared/ui";
import {setRoadmaps, useGenerateRoadmap} from "@shared/queries";
import {useRoadmapStore} from "@entities/roadmap";

export const CreateRoadmap: React.FC<{close: () => void}> = ({close}) => {
	const [domain, setDomain] = useState("");

	const {generateRoadmap} = useGenerateRoadmap();

	const {setCurrentRoadmapId} = useRoadmapStore();

	return (
		<DialogContent>
			<form
				onSubmit={(event) => {
					event.preventDefault();

					generateRoadmap({domain}).then(({roadmap}) => {
						setRoadmaps([roadmap]);

						setCurrentRoadmapId(roadmap.id);
					});

					close();
				}}
			>
				<Input
					value={domain}
					onChange={(event) => setDomain(event.currentTarget.value)}
					placeholder="Choose a domain to learn"
					className="h-100 text-32 bg-paper border-paper-contrast rounded-8 border-4 shadow-2xl placeholder:uppercase placeholder:text-24 placeholder:font-medium"
				/>
			</form>
		</DialogContent>
	);
};
