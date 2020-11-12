export class Winner {
    public name: string;
    public date: string;
    public prize: string;

    constructor (d: string, n:string, p:string) {
        this.name = n;
        this.date = d;
        this.prize = p;
    }

    getFullInfo () {
        return this.date + " : " + this.name + " (" + this.prize + ")";
    }
}