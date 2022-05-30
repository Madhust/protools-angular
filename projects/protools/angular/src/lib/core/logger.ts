export class Logger {
    constructor(public debug: boolean) {}

    public error(message: string) {
        if (this.debug) {
            throw Error(message);
        } else {
            console.warn(message);
        }
    }
}