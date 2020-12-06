export class Winner {
    private index: number;
    private name: string;
    private date: string;
    private prize: string;

    constructor (i: number, d: string, n:string, p:string) {
        this.index = i;
        this.name = n;
        this.date = d;
        this.prize = p;
    }

    getIndex() {
        return this.index;
    }

    getName() {
        return this.name;
    }
    getDate() {
        return this.date;
    }
    getPrize() {
        return this.prize;
    }

    getFullInfo () {
        return this.date + " : " + this.name + " (" + this.prize + ")";
    }
}