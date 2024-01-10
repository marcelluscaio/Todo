import { ReactComponentElement, ReactNode } from "react";
import styles from "./styles.module.scss";

export default function Container({
	tag = "div",
	children,
}: {
	tag?: "div" | "section";
	children: ReactNode;
}) {
	const Tag = tag;
	return <Tag className={styles.container}>{children}</Tag>;
}
