export interface PropsWithClassName {
	className?: string;
}

export interface Dto<Req, Res> {
	req: Req;
	res: Res;
}

export type Nullable<T> = T | null;
