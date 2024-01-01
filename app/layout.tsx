import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import NavBar from "@components/NavBar";
import Provider from "@/app/providers";

export const metadata: Metadata = {
	title: "SoloScribe",
	description: "Write your own story",
};
export default async function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={"w-screen h-screen flex flex-col justify-center items-center"}>
				<Provider>
					{/*<NavBar className={"w-full h-24 bg-red-500"} />*/}
					<main className={"w-full flex-grow flex justify-center items-center"}>{children}</main>
				</Provider>
			</body>
		</html>
	);
}
