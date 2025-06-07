export class Filters {
    constructor(from, to) {
        this.from = from;
        this.to = to;
    }

    filterPrice(price) {
        return price >= this.from && price <= this.to
    }
}