import type { Post, WrapperWithPagination } from "../models";

export async function getPostsMock() {
	return new Promise<WrapperWithPagination<Post>>((resolve) => {
		setTimeout(() => {
			resolve({
				results: [
					{
						id: 1,
						username: "john_doe",
						title: "My First Post",
						content: "Hello, this is my first post on Codeleap Network!",
            created_datetime: "2024-06-01T12:00:00Z",
					},
					{
						id: 2,
						username: "jane_smith",
						title: "Excited to Join!",
						content: "I'm excited to be part of this community.",
            created_datetime: "2024-06-02T15:30:00Z",
					},
				],
				count: 2,
				next: null,
				previous: null,
			});
		}, 200);
	});
}
