export class Attributes<T extends object> {

    constructor(private data: T) {}

    get = <K extends keyof T>(key: K): T[K] => {
        return this.data[key];
    }

    set(newProps: T): void {
        Object.assign(this.data, newProps);
    }

    get all(): T {
        return this.data;
    }
}