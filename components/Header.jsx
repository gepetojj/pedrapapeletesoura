import Link from "next/link";
import styles from "../styles/Header.module.css";

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.title}>
                <Link href="/">
                    <h4>Pedra, papel e tesoura</h4>
                </Link>
            </div>
            <div className={styles.actions}>
                <div className={styles.signup}>
                    <Link href="/signup">
                        <a>Registrar</a>
                    </Link>
                </div>
                <div className={styles.signin}>
                    <Link href="/signin">
                        <a className={styles.signinButton}>Entrar</a>
                    </Link>
                </div>
            </div>
        </header>
    );
}
