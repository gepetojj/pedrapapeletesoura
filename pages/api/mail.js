import nextConnect from "next-connect";
import firebase from "../../assets/firebaseAdmin";
import nodemailer from "nodemailer";
import ejs from "ejs";

const handler = nextConnect();

handler.post((req, res) => {
    const { actionID } = req.query;
    const database = firebase.firestore().collection("emailRequests");

    if (actionID === undefined) {
        return res.status(400).json({
            error: true,
            message: "O ID da ação não pode ser nulo.",
        });
    }

    database
        .doc(actionID)
        .get()
        .then((doc) => {
            if (doc.exists) {
                const { targetName, targetEmail, link } = doc.data();
                const transporter = nodemailer.createTransport({
                    host: "smtp.gmail.com",
                    port: 465,
                    secure: true,
                    auth: {
                        user: process.env.MAILER_USER,
                        pass: process.env.MAILER_PASS,
                    },
                });

                console.log(process.env.MAILER_USER, process.env.MAILER_PASS);
                transporter.verify((err, success) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).json({
                            error: true,
                            message: "Erro no módulo transportador de emails.",
                        });
                    } else {
                        ejs.renderFile(
                            process.cwd() + "/assets/emailTemplate.ejs",
                            { username: targetName, link },
                            (err, data) => {
                                if (err) {
                                    console.error(err);
                                    return res.status(500).json({
                                        error: true,
                                        message: "Erro no módulo de templates.",
                                    });
                                } else {
                                    const emailOptions = {
                                        from: `Pedra papel e tesoura <${process.env.MAILER_USER}>`,
                                        to: targetEmail,
                                        subject:
                                            "Confirmação de conta do Pedra, papel e tesoura",
                                        html: data,
                                    };

                                    transporter.sendMail(
                                        emailOptions,
                                        (err, info) => {
                                            if (err) {
                                                database
                                                    .doc(actionID)
                                                    .delete()
                                                    .then(() => {
                                                        return res
                                                            .status(500)
                                                            .json({
                                                                error: true,
                                                                message:
                                                                    "Erro ao tentar enviar o email.",
                                                            });
                                                    })
                                                    .catch((err) => {
                                                        console.error(err);
                                                        return res
                                                            .status(500)
                                                            .json({
                                                                error: true,
                                                                message:
                                                                    "Erro ao tentar enviar o email e concluir o pedido de ação.",
                                                            });
                                                    });
                                                console.error(err);
                                                return res.status(500).json({
                                                    error: true,
                                                    message:
                                                        "Erro ao tentar enviar o email.",
                                                });
                                            } else {
                                                database
                                                    .doc(actionID)
                                                    .delete()
                                                    .then(() => {
                                                        return res.json({
                                                            error: false,
                                                            message:
                                                                "Email enviado com sucesso, verifique sua caixa de entrada.",
                                                        });
                                                    })
                                                    .catch((err) => {
                                                        console.error(err);
                                                        return res
                                                            .status(500)
                                                            .json({
                                                                error: true,
                                                                message:
                                                                    "Erro ao tentar concluir o pedido de ação.",
                                                            });
                                                    });
                                            }
                                        }
                                    );
                                }
                            }
                        );
                    }
                });
            } else {
                return res.status(400).json({
                    error: true,
                    message: "Este pedido de ação não existe.",
                });
            }
        })
        .catch((err) => {
            console.error(err);
            return res.status(500).json({
                error: true,
                message: "Erro ao tentar verificar o pedido da ação.",
            });
        });
});

export default handler;
