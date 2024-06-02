import {Guide, IRoadmap} from "@entities/roadmap";
import {request} from "@shared/lib/request";
import {Dto} from "@shared/lib/types";

export type GenerateRoadmapDto = Dto<
	{
		domain: string;
	},
	{
		roadmap: IRoadmap;
	}
>;

export const generateRoadmap = (req: GenerateRoadmapDto["req"]) =>
	request<GenerateRoadmapDto["res"]>({
		url: "/roadmaps/generate",
		method: "POST",
		data: req,
	});

export type GenerateGuideDto = Dto<
	{
		roadmapId: string;
		topicId: string;
	},
	{
		guide: Guide;
	}
>;

export const generateGuide = (req: GenerateGuideDto["req"]) =>
	request<GenerateGuideDto["res"]>({
		url: `/roadmaps/${req.roadmapId}/topics/${req.topicId}/guide/generate`,
		method: "POST",
	});

export type GetRoadmapsDto = Dto<
	void,
	{
		roadmaps: IRoadmap[];
	}
>;

export const getRoadmaps = () =>
	request<GetRoadmapsDto["res"]>({
		url: "/roadmaps",
		method: "GET",
	});

export type GetGuideDto = Dto<
	{
		roadmapId: string;
		topicId: string;
	},
	{
		guide: Guide;
	}
>;

export const getGuide = (req: GetGuideDto["req"]) =>
	request<GetGuideDto["res"]>({
		url: `/roadmaps/${req.roadmapId}/topics/${req.topicId}`,
		method: "GET",
	});
