class MAX_SPEED {
    static _value = 0;
    static _observers = [];

    constructor(value) {
        this._value = value;
        this._observers = [];
    }

    static registerObserver(callback) {
        this._observers.push(callback);
    }

    static value() {
        return this._value;
    }

    static setValue(value) {
        this._value = value;
        this._observers.forEach( (observer) => {
            observer(value)
        });
    }
}

module.exports = MAX_SPEED;