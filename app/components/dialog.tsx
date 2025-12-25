import { X } from "lucide-react";
import type React from "react";

interface DialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	title?: string;
	children: React.ReactNode;
	className?: string;
}

export const Dialog: React.FC<DialogProps> = ({
	open,
	onOpenChange,
	title,
	children,
	className,
}) => {
	if (!open) return null;

	const responsiveSizes = "sm:max-w-[90%] md:max-w-md lg:max-w-lg xl:max-w-xl w-full";
	const mergedClassName =
		`bg-white rounded-lg p-4 shadow-lg flex gap-4 flex-col ${responsiveSizes} ${className}`.trim();

	return (
		<div
			className="fixed inset-0 w-screen h-screen bg-black/50 flex items-center justify-center z-[1000] p-4"
			onClick={() => onOpenChange(false)}
		>
			<div className={mergedClassName} onClick={(e) => e.stopPropagation()}>
				<div className="w-full flex justify-between">
					{title && (
						<div className="font-bold text-lg w-60 truncate">{title}</div>
					)}

					<button
						type="button"
						className="text-lg cursor-pointer"
						aria-label="Close"
						onClick={() => onOpenChange(false)}
					>
						<X />
					</button>
				</div>

				{children}
			</div>
		</div>
	);
};
