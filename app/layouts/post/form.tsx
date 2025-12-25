import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Button from "~/components/button";
import Input from "~/components/input";
import Textarea from "~/components/textarea";
import { revalidateClientTags } from "~/services";
import type { Post } from "~/services/api/models/posts";
import { POSTS_TAG } from "~/services/api/posts";
import { fetchApi } from "~/services/fetch-api";

type PostInputs = {
	title: string;
	content: string;
};

type PostFormProps = {
	editingPost?: Post | null;
	onCloseEdit?: () => void;
	currentUsername: string | null;
	submitLoading: boolean;
	setSubmitLoading: (loading: boolean) => void;
};

export function PostForm({
	editingPost,
	onCloseEdit,
	currentUsername,
	submitLoading,
	setSubmitLoading,
}: PostFormProps) {
	const { register, handleSubmit, watch, setValue } = useForm<PostInputs>();

	const liveForm = watch();

	function isFieldEmpty(name: keyof PostInputs) {
		const value = liveForm[name];
		return !value || value.trim() === "";
	}

	const someFieldIsEmpty = isFieldEmpty("title") || isFieldEmpty("content");

	async function onSubmit(data: PostInputs) {
		if (!currentUsername) {
			toast.error("User not found, try login again.");
			return;
		}

		setSubmitLoading(true);

		const formattedData = editingPost
			? {
					title: data.title,
					content: data.content,
				}
			: {
					username: currentUsername,
					...data,
				};

		const finalPath = editingPost ? `/careers/${editingPost.id}` : "/careers";
		const finalMethod = editingPost ? "PATCH" : "POST";

		await fetchApi(finalPath, {
			body: formattedData,
			method: finalMethod,
		})
			.then(async () => {
				await revalidateClientTags([POSTS_TAG]);
				toast.success(
					`Post ${editingPost ? "edited" : "created"} successfully!`,
				);
				if (editingPost) onCloseEdit?.();
			})
			.catch((err) => {
				toast.error(
					err?.message ||
						`Error while ${editingPost ? "editing" : "creating"} post. Try again later.`,
				);
			});

		setSubmitLoading(false);
	}

	useEffect(() => {
		if (editingPost) {
			setValue("title", editingPost.title);
			setValue("content", editingPost.content);
		}
	}, [editingPost, setValue]);

	return (
		<form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
			<Input
				label="Title"
				placeholder="Hello World"
				{...register("title", { required: true })}
			/>

			<Textarea
				label="Content"
				placeholder="Content here"
				{...register("content", { required: true })}
			/>

			<div className="w-full flex justify-end gap-4">
				{editingPost && (
					<Button variant="outline" onClick={() => onCloseEdit?.()}>
						Cancel
					</Button>
				)}
				<Button
					type="submit"
					variant={editingPost ? "success" : "primary"}
					disabled={someFieldIsEmpty || submitLoading}
					loading={submitLoading}
				>
					{editingPost ? "Save" : "Create"}
				</Button>
			</div>
		</form>
	);
}
