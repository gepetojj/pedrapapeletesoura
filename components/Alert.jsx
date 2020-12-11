import { Component } from "react";
import styles from "../styles/Alert.module.css";

export default class Alert extends Component {
    render() {
        if (this.props.visible === true) {
            return (
                <div className={styles.controller}>
                    <div className={styles.alert}>
                        <div className={styles.close}>
                            {this.props.children}
                        </div>
                        <div className={styles.title}>
                            <h3>{this.props.title}</h3>
                        </div>
                        <hr className={styles.divider} />
                        <div className={styles.desc}>
                            <p>{this.props.desc}</p>
                        </div>
                    </div>
                </div>
            );
        } else {
            return null;
        }
    }
}
