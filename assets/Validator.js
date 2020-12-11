class Validator {
    constructor(value, type) {
        this.value = value;
        this.type = type;
        this.emailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        this.usernFormat = /^[a-zA-Z0-9]+$/;
        this.passwFormat = /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{8,32}$/;
    }

    setValue(value) {
        this.value = value;
    }

    validate() {
        switch (this.type) {
            case "email":
                if (
                    this.value === null ||
                    this.value === undefined ||
                    this.value.length < 1
                ) {
                    return {
                        error: true,
                        message: "Seu email não pode ser nulo.",
                    };
                } else if (!this.value.match(this.emailFormat)) {
                    return {
                        error: true,
                        message: "Seu email não é válido.",
                    };
                } else {
                    return { error: false, message: "" };
                }
            case "user":
                if (
                    this.value === null ||
                    this.value === undefined ||
                    this.value.length < 1
                ) {
                    return {
                        error: true,
                        message: "Seu usuário não pode ser nulo.",
                    };
                } else if (this.value.length > 16) {
                    return {
                        error: true,
                        message:
                            "Seu usuário não pode ter mais que 16 caracteres.",
                    };
                } else if (!this.value.match(this.usernFormat)) {
                    return {
                        error: true,
                        message: "Seu usuário só pode ter letras e números.",
                    };
                } else {
                    return { error: false, message: "" };
                }
            case "pass":
                if (
                    this.value === null ||
                    this.value === undefined ||
                    this.value.length < 8
                ) {
                    return {
                        error: true,
                        message:
                            "Sua senha não pode ser nula, nem ter menos que 8 caracteres.",
                    };
                } else if (this.value.length > 32) {
                    return {
                        error: true,
                        message:
                            "Sua senha não pode ter mais que 32 caracteres.",
                    };
                } else if (!this.value.match(this.passwFormat)) {
                    return {
                        error: true,
                        message:
                            "Sua senha deve ter letras minúsculas, maiúsculas e números.",
                    };
                } else {
                    return { error: false, message: "" };
                }
        }
    }
}

export default Validator;
