import {create} from "zustand";
import {createJSONStorage, persist} from "zustand/middleware";

import {Nullable} from "@shared/lib/types";

export const useRoadmapStore = create(
	persist<{
		currentRoadmapId: Nullable<string>;
		currentTopicId: Nullable<string>;
		setCurrentRoadmapId: (roadmapId: Nullable<string>) => void;
		setCurrentTopicId: (topicId: Nullable<string>) => void;
	}>(
		(set) => ({
			currentRoadmapId: null,
			currentTopicId: null,
			setCurrentRoadmapId: (id) => set({currentRoadmapId: id}),
			setCurrentTopicId: (id) => set({currentTopicId: id}),
		}),
		{
			name: "roadmaps",
			storage: createJSONStorage(() => localStorage),
		},
	),
);
