import Head from "next/head";
import { useRef, useState } from "react";
import { auth } from "../assets/firebase";
import Input from "../components/Input";
import Button from "../components/Button";
import Alert from "../components/Alert";
import styles from "../styles/Sign.module.css";

export default function SignUp() {
    const userRef = useRef();
    const emailRef = useRef();
    const passRef = useRef();
    const passConfirmRef = useRef();
    const [alert, setAlert] = useState(false);

    const toggleAlert = () => {
        setAlert(!alert);
    };

    const loginWithGoogle = () => {
        const googleProvider = new auth.GoogleAuthProvider();
        auth().useDeviceLanguage();
        auth()
            .signInWithPopup(googleProvider)
            .then((result) => {
                console.log(result);
            })
            .catch((err) => {
                setAlert(true);
                setAlertProps(["Erro ao tentar fazer login.", err.message]);
            });
    };

    const loginWithTwitter = () => {
        const twitterProvider = new auth.TwitterAuthProvider();
        auth().useDeviceLanguage();
        auth()
            .signInWithPopup(twitterProvider)
            .then((result) => {
                console.log(result);
            })
            .catch((err) => {
                setAlert(true);
                setAlertProps(["Erro ao tentar fazer login.", err.message]);
            });
    };

    return (
        <main>
            <Head>
                <title>Pedra, papel e tesoura</title>
            </Head>
            <Alert
                visible={alert}
                title="Alerta"
                desc="Seu oponente desconectou e sua partida foi encerrada."
            >
                <p onClick={toggleAlert}>x</p>
            </Alert>
            <div className="container">
                <div className={styles.controller}>
                    <div className={styles.left}>
                        <div className={styles.title}>
                            <h2>Crie sua conta</h2>
                        </div>
                        <div className={styles.description}>
                            <h4>Gratuitamente, em menos de 1 minuto.</h4>
                        </div>
                        <div className={styles.heroImage}>
                            <img
                                className={styles.image}
                                src="/register_img.svg"
                                alt="Pessoas jogando"
                            />
                        </div>
                    </div>
                    <div className={styles.right}>
                        <div className={styles.formTitle}>
                            <p>Preencha o formulário.</p>
                        </div>
                        <form
                            className={styles.form}
                            onSubmit={(event) => {
                                event.preventDefault();
                                console.log(
                                    userRef.current.value,
                                    passRef.current.value
                                );
                            }}
                        >
                            <Input
                                type="text"
                                name="username"
                                text="Usuário"
                                helperText=""
                                error={false}
                                reference={userRef}
                            />
                            <Input
                                type="email"
                                name="email"
                                text="Email"
                                helperText=""
                                error={false}
                                reference={emailRef}
                            />
                            <Input
                                type="password"
                                name="password"
                                text="Senha"
                                helperText=""
                                error={false}
                                reference={passRef}
                            />
                            <Input
                                type="password"
                                name="passwordconfirm"
                                text="Senha novamente"
                                helperText=""
                                error={false}
                                reference={passConfirmRef}
                            />
                            <Button type="submit" value="Registrar" />
                        </form>
                        <div className={styles.otherOptions}>
                            <Button
                                type="button"
                                value="Entrar com Google"
                                icon="/google.png"
                                onClick={loginWithGoogle}
                            />
                            <Button
                                type="button"
                                value="Entrar com Twitter"
                                icon="/twitter.png"
                                onClick={loginWithTwitter}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
