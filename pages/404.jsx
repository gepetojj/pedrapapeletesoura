import styles from "../styles/Error.module.css";

function Error404() {
    return (
        <div className={styles.error}>
            <div className={styles.content}>
                <div>
                    <h2>Erro :/</h2>
                </div>
                <div>
                    <p>Houve um erro 404 nesta página.</p>
                </div>
            </div>
        </div>
    );
}

export default Error404;
