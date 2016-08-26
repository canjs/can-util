/*can-util@3.0.0-pre.34#dom/dom*/
define(function (require, exports, module) {
    (function (global) {
        module.exports = {
            ajax: require('./ajax/ajax'),
            attr: require('./attr/attr'),
            childNodes: require('./child-nodes/child-nodes'),
            className: require('./class-name/class-name'),
            contains: require('./contains/contains'),
            data: require('./data/data'),
            dispatch: require('./dispatch/dispatch'),
            document: require('./document/document'),
            events: require('./events/events'),
            frag: require('./frag/frag'),
            fragment: require('./fragment/fragment'),
            isOfGlobalDocument: require('./is-of-global-document/is-of-global-document'),
            matches: require('./matches/matches'),
            mutate: require('./mutate/mutate'),
            mutationObserver: require('./mutation-observer/mutation-observer')
        };
    }(function () {
        return this;
    }()));
});