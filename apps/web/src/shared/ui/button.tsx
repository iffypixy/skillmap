import {cva, cx} from "class-variance-authority";
import {forwardRef} from "react";

const styles = cva(
	"py-14 px-28 rounded-6 uppercase font-semibold text-18 border-4 hover:translate-y-1 hover:scale-105 duration-300",
	{
		variants: {
			color: {
				primary: "bg-primary text-primary-contrast border-primary",
				secondary: "border-primary text-primary bg-primary-contrast",
			},
		},
		defaultVariants: {
			color: "primary",
		},
	},
);

interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
	color?: "primary" | "secondary";
}

export const Button = forwardRef<React.ElementRef<"button">, ButtonProps>(
	({className, color, ...props}, ref) => (
		<button
			ref={ref}
			{...props}
			className={cx(styles({color}), className)}
		/>
	),
);
