(function ($, window, document) {
    var Observable = function () {
        this._observers = [];
        this._fires = [];
        $(this._initObservable.bind(this));
    }, ObservableTrait = Observable.prototype;

    ObservableTrait._initObservable = function () {
        this.$observableTarget = this._getObservableTarget();
        this.observe = this._observeDirect.bind(this);
        this.fire = this._fireDirect.bind(this);
        this._applyObservers();
        this._applyFires();
    };

    ObservableTrait.getObservableTarget = function () {
        return this.$observableTarget;
    };

    ObservableTrait.observe = function (event, fn, selector) {
        this._observers.push([event, fn, selector]);
    };

    ObservableTrait.fire = function (event, context) {
        this._fires.push([event, context]);
    };

    ObservableTrait._observeDirect = function (event, fn, selector) {
        this.getObservableTarget().on(event, selector, fn.bind(this));
    };

    ObservableTrait._fireDirect = function (event, context) {
        this.getObservableTarget().trigger(event, [context || this._getContext()]);
    };

    ObservableTrait._applyObservers = function () {
        var observer;
        while (observer = this._observers.pop()) {
            this.observe.apply(this, observer);
        }
    };

    ObservableTrait._applyFires = function () {
        var fire;
        while (fire = this._fires.pop()) {
            this.fire.apply(this, fire);
        }
    };

    ObservableTrait._getObservableTarget = function () {
        return $(document);
    };

    ObservableTrait._getContext = function () {
        return this;
    };

    window.trait.Observable = Observable;
})(jQuery, window, document);