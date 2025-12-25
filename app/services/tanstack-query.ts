import {
	QueryClient,
	defaultShouldDehydrateQuery,
	isServer,
} from "@tanstack/react-query";

function makeQueryClient() {
	return new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 60 * 1000 * 3, // 3min
			},
			dehydrate: {
				shouldDehydrateQuery: (query) =>
					defaultShouldDehydrateQuery(query) ||
					query.state.status === "pending",
			},
		},
	});
}

let browserQueryClient: QueryClient | undefined;

export function getQueryClient() {
	if (isServer) return makeQueryClient();

	if (!browserQueryClient) browserQueryClient = makeQueryClient();

	return browserQueryClient;
}

export async function revalidateClientTags(tags: string[]) {
	const queryClient = getQueryClient();

	for (const tag of tags) {
		await queryClient.invalidateQueries({ queryKey: [tag] });
	}
}
