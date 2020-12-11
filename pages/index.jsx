import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home() {
    return (
        <main>
            <Head>
                <title>Pedra, papel e tesoura</title>
            </Head>
            <div className="container">
                <div className={styles.controller}>
                    <div className={styles.left}>
                        <div className={styles.title}>
                            <h2>Pedra, papel e tesoura</h2>
                        </div>
                        <div className={styles.description}>
                            <h4>
                                Jogue online com amigos de uma forma simples.
                            </h4>
                        </div>
                    </div>
                    <div className={styles.right}>
                        <img
                            className={styles.image}
                            src="/ppt_img.svg"
                            alt="Pessoas se divertindo"
                        />
                    </div>
                </div>
            </div>
        </main>
    );
}
