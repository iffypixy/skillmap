import {cx} from "class-variance-authority";

import {PropsWithClassName} from "@shared/lib/types";

import "./index.css";

export const Loader: React.FC<PropsWithClassName> = ({className}) => (
	<div className={cx("loader", className)} />
);
