import Link from "next/link";
import { useEffect, useState } from "react";
import { auth } from "../assets/firebase";
import styles from "../styles/Header.module.css";

export default function Header() {
    useEffect(() => {
        auth().onAuthStateChanged((user) => {
            if (user) {
                setHeaderLogged(true);
            } else {
                setHeaderLogged(false);
            }
        });
    }, []);
    const [headerLogged, setHeaderLogged] = useState(false);

    return (
        <header className={styles.header}>
            <div className={styles.title}>
                <Link href="/">
                    <h4>Pedra, papel e tesoura</h4>
                </Link>
            </div>
            {headerLogged === false ? (
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
            ) : (
                <div className={styles.actions}>
                    <div className={styles.signup}>
                        <Link href="/signout">
                            <a>Sair</a>
                        </Link>
                    </div>
                    <div className={styles.signin}>
                        <Link href="/menu">
                            <a className={styles.signinButton}>Menu</a>
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}   
