import type { ReactNode } from "react";
import { Button } from "./button";
import { Separator } from "./separator";

type DialogProps = {
	open: boolean;
	toggle: () => void;
	children: ReactNode;
	title: string;
	icon: ReactNode;
	footer: ReactNode;
	onClose?: () => void;
};

export const Dialog = ({
	open,
	toggle,
	children,
	title,
	icon,
	footer,
	onClose,
}: DialogProps) => {
	const handleClose = () => {
		onClose?.();
		toggle();
	};

	return open ? (
		<div
			className={
				"absolute z-10 flex h-full w-full items-start justify-center bg-black/50 p-14 bg-blend-multiply backdrop-blur-xs]"
			}
		>
			<div
				className={
					"z-20 flex flex-col justify-stretch rounded-md bg-zinc-800 shadow-black/50 shadow-xs ring-1 ring-zinc-700/70"
				}
			>
				<header className="flex select-none justify-between items-center p-2">
					<h1 className="flex items-center gap-2 text-md text-white">
						<div className="text-zinc-400">{icon}</div>
						{title}
					</h1>
				</header>
				<Separator />

				<div className="flex flex-col justify-between gap-2 p-4">
					{children}
				</div>

				<Separator />
				<footer className="flex select-none justify-between p-2">
					<Button onClick={handleClose} variant="red">
						Close
					</Button>
					{footer}
				</footer>
			</div>
		</div>
	) : null;
};
