import { Component } from "react";
import styles from "../styles/User.module.css";

export default class User extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div
                className={
                    this.props.mode === "compact"
                        ? styles.controllerCompact
                        : styles.controller
                }
            >
                <div className={styles.avatar}>
                    <img src={this.props.avatar} alt="Avatar do usuário" />
                </div>
                <div className={styles.name}>
                    <p
                        dangerouslySetInnerHTML={{ __html: this.props.name }}
                    ></p>
                </div>
            </div>
        );
    }
}
