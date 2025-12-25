import { useForm } from "react-hook-form";
import type { Route } from "./+types/sign-up";
import { useUserStore } from "~/stores/user";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import Input from "~/components/input";
import Button from "~/components/button";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "Sign Up - CodeLeap Network" },
		{ name: "description", content: "Welcome to CodeLeap Network!" },
	];
}

type LoginInputs = {
	username: string;
};

export default function SignUp() {
	const { register, handleSubmit, watch } = useForm<LoginInputs>();

	const { setCurrentUsername } = useUserStore();
	const navigate = useNavigate();

	function onSubmit(data: LoginInputs) {
		setCurrentUsername(data.username);
		toast.success(`Welcome, ${data.username}!`);
		navigate("/main");
	}

	const liveForm = watch();
	const userNameIsEmpty = !liveForm.username || liveForm.username.trim() === "";

	return (
		<div className="w-full h-full flex justify-center items-center p-4">
			<div className="p-4 rounded-xl bg-white border border-gray-300 h-fit flex flex-col gap-4">
				<h1 className="text-xl font-bold">Welcome to CodeLeap network!</h1>

				<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
					<div className="flex flex-col gap-1">
						<Input
							label="Please enter your username"
							placeholder="John Doe"
							{...register("username", { required: true })}
						/>
					</div>

					<div className="w-full flex justify-end">
						<Button disabled={userNameIsEmpty} type="submit">
							Enter
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
}
