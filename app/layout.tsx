import type { Metadata } from "next";
import { Inter, Mulish } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const mulish = Mulish({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "To do list",
	description: "Caio's To do list",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={/* inter.className */ mulish.className}>{children}</body>
		</html>
	);
}
