import styles from "./styles.module.scss";

export default function Button({
	text,
	type = "button",
}: {
	text: string;
	type?: "button" | "submit" | "reset";
}) {
	return (
		<button
			type={type}
			className={styles.button}
		>
			{text}
		</button>
	);
}
