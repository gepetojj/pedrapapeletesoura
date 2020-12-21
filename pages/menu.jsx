import Head from "next/head";
import Router from "next/router";
import axios from "axios";
import { useEffect, useState } from "react";
import API from "../assets/api";
import { auth } from "../assets/firebase";

export default function Menu() {
    useEffect(() => {
        auth().onAuthStateChanged(async (user) => {
            if (user) {
                const token = await auth().currentUser.getIdToken();
                axios
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

    return (
        <main>
            <Head>
                <title>Menu - Pedra, papel e tesoura</title>
            </Head>
        </main>
    );
}
