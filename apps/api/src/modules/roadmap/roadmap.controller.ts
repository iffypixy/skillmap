import {
	Body,
	Controller,
	Get,
	NotFoundException,
	Param,
	Post,
	Session,
	UseGuards,
} from "@nestjs/common";
import {SessionWithData} from "express-session";
import {nanoid} from "nanoid";

import {IsAuthenticated} from "@modules/auth";
import {PrismaService} from "@lib/prisma";
import {sanitized} from "@lib/sanitized";
import {openai} from "@lib/openai";

import * as dtos from "./dtos";
import {
	GeneratedRoadmap,
	NormalizedChapter,
	NormalizedRoadmap,
} from "./roadmap.types";

@UseGuards(IsAuthenticated)
@Controller("roadmaps")
export class RoadmapController {
	constructor(private readonly prisma: PrismaService) {}

	@Get("/")
	async getRoadmaps(@Session() session: SessionWithData) {
		const roadmaps = await this.prisma.roadmap.findMany({
			where: {
				ownerId: session.userId,
			},
			// select: {
			//     id: true,
			//     title: true,
			// },
		});

		return {
			roadmaps: roadmaps.map(sanitized.roadmap),
		};
	}

	@Get(":id")
	async getRoadmap(
		@Session() session: SessionWithData,
		@Param("id") id: string,
	) {
		const roadmap = await this.prisma.roadmap.findUnique({
			where: {
				id,
				ownerId: session.userId,
			},
		});

		if (!roadmap) throw new NotFoundException("Roadmap not found");

		return {
			roadmap: sanitized.roadmap(roadmap),
		};
	}

	@Get(":roadmapId/topics/:topicId")
	async getGuide(
		@Session() session: SessionWithData,
		@Param("roadmapId") roadmapId: string,
		@Param("topicId") topicId: string,
	) {
		const guide = await this.prisma.guide.findFirst({
			where: {
				topicId,
				roadmap: {
					id: roadmapId,
					ownerId: session.userId,
				},
			},
		});

		if (!guide) throw new NotFoundException("Guide not found");

		return {
			guide,
		};
	}

	@Post("generate")
	async generateRoadmap(
		@Body() dto: dtos.GenerateRoadmapDto,
		@Session() session: SessionWithData,
	) {
		const {choices} = await openai.client.chat.completions.create({
			model: "gpt-4o",
			messages: [
				{
					role: "user",
					content: `
        		You will be asked a question. Your reply should include a roadmap JSON that includes specific data as shown below.
        		Example question: Generate me a complete, comprehensive, structured and detailed from zero to hero roadmap for an absolute beginner with no background to become an expert as a JSON object for the following domain: Docker. Don't include backticks as in "\`\`\`json\`\`\`".
        		Example reply: '{"title":"","chapters":[{"title":"","topics":[{"title":""}]}'
        		Question: Generate me a complete, comprehensive, structured and detailed from zero to hero roadmap for an absolute beginner with no background to become an expert as a JSON object for the following domain: ${dto.domain}. Don't include backticks as in "\`\`\`json\`\`\`".
        		Reply:
        	`,
				},
			],
		});
		const json = choices[0].message.content;
		const generated = JSON.parse(json) as GeneratedRoadmap;
		const normalized = {
			...generated,
			chapters: generated.chapters.map((c) => ({
				...c,
				id: nanoid(),
				topics: c.topics.map((t) => ({
					...t,
					id: nanoid(),
				})),
			})),
		} as NormalizedRoadmap;
		const roadmap = await this.prisma.roadmap.create({
			data: {
				title: dto.domain,
				ownerId: session.userId,
				chapters: JSON.stringify(normalized.chapters),
			},
		});
		return {
			roadmap: sanitized.roadmap(roadmap),
		};
	}

	@Post(":roadmapId/topics/:topicId/guide/generate")
	async generateGuide(
		@Session() session: SessionWithData,
		@Param("roadmapId") roadmapId: string,
		@Param("topicId") topicId: string,
	) {
		const roadmap = await this.prisma.roadmap.findUnique({
			where: {
				id: roadmapId,
				ownerId: session.userId,
			},
		});

		if (!roadmap) throw new NotFoundException("Roadmap not found");

		const chapters = JSON.parse(
			roadmap.chapters as string,
		) as NormalizedChapter[];

		const chapter = chapters.find((c) =>
			c.topics.some((t) => t.id === topicId),
		);

		if (!chapter) throw new NotFoundException("Chapter not found");

		const topic = chapter.topics.find((t) => t.id === topicId);

		if (!topic) throw new NotFoundException("Topic not found");

		const {choices} = await openai.client.chat.completions.create({
			model: "gpt-4o",
			messages: [
				{
					role: "user",
					content: `
			Generate me a comprehensive, complete, in-depth and hands-on guide on "${topic.title}" topic, which is a part of "${chapter.title}" chapter of "${roadmap.title}" roadmap in proper MarkDown format with relevant styling.

			Don't include backticks as in "\`\`\`markdown\`\`\`".

			Don't include "Table of Contents".
		`,
				},
			],
		});

		const markdown = choices[0].message.content;

		const guide = await this.prisma.guide.create({
			data: {
				markdown,
				roadmapId: roadmap.id,
				topicId,
			},
		});

		return {
			guide,
		};
	}
}
