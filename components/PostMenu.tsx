"use client";
import React, { FormEventHandler } from "react";
import { useSession } from "next-auth/react";

export default function PostMenu({ onSubmit }: { onSubmit: FormEventHandler }) {
	return (
		<form className={"flex flex-col justify-center items-center w-3/4 gap-4"} onSubmit={onSubmit}>
			<label className={"flex flex-row w-full gap-8 justify-center"}>
				<label className={"text-2xl font-medium w-32 h-fit"}>Title:</label>
				<textarea name={"title"} className={"w-full overflow-x-clip px-2 border-2 border-black text-xl min-h-8"} minLength={50} maxLength={128} />
			</label>
			<label className={"flex flex-row w-full gap-8"}>
				<label className={"text-2xl font-medium w-32 h-fit"}>Content:</label>
				<textarea name={"content"} className={"w-full px-2 border-2 border-black text-xl max-h-96 min-h-8"} minLength={1000} maxLength={10000} />
			</label>
			<button type={"submit"} className={"px-4 rounded-md py-2 bg-blue-500 text-white text-xl font-bold"}>
				Submit
			</button>
		</form>
	);
}
