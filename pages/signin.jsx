import Head from "next/head";
import Router from "next/router";
import { useRef, useState, useEffect } from "react";
import { auth } from "../assets/firebase";
import Validator from "../assets/Validator";
import Input from "../components/Input";
import Button from "../components/Button";
import Alert from "../components/Alert";
import styles from "../styles/Sign.module.css";

export default function SignIn() {
    const emailRef = useRef();
    const passRef = useRef();
    const [emailErrors, setEmailErrors] = useState([false, ""]);
    const [passwErrors, setPasswErrors] = useState([false, ""]);
    const [alert, setAlert] = useState(false);
    const [alertProps, setAlertProps] = useState(["", ""]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        auth().onAuthStateChanged((user) => {
            if (user) {
                if (user.emailVerified && user.emailVerified === true) {
                    Router.push("/menu");
                } else if (user.emailVerified && user.emailVerified === false) {
                    setAlert(true);
                    setAlertProps([
                        "Erro ao tentar fazer login.",
                        "Verifique seu email antes de entrar.",
                    ]);
                } else if (!user.emailVerified) {
                    Router.push("/menu");
                }
            }
        });
    }, []);

    const toggleAlert = () => {
        setAlert(!alert);
    };

    const loginWithGoogle = () => {
        setLoading(true);
        const googleProvider = new auth.GoogleAuthProvider();
        auth().useDeviceLanguage();
        auth()
            .signInWithPopup(googleProvider)
            .catch((err) => {
                setAlert(true);
                setAlertProps(["Erro ao tentar fazer login.", err.message]);
                setLoading(false);
            });
    };

    const loginWithTwitter = () => {
        setLoading(true);
        const twitterProvider = new auth.TwitterAuthProvider();
        auth().useDeviceLanguage();
        auth()
            .signInWithPopup(twitterProvider)
            .catch((err) => {
                setAlert(true);
                setAlertProps(["Erro ao tentar fazer login.", err.message]);
                setLoading(false);
            });
    };

    const loginWithEmail = (event) => {
        event.preventDefault();
        setLoading(true);
        let email = new Validator(emailRef.current.value, "email").validate();
        let passw = new Validator(passRef.current.value, "pass").validate();

        if (email.error === true || passw.error === true) {
            setEmailErrors([email.error, email.message]);
            setPasswErrors([passw.error, passw.message]);
            setLoading(false);
        } else {
            setEmailErrors([false, ""]);
            setPasswErrors([false, ""]);
            auth()
                .signInWithEmailAndPassword(
                    emailRef.current.value,
                    passRef.current.value
                )
                .then((result) => {
                    if (result.email_verified === false) {
                        setAlert(true);
                        setAlertProps([
                            "Erro ao tentar fazer login.",
                            "Verifique seu email antes de entrar.",
                        ]);
                        setLoading(false);
                    }
                })
                .catch((err) => {
                    setAlert(true);
                    setAlertProps(["Erro ao tentar fazer login.", err.message]);
                    setLoading(false);
                });
        }
    };

    return (
        <main>
            <Head>
                <title>Pedra, papel e tesoura</title>
            </Head>
            <Alert visible={alert} title={alertProps[0]} desc={alertProps[1]}>
                <img
                    className={styles.close}
                    src="/close.svg"
                    alt="Icone de fechar"
                    onClick={toggleAlert}
                />
            </Alert>
            <div className="container">
                <div className={styles.controller}>
                    <div className={styles.left}>
                        <div className={styles.title}>
                            <h2>Faça login</h2>
                        </div>
                        <div className={styles.description}>
                            <h4>Se conecte para começar a jogar.</h4>
                        </div>
                        <div className={styles.heroImage}>
                            <img
                                className={styles.image}
                                src="/login_img.svg"
                                alt="Pessoas jogando"
                            />
                        </div>
                    </div>
                    <div className={styles.right}>
                        <div className={styles.formTitle}>
                            <p>Escolha o método de login.</p>
                        </div>
                        <form className={styles.form} onSubmit={loginWithEmail}>
                            <Input
                                type="email"
                                name="email"
                                text="Email"
                                helperText={emailErrors[1]}
                                error={emailErrors[0]}
                                reference={emailRef}
                                disabled={loading}
                            />
                            <Input
                                type="password"
                                name="password"
                                text="Senha"
                                helperText={passwErrors[1]}
                                error={passwErrors[0]}
                                reference={passRef}
                                disabled={loading}
                            />
                            <Button
                                type="submit"
                                value="Entrar"
                                disabled={loading}
                            />
                        </form>
                        <div className={styles.otherOptions}>
                            <Button
                                type="button"
                                value="Entrar com Google"
                                icon="/google.png"
                                onClick={loginWithGoogle}
                                disabled={loading}
                            />
                            <Button
                                type="button"
                                value="Entrar com Twitter"
                                icon="/twitter.png"
                                onClick={loginWithTwitter}
                                disabled={loading}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
