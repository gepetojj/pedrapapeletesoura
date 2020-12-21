import { Component } from "react";
import Link from "next/link";
import styles from "../styles/Button.module.css";

export default class Button extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.link === undefined) {
            return (
                <button
                    type={this.props.type}
                    className={styles.button}
                    onClick={this.props.onClick}
                    disabled={this.props.disabled}
                >
                    {this.props.icon !== undefined ? (
                        <div className={styles.iconArea}>
                            <img
                                className={styles.icon}
                                src={this.props.icon}
                                alt="Ícone do botão"
                            />
                        </div>
                    ) : null}
                    {this.props.icon !== undefined ? (
                        <div className={styles.valueAreaIcon}>
                            <p className={styles.value}>{this.props.value}</p>
                        </div>
                    ) : (
                        <div className={styles.valueArea}>
                            <p className={styles.value}>{this.props.value}</p>
                        </div>
                    )}
                </button>
            );
        } else {
            return (
                <Link href={this.props.link}>
                    <button
                        type={this.props.type}
                        className={styles.button}
                        disabled={this.props.disabled}
                    >
                        {this.props.icon !== undefined ? (
                            <div className={styles.iconArea}>
                                <img
                                    className={styles.icon}
                                    src={this.props.icon}
                                    alt="Ícone do botão"
                                />
                            </div>
                        ) : null}
                        {this.props.icon !== undefined ? (
                            <div className={styles.valueAreaIcon}>
                                <p className={styles.value}>
                                    {this.props.value}
                                </p>
                            </div>
                        ) : (
                            <div className={styles.valueArea}>
                                <p className={styles.value}>
                                    {this.props.value}
                                </p>
                            </div>
                        )}
                    </button>
                </Link>
            );
        }
    }
}
