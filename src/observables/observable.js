class Observable {
    constructor(value) {
        this._value = value;
        this._observers = [];
    }

    registerObserver(callback) {
        this._observers.push(callback);
    }

    value() {
        return this._value;
    }

    setValue(value) {
        this._value = value;
        this._observers.forEach( (observer) => {
            ovserver(value)
        });
    }
}

module.exports = Observable;