import firebase from "../../assets/firebaseAdmin";

export default (req, res) => {
    const token = req.query.token;

    if (token === undefined) {
        return res.status(400).json({
            error: true,
            message: "O token de confirmação não pode ser nulo.",
        });
    }

    try {
        firebase
            .auth()
            .verifyIdToken(token)
            .then((userData) => {
                console.log(userData);
                return res.json({ error: false });
            })
            .catch((err) => {
                console.error(err);
                return res.status(500).json({
                    error: true,
                    message: "Houve um erro ao tentar verificar seu login.",
                });
            });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            error: true,
            message: "Houve um erro com a conexão ao banco de dados.",
        });
    }
};
