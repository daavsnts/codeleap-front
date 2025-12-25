import type { Route } from "./+types/main";
import { useQuery } from "@tanstack/react-query";
import { getPosts, POSTS_TAG } from "~/services/api/posts";
import { useState } from "react";
import { useUserStore } from "~/stores/user";
import { PostForm, PostCard } from "~/layouts";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "CodeLeap Network" },
		{ name: "description", content: "Welcome to CodeLeap Network!" },
	];
}

export default function Main() {
	const [submitLoading, setSubmitLoading] = useState(false);
	const { currentUsername } = useUserStore();

	const { data: posts } = useQuery({
		queryFn: () => getPosts(),
		queryKey: [POSTS_TAG],
	});

	return (
		<div className="w-full flex flex-col bg-white max-w-full sm:max-w-[640px] md:max-w-[768px] lg:max-w-[1024px] xl:max-w-[1280px]">
			<div className="p-4 bg-primary text-white">
				<h1 className="text-2xl font-bold">CodeLeap Network</h1>
			</div>

			<div className="flex flex-col gap-4 p-4">
				<div className="border border-gray-300 rounded-lg p-4 flex flex-col gap-4">
					<h1 className="text-xl font-semibold">What's on your mind?</h1>

					<PostForm
						currentUsername={currentUsername}
						submitLoading={submitLoading}
						setSubmitLoading={setSubmitLoading}
					/>
				</div>

				{posts?.results.map((post) => (
					<PostCard
						key={post.id}
						post={post}
						itsCurrentUserPost={post.username === currentUsername}
					/>
				))}
			</div>
		</div>
	);
}
