import Link from "next/link";
import React from "react";

type AppProps = {
	className: string;
};
export default function NavBar(props: AppProps) {
	return (
		<nav className={props.className} id={"navbar"}>
			<NavBarList className={"flex flex-row justify-center items-center"} />
		</nav>
	);
}

export function NavBarList({ className }: { className: string }) {
	return (
		<ul className={className}>
			<NavBarListItem href={"/"}>Home</NavBarListItem>
			<NavBarListItem href={"/about"}>About</NavBarListItem>
			<NavBarListItem href={"/contact"}>Contact</NavBarListItem>
		</ul>
	);
}
export function NavBarListItem({ className, href, children }: { className?: string; href: string; children: React.ReactNode }) {
	return (
		<li className={className}>
			<NavBarLink href={href}>{children}</NavBarLink>
		</li>
	);
}
export function NavBarLink({ href, children }: { href: string; children: React.ReactNode }) {
	return <Link href={href}>{children}</Link>;
}
