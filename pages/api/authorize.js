import nextConnect from "next-connect";
import firebase from "../../assets/firebaseAdmin";

const handler = nextConnect();

handler
    .get(async (req, res) => {
        const token = req.query.token;

        if (token === undefined) {
            return res.status(400).json({
                error: true,
                message: "O token de confirmação não pode ser nulo.",
            });
        }

        await firebase
            .auth()
            .verifyIdToken(token)
            .then(() => {
                return res.status(200).json({ error: false });
            })
            .catch((err) => {
                console.error(err);
                return res.status(500).json({
                    error: true,
                    message: "Houve um erro ao tentar verificar seu login.",
                });
            });
    })
    .all((req, res) => {
        if (req.method !== "GET") {
            return res.status(405).json({
                error: true,
                message: "Método não suportado.",
            });
        }
    });

export default handler;
