import {createQueryKeys} from "@lukemorales/query-key-factory";
import {useMutation, useQuery} from "@tanstack/react-query";

import {api} from "@shared/api";
import {
	GenerateGuideDto,
	GenerateRoadmapDto,
	GetGuideDto,
} from "@shared/api/roadmaps";
import {Nullable} from "@shared/lib/types";
import {IRoadmap} from "@entities/roadmap";

import {queryClient} from "./client";

const keys = createQueryKeys("roadmaps", {
	generateGuide: ["generate-guide"],
	generateRoadmap: ["generate-roadmap"],
	getRoadmaps: ["get-roadmaps"],
	getRoadmap: (id: string) => ["get-roadmap", id],
	getGuide: (roadmapId: string, guideId: string) => [
		"get-guide",
		roadmapId,
		guideId,
	],
});

export const setRoadmaps = (roadmaps: IRoadmap[]) => {
	const current = queryClient.getQueryData(keys.getRoadmaps.queryKey) as {
		roadmaps: Nullable<IRoadmap[]>;
	};

	const updated = current?.roadmaps
		? [...current.roadmaps, ...roadmaps]
		: roadmaps;

	queryClient.setQueryData(keys.getRoadmaps.queryKey, {roadmaps: updated});
};

export const roadmapsKeys = keys;

export const useRoadmaps = () => {
	const {
		data,
		refetch: refetchRoadmaps,
		...query
	} = useQuery({
		...keys.getRoadmaps,
		queryFn: async () => {
			const res = await api.roadmaps.getRoadmaps();

			return res.data;
		},
	});

	return {roadmaps: data?.roadmaps, refetchRoadmaps, ...query} as const;
};

export const useGuide = (req: Partial<GetGuideDto["req"]>) => {
	const {
		data,
		refetch: refetchGuide,
		...query
	} = useQuery({
		...keys.getGuide(req.roadmapId!, req.topicId!),
		enabled: Boolean(req.roadmapId) && Boolean(req.topicId),
		queryFn: async () => {
			try {
				const res = await api.roadmaps.getGuide({
					roadmapId: req.roadmapId!,
					topicId: req.topicId!,
				});

				return res.data;
			} catch (e) {
				const res = await api.roadmaps.generateGuide({
					roadmapId: req.roadmapId!,
					topicId: req.topicId!,
				});

				return res.data;
			}
		},
	});

	return {guide: data?.guide, refetchGuide, ...query} as const;
};

export const useGenerateRoadmap = () => {
	const {mutateAsync, ...mutation} = useMutation({
		mutationKey: keys.generateRoadmap.queryKey,
		mutationFn: async (req: GenerateRoadmapDto["req"]) => {
			const res = await api.roadmaps.generateRoadmap(req);

			return res.data;
		},
	});

	return {generateRoadmap: mutateAsync, ...mutation};
};

export const useGenerateGuide = () => {
	const {mutateAsync, ...mutation} = useMutation({
		mutationKey: keys.generateGuide.queryKey,
		mutationFn: async (req: GenerateGuideDto["req"]) => {
			const res = await api.roadmaps.generateGuide(req);

			return res.data;
		},
	});

	return {generateGuide: mutateAsync, ...mutation};
};
