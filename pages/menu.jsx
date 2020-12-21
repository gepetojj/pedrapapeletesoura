import Head from "next/head";
import Router from "next/router";
import axios from "axios";
import { useEffect, useState } from "react";
import API from "../assets/api";
import { auth } from "../assets/firebase";
import User from "../components/User";
import styles from "../styles/Menu.module.css";

export default function Menu() {
    useEffect(() => {
        auth().onAuthStateChanged(async (user) => {
            if (user) {
                setUserData(user);
                const token = await auth().currentUser.getIdToken();
                await axios
                    .get(API(`/authorize?token=${token}`))
                    .then((response) => {
                        if (response.data.error === true) {
                            Router.push("/");
                        }
                    })
                    .catch((err) => {
                        console.error(err);
                        Router.push("/");
                    });
            } else {
                console.info(
                    "Você precisa estar logado para acessar esta página."
                );
                Router.push("/");
            }
        });
    }, []);

    const getUserData = async () => {
        return await auth().currentUser;
    };

    const [userData, setUserData] = useState(getUserData());

    return (
        <main>
            <Head>
                <title>Menu - Pedra, papel e tesoura</title>
            </Head>
            <div className={styles.userArea}>
                <User avatar={userData.photoURL} name={userData.displayName} />
            </div>
        </main>
    );
}
