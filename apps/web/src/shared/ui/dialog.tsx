import {forwardRef, useState} from "react";
import * as RDialog from "@radix-ui/react-dialog";
import {cx} from "class-variance-authority";

export const Dialog = RDialog.Root;
export const DialogTrigger = RDialog.Trigger;
export const DialogPortal = RDialog.Portal;
export const DialogClose = RDialog.Close;

export const DialogOverlay = forwardRef<
	React.ElementRef<typeof RDialog.Overlay>,
	React.ComponentPropsWithoutRef<typeof RDialog.Overlay>
>(({className, ...props}, ref) => (
	<RDialog.Overlay
		ref={ref}
		className={cx(
			"fixed inset-0 bg-paper-contrast/55 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
			className,
		)}
		{...props}
	/>
));

DialogOverlay.displayName = RDialog.Overlay.displayName;

export const DialogContent = forwardRef<
	React.ElementRef<typeof RDialog.Content>,
	React.ComponentPropsWithoutRef<typeof RDialog.Content>
>(({className, children, ...props}, ref) => (
	<DialogPortal>
		<DialogOverlay />

		<RDialog.Content
			ref={ref}
			className={cx(
				"fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
				className,
			)}
			{...props}
		>
			{children}
		</RDialog.Content>
	</DialogPortal>
));

DialogContent.displayName = RDialog.Content.displayName;

interface StatefulDialog {
	children: (close: () => void) => React.ReactNode;
}

export const StatefulDialog: React.FC<StatefulDialog> = ({children}) => {
	const [open, setOpen] = useState(false);

	const close = () => setOpen(false);

	return (
		<Dialog open={open} onOpenChange={(open) => setOpen(open)}>
			{children(close)}
		</Dialog>
	);
};
