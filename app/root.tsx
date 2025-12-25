import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";

import "./app.css";
import { Toaster } from "sonner";
import Providers from "./providers";

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body>
				<Providers>{children}</Providers>
				<Toaster richColors />
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

export default function App() {
	return <Outlet />;
}
