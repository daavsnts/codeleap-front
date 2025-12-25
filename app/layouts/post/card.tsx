import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { Fragment } from "react/jsx-runtime";
import { toast } from "sonner";
import Button from "~/components/button";
import { Dialog } from "~/components/dialog";
import { revalidateClientTags } from "~/services";
import type { Post } from "~/services/api/models";
import { POSTS_TAG } from "~/services/api/posts";
import { fetchApi } from "~/services/fetch-api";
import { timeAgo } from "~/utils";
import { PostForm } from "./form";

type PostCardProps = {
	post: Post;
	itsCurrentUserPost: boolean;
};

export function PostCard({ post, itsCurrentUserPost }: PostCardProps) {
	const [isLoading, setIsLoading] = useState(false);
	const [toggleDeleteDialog, setToggleDeleteDialog] = useState(false);
	const [toggleEditDialog, setToggleEditDialog] = useState(false);

	const { id, title, content, username, created_datetime } = post;

	async function onSubmitDeletion() {
		setIsLoading(true);

		await fetchApi(`/careers/${id}`, {
			method: "DELETE",
		})
			.then(async () => {
				await revalidateClientTags([POSTS_TAG]);
				toast.success("Post deleted successfully!");
				setToggleDeleteDialog(false);
			})
			.catch((err) => {
				toast.error(
					err?.message || "Error while deleting post. Try again later.",
				);
			});

		setIsLoading(false);
	}

	return (
		<Fragment key={id}>
			<div className="border border-gray-300 rounded-lg flex flex-col gap-4">
				<div className="p-4 bg-primary text-white flex justify-between items-center rounded-t-lg">
					<h1 className="text-lg font-bold truncate max-w-55">{title}</h1>

					{itsCurrentUserPost && (
						<div className="flex gap-4">
							<Button
								variant="default"
								className="hover:text-gray-200 cursor-pointer"
								onClick={() => setToggleDeleteDialog(true)}
							>
								<Trash2 />
							</Button>

							<Button
								variant="default"
								className="hover:text-gray-200 cursor-pointer"
								onClick={() => setToggleEditDialog(true)}
							>
								<Pencil />
							</Button>
						</div>
					)}
				</div>

				<div className="px-4 pb-4 flex flex-col gap-4">
					<div className="flex justify-between text-sm text-gray-500">
						<span className="font-bold">@{username}</span>
						<span>{timeAgo(created_datetime)}</span>
					</div>

					<p>{content}</p>
				</div>
			</div>

			<Dialog
				open={toggleDeleteDialog}
				onOpenChange={() => setToggleDeleteDialog(false)}
				title="Delete Post"
			>
				<div className="w-full flex flex-col gap-4">
					<h1>Are you sure you want to delete this post?</h1>

					<div className="w-full flex justify-end gap-4 mt-2">
						<Button
							variant="outline"
							onClick={() => setToggleDeleteDialog(false)}
						>
							Cancel
						</Button>

						<Button
							variant="destructive"
							onClick={onSubmitDeletion}
							loading={isLoading}
						>
							Delete
						</Button>
					</div>
				</div>
			</Dialog>

			<Dialog
				open={toggleEditDialog}
				onOpenChange={() => setToggleEditDialog(false)}
				title="Edit item"
			>
				<PostForm
					editingPost={post}
					onCloseEdit={() => setToggleEditDialog(false)}
					currentUsername={username}
					submitLoading={isLoading}
					setSubmitLoading={setIsLoading}
				/>
			</Dialog>
		</Fragment>
	);
}

export function PostCardSkeleton() {
	return (
		<div className="border border-gray-300 rounded-lg flex flex-col gap-4 animate-pulse">
			{/* Header */}
			<div className="p-4 bg-gray-300 flex justify-between items-center rounded-t-lg">
				{/* Title */}
				<div className="h-5 w-40 bg-gray-400 rounded" />

				{/* Actions */}
				<div className="flex gap-4">
					<div className="h-8 w-8 bg-gray-400 rounded" />
					<div className="h-8 w-8 bg-gray-400 rounded" />
				</div>
			</div>

			{/* Content */}
			<div className="px-4 pb-4 flex flex-col gap-4">
				{/* Meta */}
				<div className="flex justify-between">
					<div className="h-4 w-24 bg-gray-300 rounded" />
					<div className="h-4 w-20 bg-gray-300 rounded" />
				</div>

				{/* Text */}
				<div className="flex flex-col gap-2">
					<div className="h-4 w-full bg-gray-300 rounded" />
					<div className="h-4 w-full bg-gray-300 rounded" />
					<div className="h-4 w-3/4 bg-gray-300 rounded" />
				</div>
			</div>
		</div>
	);
}
