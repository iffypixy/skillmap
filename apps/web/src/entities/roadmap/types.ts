export interface IRoadmap {
	id: string;
	title: string;
	chapters: IRoadmapChapter[];
}

export interface Guide {
	id: string;
	markdown: string;
}

export interface IRoadmapChapter {
	id: string;
	title: string;
	topics: RoadmapTopic[];
}

export interface RoadmapTopic {
	id: string;
	title: string;
}
