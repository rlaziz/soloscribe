"use client";
import React, { useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import PostMenu from "@components/PostMenu";

async function getPosts() {
	const res = await fetch("/api/posts", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (!res.ok) {
		throw new Error(res.statusText);
	}
	const json = await res.json();
	return json.posts;
}
interface Post {
	id: number;
	title: string;
	content: string;
	author: string;
	likes: number;
	createdAt: string;
}
interface NewPost {
	title: string;
	content: string;
	userId: string;
}

async function isAuthor(id: String) {
	if (!id) {
		return false;
	}
	const res = await fetch("/api/user/isAuthor", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ userID: id }),
	});
	if (!res.ok) {
		throw new Error(res.statusText);
	}
	const json = await res.json();
	return json.isAuthor;
}
export default function Home() {
	const [posts, setPosts] = React.useState<Post[]>([]);
	const { data: session } = useSession();
	const [author, setAuthor] = React.useState(false);
	useEffect(() => {
		if (session) {
			isAuthor(session.user.id).then((res) => setAuthor(res));
		}
	}, [session]);
	const fetchPosts = async () => {
		const posts = await getPosts();
		setPosts(posts);
	};
	useEffect(() => {
		fetchPosts().then(() => console.log("Posts fetched"));
	}, []);
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const data = new FormData(e.currentTarget);
		const post = {
			title: data.get("title") as string,
			content: data.get("content") as string,
			userId: session?.user?.id as string,
		};

		const createPost = async (post: NewPost) => {
			const res = await fetch("/api/posts", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(post),
			});
			if (!res.ok) {
				throw new Error(res.statusText);
			}
			const json = await res.json();
			return json.post;
		};
		const newPost = await createPost(post);
		if (newPost) {
			if (newPost.published) {
				fetchPosts().then(() => console.log("Posts fetched"));
			}
		}
	};
	return (
		<div className={"w-full h-full flex flex-col justify-center items-center"}>
			<button className={"absolute top-2 left-2 bg-blue-500 text-white px-4 py-2 rounded-lg"} onClick={() => signIn("github")}>
				Sign in
			</button>
			<button className={"absolute top-2 right-2 bg-blue-500 text-white px-4 py-2 rounded-lg"} onClick={() => signOut()}>
				Sign out
			</button>
			<div className={"w-1/2 h-full flex items-center flex-col gap-8"}>
				<p className={"text-4xl font-bold"}>Create Post</p>
				{author ? <PostMenu onSubmit={handleSubmit} /> : <p className={"text-xl"}>You must be an author to create a post</p>}
			</div>
			<div className={"w-1 h-full bg-black"}></div>
			<div className={"w-1/2 h-full flex items-center pt-20 flex-col"}>
				<h1 className={"text-4xl font-bold"}>SoloScribe</h1>
				<p className={"text-xl"}>Write your own story</p>
				<p className={"text-xl"}>Posts:</p>
				<ul className={"flex flex-col justify-center items-center"}>
					{posts.map((post) => (
						<li key={post.id} className={"flex flex-row justify-center items-center gap-2"}>
							<p className={"text-xl"}>{post.title}</p>
							<br />
							<p className={"text-xl"}>{post.content}</p>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
