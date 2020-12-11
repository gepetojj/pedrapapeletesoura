import Head from "next/head";
import Router from "next/router";
import { useEffect, useState } from "react";
import { auth } from "../assets/firebase";
import styles from "../styles/Error.module.css";

export default function SignOut() {
    const [error, setError] = useState(false);

    useEffect(() => {
        auth()
            .signOut()
            .then(() => {
                Router.push("/signin");
            })
            .catch((err) => {
                console.log(err.message);
                setError(true);
            });
    }, []);

    return (
        <main>
            <Head>
                <title>[Saindo] - Pedra, papel e tesoura</title>
            </Head>
            <div className={styles.error}>
                {error === true ? (
                    <div className={styles.content}>
                        <div>
                            <h2>Erro :/</h2>
                        </div>
                        <div>
                            <p>Houve um erro ao tentar sair da sua conta.</p>
                        </div>
                    </div>
                ) : (
                    <div className={styles.content}>
                        <h2>Aguarde...</h2>
                    </div>
                )}
            </div>
        </main>
    );
}
