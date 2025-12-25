import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: "primary" | "destructive" | "success" | "outline" | "default";
}

const buttonVariants = {
	primary:
		"bg-primary text-white rounded-lg px-6 py-2 hover:bg-primary-hover transition disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer",
	destructive:
		"bg-destructive text-white rounded-lg px-6 py-2 hover:bg-destructive-hover transition disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer",
	success:
		"bg-success text-white rounded-lg px-6 py-2 hover:bg-success-hover transition disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer",
	outline:
		"bg-white text-black border border-gray-300 rounded-lg px-6 py-2 hover:bg-gray-100 transition disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer",
	default: "cursor-pointer",
};

import { Loader2 } from "lucide-react";

const Button = React.forwardRef<
	HTMLButtonElement,
	React.PropsWithChildren<ButtonProps & { loading?: boolean }>
>(
	(
		{
			children,
			variant = "primary",
			className = "",
			loading = false,
			...props
		},
		ref,
	) => {
		const mergedClassName = `${buttonVariants[variant]} ${className}`.trim();

		return (
			<button
				ref={ref}
				className={mergedClassName}
				{...props}
				disabled={loading || props.disabled}
			>
				<div className="flex items-center gap-2">
					{loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
					{children}
				</div>
			</button>
		);
	},
);

Button.displayName = "Button";

export default Button;
