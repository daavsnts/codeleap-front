import React from "react";

interface TextareaProps
	extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	label?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
	({ label, id, className = "", ...textareaProps }, ref) => {
		return (
			<div className="flex flex-col gap-1">
				{label && (
					<label htmlFor={id} className="mb-1 font-medium">
						{label}
					</label>
				)}
				<div className="flex flex-col gap-1">
					<textarea
						ref={ref}
						id={id}
						className={`border border-gray-500 rounded-lg p-2 ${className}`}
						{...textareaProps}
					/>
				</div>
			</div>
		);
	},
);

Textarea.displayName = "Textarea";

export default Textarea;
