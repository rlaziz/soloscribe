import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
	const data = await prisma.post.findMany({
		orderBy: {
			createdAt: "desc",
		},
	});

	return Response.json({ posts: data });
}
export async function POST(req: NextRequest) {
	const body = await req.json();
	const data = await prisma.post.create({
		data: {
			title: body.title,
			content: body.content,
			published: true,
			authorId: body.userId,
			likes: 0,
		},
	});

	return Response.json({ post: data });
}
