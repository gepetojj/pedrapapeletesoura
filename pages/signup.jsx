import Head from "next/head";
import Router from "next/router";
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { auth } from "../assets/firebase";
import Validator from "../assets/Validator";
import API from "../assets/api";
import Input from "../components/Input";
import Button from "../components/Button";
import Alert from "../components/Alert";
import styles from "../styles/Sign.module.css";

export default function SignUp() {
    const userRef = useRef();
    const emailRef = useRef();
    const passRef = useRef();
    const passConfirmRef = useRef();
    const [usernErrors, setUsernErrors] = useState([false, ""]);
    const [emailErrors, setEmailErrors] = useState([false, ""]);
    const [pass1Errors, setPass1Errors] = useState([false, ""]);
    const [pass2Errors, setPass2Errors] = useState([false, ""]);
    const [alert, setAlert] = useState(false);
    const [alertProps, setAlertProps] = useState(["", ""]);

    useEffect(() => {
        auth().onAuthStateChanged((user) => {
            if (user) {
                Router.push("/menu");
            }
        });
    }, []);

    const toggleAlert = () => {
        setAlert(!alert);
    };

    const loginWithGoogle = () => {
        const googleProvider = new auth.GoogleAuthProvider();
        auth().useDeviceLanguage();
        auth()
            .signInWithPopup(googleProvider)
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
            .catch((err) => {
                setAlert(true);
                setAlertProps(["Erro ao tentar fazer login.", err.message]);
            });
    };

    const registerNewUser = async (event) => {
        event.preventDefault();
        setUsernErrors([false, ""]);
        setEmailErrors([false, ""]);
        setPass1Errors([false, ""]);
        setPass2Errors([false, ""]);
        let usern = new Validator(userRef.current.value, "user").validate();
        let email = new Validator(emailRef.current.value, "email").validate();
        let pass1 = new Validator(passRef.current.value, "pass").validate();
        let pass2 = new Validator(
            passConfirmRef.current.value,
            "pass"
        ).validate();

        if (
            usern.error === true ||
            email.error === true ||
            pass1.error === true ||
            pass2.error === true
        ) {
            setUsernErrors([usern.error, usern.message]);
            setEmailErrors([email.error, email.message]);
            setPass1Errors([pass1.error, pass1.message]);
            setPass2Errors([pass2.error, pass2.message]);
        } else if (passRef.current.value !== passConfirmRef.current.value) {
            setPass1Errors([true, "As senhas devem ser iguais."]);
            setPass2Errors([true, "As senhas devem ser iguais."]);
        } else {
            try {
                const response = await axios.post(API("/signup"), {
                    username: userRef.current.value,
                    email: emailRef.current.value,
                    password: passRef.current.value,
                    passwordConfirm: passConfirmRef.current.value,
                });
                console.log(response);
            } catch (err) {
                console.error(new Error(err));
                setAlert(true);
                setAlertProps(["Erro ao tentar criar sua conta.", err.message]);
            }
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
                            onSubmit={registerNewUser}
                        >
                            <Input
                                type="text"
                                name="username"
                                text="Usuário"
                                helperText={usernErrors[1]}
                                error={usernErrors[0]}
                                reference={userRef}
                            />
                            <Input
                                type="email"
                                name="email"
                                text="Email"
                                helperText={emailErrors[1]}
                                error={emailErrors[0]}
                                reference={emailRef}
                            />
                            <Input
                                type="password"
                                name="password"
                                text="Senha"
                                helperText={pass1Errors[1]}
                                error={pass1Errors[0]}
                                reference={passRef}
                            />
                            <Input
                                type="password"
                                name="passwordconfirm"
                                text="Senha novamente"
                                helperText={pass2Errors[1]}
                                error={pass2Errors[0]}
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
