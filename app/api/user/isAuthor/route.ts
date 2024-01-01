import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
	const body = await req.json();
	const { userID } = body;
	if (!userID) {
		return Response.json({
			isAuthor: false,
		});
	}
	const user = await prisma.user.findUnique({
		where: {
			id: userID,
		},
	});
	if (user) {
		return Response.json({
			isAuthor: user.isAuthor,
		});
	}
	return Response.json({
		isAuthor: false,
	});
}
