import Markdown from "react-markdown";

import "./index.css";

interface MDProps {
	children?: string;
}

export const MD: React.FC<MDProps> = ({children}) => (
	<div className="flex flex-col markdown">
		<Markdown>{children}</Markdown>
	</div>
);
