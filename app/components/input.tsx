import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ label, id, className = "", ...inputProps }, ref) => {
		return (
			<div className="flex flex-col gap-1">
				{label && (
					<label htmlFor={id} className="mb-1 font-medium">
						{label}
					</label>
				)}
				<div className="flex flex-col gap-1">
					<input
						ref={ref}
						id={id}
						className={`border border-gray-500 rounded-lg p-2 ${className}`}
						{...inputProps}
					/>
				</div>
			</div>
		);
	},
);

Input.displayName = "Input";

export default Input;
