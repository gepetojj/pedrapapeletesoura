import styles from "../styles/Error.module.css";

function Error({ statusCode }) {
    return (
        <div className={styles.error}>
            <div className={styles.content}>
                <div>
                    <h2>Erro :/</h2>
                </div>
                <div>
                    <p>
                        {statusCode
                            ? `Houve um erro ${statusCode} nesta página.`
                            : "Houve um erro desconhecido nesta página."}
                    </p>
                </div>
            </div>
        </div>
    );
}

Error.getInitialProps = ({ res, err }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
    return { statusCode };
};

export default Error;
