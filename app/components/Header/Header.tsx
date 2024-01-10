import Button from "../Button/Button";
import styles from "./styles.module.scss";

export default function Header() {
	return (
		<header className={styles.header}>
			<h1>To do App</h1>
			<Button text="Log In" />
		</header>
	);
}
