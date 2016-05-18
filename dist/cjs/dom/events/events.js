/*can-util@3.0.0-pre.18#dom/events/events*/
module.exports = {
    addEventListener: function () {
        this.addEventListener.apply(this, arguments);
    },
    removeEventListener: function () {
        this.removeEventListener.apply(this, arguments);
    },
    canAddEventListener: function () {
        return this.nodeName && (this.nodeType === 1 || this.nodeType === 9) || this === window;
    }
};