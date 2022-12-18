import { readFileSync, writeFileSync } from "fs";
import { v4 as uuid } from "uuid";

class DB<T extends { id?: string }> {
    constructor(public path: string) {
        this.path = path;
    }

    getData(): Array<T> {
        return JSON.parse(readFileSync(this.path).toString());
    }

    findElementIndex(id: string): number {
        const dataArr: Array<T> = this.getData();

        const index = dataArr?.findIndex((element: T) => element.id === id);

        return index;
    }

    createElement(body: any): void {
        const dataArr: Array<T> = this.getData();

        dataArr.push({ id: uuid().split("-").join(""), ...body });

        writeFileSync(this.path, JSON.stringify(dataArr));
    }

    updateElement(id: string, body: Partial<T>): number | void {
        const dataArr: Array<T> = this.getData();

        const index = this.findElementIndex(id);

        if (index === -1) {
            return -1;
        }

        dataArr[index] = { ...dataArr[index], ...body };

        writeFileSync(this.path, JSON.stringify(dataArr));
    }

    deleteElement(id: string): number | void {
        const dataArr: Array<T> = this.getData();

        const index = this.findElementIndex(id);

        if (index === -1) {
            return -1;
        }

        dataArr.splice(index, 1);

        writeFileSync(this.path, JSON.stringify(dataArr));
    }
}

export default DB;
