import firebase from "firebase-admin";

const firebaseConfig = {
    type: "service_account",
    project_id: "pedrapapeletesoura-online",
    private_key_id: process.env.PKID,
    private_key: process.env.PK.replace(/\\n/g, "\n"),
    client_email: process.env.CEMAIL,
    client_id: process.env.CID,
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: process.env.CURL,
};

if (!firebase.apps.length) {
    firebase.initializeApp({
        credential: firebase.credential.cert(firebaseConfig),
        databaseURL: "https://pedrapapeletesoura-online.firebaseio.com",
    });
}

module.exports = firebase;
