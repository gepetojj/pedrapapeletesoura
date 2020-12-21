import { Component } from "react";
import styles from "../styles/Input.module.css";

export default class Input extends Component {
    constructor(props) {
        super(props);

        this.state = {
            type: this.props.type,
            name: this.props.name,
            text: this.props.text,
            ref: this.props.reference,
            onChange: this.props.onChange,
            labelFocused: false,
            fieldValue: "",
        };
    }

    changeTextState = (event) => {
        this.setState({ fieldValue: event.target.value });
    };

    toggleFocus = () => {
        if (this.state.fieldValue.length > 0) {
            this.setState({ labelFocused: true });
        } else {
            this.setState({ labelFocused: !this.state.labelFocused });
        }
    };

    render() {
        return (
            <div
                className={
                    this.props.error !== true ? styles.input : styles.errorInput
                }
            >
                <label className={styles.underlined}>
                    <input
                        className={styles.textField}
                        type={this.state.type}
                        name={this.state.name}
                        ref={this.state.ref}
                        onFocus={this.toggleFocus}
                        onBlur={this.toggleFocus}
                        onChange={this.changeTextState}
                        disabled={this.props.disabled}
                        required
                    />
                    <span
                        className={
                            this.state.labelFocused === false
                                ? styles.label
                                : styles.labelFocused
                        }
                    >
                        {this.state.text}
                    </span>
                    {this.props.helperText !== undefined ? (
                        <span className={styles.helper}>
                            {this.props.helperText}
                        </span>
                    ) : null}
                    {this.props.disabled === true ? (
                        <span className={styles.loading}>
                            <img
                                className={styles.loadingIcon}
                                src="loading.gif"
                                alt="Ícone de carregando"
                            />
                        </span>
                    ) : null}
                </label>
            </div>
        );
    }
}
