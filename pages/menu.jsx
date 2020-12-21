import Head from "next/head";
import Router from "next/router";
import axios from "axios";
import { useEffect, useState } from "react";
import API from "../assets/api";
import { auth } from "../assets/firebase";
import User from "../components/User";
import Input from "../components/Input";
import Button from "../components/Button";
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
    const [friends, setFriends] = useState([]);

    return (
        <main>
            <Head>
                <title>Menu - Pedra, papel e tesoura</title>
            </Head>
            <div className="container">
                <div className={styles.left}>
                    <div className={styles.userArea}>
                        <User
                            avatar={userData.photoURL}
                            name={userData.displayName}
                        />
                    </div>
                    <div className={styles.friendsArea}>
                        <h3>Amigos</h3>
                        <div className={styles.scroll}>
                            {friends.length < 1 ? (
                                <p>Você ainda não adicionou amigos</p>
                            ) : null}
                            {friends.map((friend) => (
                                <User
                                    avatar={friend.avatar}
                                    name={friend.name}
                                    mode="compact"
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <div className={styles.right}>
                    <div className={styles.playOptions}>
                        <div>
                            <Button type="button" value="Encontrar partida" />
                        </div>
                        <div>
                            <Button type="button" value="Criar partida" />
                        </div>
                        <div>
                            <Input
                                type="text"
                                text="Convite"
                                helperText=""
                                error=""
                            />
                            <Button
                                type="button"
                                value="Entrar em uma partida"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
