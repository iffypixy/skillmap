import {Roadmap, User} from "@prisma/client";

const roadmap = (r: Roadmap) => {
	const chapters = JSON.parse(r.chapters as string);

	return {
		id: r.id,
		title: r.title,
		chapters,
	};
};

const credentials = (u: User) => ({
	id: u.id,
	email: u.email,
	isAnonymous: u.isAnonymous,
});

export const sanitized = {roadmap, credentials};
