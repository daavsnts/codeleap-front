import { fetchApi } from "../fetch-api";
import { getPostsMock } from "./mocks";
import type { WrapperWithPagination } from "./models/common";
import type { Post } from "./models/posts";

const useMocks = import.meta.env.VITE_USE_MOCKS === "true";

export const POSTS_TAG = "posts";
export async function getPosts() {
	if (useMocks) return await getPostsMock();

	return fetchApi<WrapperWithPagination<Post>>("/careers/", {
		method: "GET",
	});
}
