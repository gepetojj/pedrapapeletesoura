import firebase from "../../assets/firebaseAdmin";

export default (req, res) => {
    const token = req.query.token;

    if (token !== undefined) {
        try {
            firebase
                .auth()
                .verifyIdToken(token)
                .then((userData) => {
                    console.log(userData);
                })
                .catch((err) => {
                    console.error(err);
                });
            return res.json({ error: false });
        } catch (err) {
            console.error(err);
            return res.json({
                error: true,
                message: "Houve um erro com a conexão ao banco de dados.",
            });
        }
    } else {
        return res.json({
            error: true,
            message: "O token de confirmação não pode ser nulo.",
        });
    }
};
