"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { MouseEventHandler } from "react";

function handleButton(e: Event) {
	e.preventDefault();
	console.log(e.target);
}
export default function Home() {
	return (
		<>
			<header>To do App</header>
			<form>
				<input />
				<button
					type="submit"
					//@ts-ignore
					onClick={handleButton}
				>
					Create
				</button>
			</form>
		</>
	);
}
