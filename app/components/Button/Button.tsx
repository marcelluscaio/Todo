import { ComponentProps } from "react";
import styles from "./styles.module.scss";

type ButtonProps = {
	text: string;
} & ComponentProps<"button">;

export default function Button({
	text,
	type = "button",
	onClick,
	disabled = false,
}: ButtonProps) {
	return (
		<button
			type={type}
			disabled={disabled}
			onClick={onClick}
			className={styles.button}
		>
			{text}
		</button>
	);
}
