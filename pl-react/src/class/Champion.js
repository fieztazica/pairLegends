class Champion {
    x
    y
    id

    constructor() {
        this.x = 0
        this.y = 0
        this.id = 0
    }

    constructor(x, y, id) {
        this.x = parseInt(x)
        this.y = parseInt(y)
        this.id = parseInt(id)
    }

    isEmpty() {
        return this.id === 0
    }

    isBarrier() {
        return this.id < 0
    }
}