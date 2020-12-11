class Match {
    constructor(invokerId, invokerName, invokerSocket) {
        this.invokerId = invokerId;
        this.invokerName = invokerName;
        this.invokerSocket = invokerSocket;
        this.oponnentId = "";
        this.oponnentName = "";
        this.matchStarted = false;
    }

    setOponent(oponnentId, oponnentName) {
        this.oponnentId = oponnentId;
        this.oponnentName = oponnentName;
        return;
    }

    startMatch() {
        if (this.matchStarted === true) {
            throw new Error("A partida já começou.");
        } else {
            this.matchStarted = true;
        }
    }
}
