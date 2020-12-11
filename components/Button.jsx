import { Component } from "react";
import Link from "next/link";
import styles from "../styles/Button.module.css";

export default class Button extends Component {
    constructor(props) {
        super(props);

        this.state = {
            type: this.props.type,
            value: this.props.value,
            icon: this.props.icon,
            link: this.props.link,
            onClick: this.props.onClick,
        };
    }

    render() {
        if (this.state.link === undefined) {
            return (
                <button
                    type={this.state.type}
                    className={styles.button}
                    onClick={this.state.onClick}
                >
                    {this.state.icon !== undefined ? (
                        <div className={styles.iconArea}>
                            <img
                                className={styles.icon}
                                src={this.state.icon}
                                alt="Ícone do botão"
                            />
                        </div>
                    ) : null}
                    {this.state.icon !== undefined ? (
                        <div className={styles.valueAreaIcon}>
                            <p className={styles.value}>{this.state.value}</p>
                        </div>
                    ) : (
                        <div className={styles.valueArea}>
                            <p className={styles.value}>{this.state.value}</p>
                        </div>
                    )}
                </button>
            );
        } else {
            return (
                <Link href={this.state.link}>
                    <button type={this.state.type} className={styles.button}>
                        {this.state.icon !== undefined ? (
                            <div className={styles.iconArea}>
                                <img
                                    className={styles.icon}
                                    src={this.state.icon}
                                    alt="Ícone do botão"
                                />
                            </div>
                        ) : null}
                        {this.state.icon !== undefined ? (
                            <div className={styles.valueAreaIcon}>
                                <p className={styles.value}>
                                    {this.state.value}
                                </p>
                            </div>
                        ) : (
                            <div className={styles.valueArea}>
                                <p className={styles.value}>
                                    {this.state.value}
                                </p>
                            </div>
                        )}
                    </button>
                </Link>
            );
        }
    }
}
