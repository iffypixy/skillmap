import {forwardRef} from "react";
import {cx} from "class-variance-authority";
import {twMerge} from "tailwind-merge";

export const Input = forwardRef<
	React.ElementRef<"input">,
	React.ComponentPropsWithoutRef<"input">
>(({className, ...props}, ref) => {
	return (
		<input
			{...props}
			ref={ref}
			className={twMerge(
				cx(
					"w-[68rem] h-[6.6rem] py-16 px-28 rounded-12 border-2 bg-paper-contrast/5 outline-none border-paper-contrast/15 placeholder:text-paper-contrast/70 placeholder:text-16 text-16 bg-paper",
					className,
				),
			)}
		/>
	);
});
