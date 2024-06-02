export interface GeneratedRoadmap {
	title: string;
	chapters: {
		title: string;
		topics: {
			title: string;
		}[];
	}[];
}

export interface NormalizedRoadmap {
	title: string;
	chapters: NormalizedChapter[];
}

export interface NormalizedChapter {
	id: string;
	title: string;
	topics: NormalizedTopic[];
}

export interface NormalizedTopic {
	id: string;
	title: string;
}
