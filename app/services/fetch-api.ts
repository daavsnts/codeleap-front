const useMocks = import.meta.env.VITE_USE_MOCKS === "true";

export async function fetchApi<T>(
	path: string,
	options = {} as Omit<RequestInit, "body"> & {
		body?: Record<string, unknown> | FormData;
	},
) {
	if (useMocks) {
		throw new Error("Mocks are enabled. API calls are disabled.");
	}

	const isAction = ["POST", "PUT", "DELETE"].includes(options.method || "");

	const req = await fetch(`${import.meta.env.VITE_API_URL}${path}/`, {
		...options,
		body:
			options.body instanceof FormData
				? options.body
				: isAction
					? JSON.stringify(options.body ?? {})
					: JSON.stringify(options.body),
		headers: {
			"Content-Type": "application/json",
			...options.headers,
		},
	});

	if (!req.ok) {
		const response = await req.json();

		throw response;
	}

	if (req.status === 204) return null;

	const contentType = req.headers.get("content-type");

	if (contentType?.includes("application/json")) {
		const data = await req.json();

		return data as T;
	}

	return null;
}
