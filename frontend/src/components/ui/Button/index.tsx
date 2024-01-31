import styles from "./styles.module.scss";
import { ReactNode, ButtonHTMLAttributes } from "react";
import { VscLoading } from "react-icons/vsc";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	loading?: boolean;
	children: ReactNode;
}

export const Button = ({ loading, children, ...rest }: ButtonProps) => {
	return (
		<button className={styles.button} disabled={loading} {...rest}>
			{loading ? (
				<VscLoading color="#fff" size={16} />
			) : (
				<a className={styles.buttonText}>{children} </a>
			)}
		</button>
	);
};
