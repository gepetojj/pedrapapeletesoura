import validator from "validator";
import firebase from "../../assets/firebaseAdmin";
import axios from "axios";
import API from "../../assets/api";
import { uuid } from "uuidv4";

export default (req, res) => {
    const { username, email, password, passwordConfirm } = req.body;

    if (req.method !== "POST") {
        return res.status(405).json({
            error: true,
            message: "Método inválido.",
        });
    }

    if (
        validator.isEmpty(username, { ignore_whitespace: true }) ||
        validator.isEmpty(email, { ignore_whitespace: true }) ||
        validator.isEmpty(password, { ignore_whitespace: true }) ||
        validator.isEmpty(passwordConfirm, { ignore_whitespace: true })
    ) {
        return res.status(400).json({
            error: true,
            message: "Nenhum campo pode ser nulo.",
        });
    } else if (!validator.isLength(username, { max: 16 })) {
        return res.status(400).json({
            error: true,
            message: "Seu usuário não pode ter mais de 16 caracteres.",
        });
    } else if (
        !validator.isEmail(email, { domain_specific_validation: true })
    ) {
        return res.status(400).json({
            error: true,
            message: "Seu email não é válido.",
        });
    } else if (!validator.isLength(password, { min: 8, max: 32 })) {
        return res.status(400).json({
            error: true,
            message: "Sua senha deve ter entre 8 e 32 caracteres.",
        });
    } else if (!validator.isLength(passwordConfirm, { min: 8, max: 32 })) {
        return res.status(400).json({
            error: true,
            message: "Sua senha deve ter entre 8 e 32 caracteres.",
        });
    } else if (!validator.equals(password, passwordConfirm)) {
        return res.status(400).json({
            error: true,
            message: "Suas senhas devem ser iguais.",
        });
    } else {
        firebase
            .auth()
            .createUser({
                email,
                password,
                displayName: username,
                photoURL:
                    "https://pedrapapeletesoura.netlify.app/standard-user-image.jpg",
            })
            .then((userData) => {
                firebase
                    .auth()
                    .generateEmailVerificationLink(email)
                    .then(async (link) => {
                        const actionID = uuid();
                        firebase
                            .firestore()
                            .collection("emailRequests")
                            .doc(actionID)
                            .set({
                                targetName: username,
                                targetEmail: email,
                                link,
                            })
                            .then(() => {
                                axios
                                    .post(API(`/mail?actionID=${actionID}`), {})
                                    .then((response) => {
                                        return res.json({
                                            error: false,
                                            message:
                                                "Usuário criado. " +
                                                response.data.message,
                                        });
                                    })
                                    .catch((err) => {
                                        console.error(err.request._redirectable);
                                        firebase
                                            .auth()
                                            .deleteUser(userData.uid)
                                            .then(() => {
                                                return res
                                                    .status(err.response.status)
                                                    .json({
                                                        error: true,
                                                        message:
                                                            err.response.data
                                                                .message,
                                                    });
                                            })
                                            .catch((err) => {
                                                console.error(err);
                                                return res.status(500).json({
                                                    error: true,
                                                    message:
                                                        "Houveram vários erros.",
                                                });
                                            });
                                    });
                            });
                    });
            })
            .catch((err) => {
                console.error(err);
                return res.status(500).json({
                    error: true,
                    message: err.message,
                });
            });
    }
};
