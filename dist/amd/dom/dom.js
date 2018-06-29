/*can-util@3.11.6#dom/dom*/
define([
    'require',
    'exports',
    'module',
    './ajax/ajax',
    './attr/attr',
    './child-nodes/child-nodes',
    './class-name/class-name',
    './contains/contains',
    './data/data',
    './dispatch/dispatch',
    './document/document',
    './events/events',
    './frag/frag',
    './fragment/fragment',
    './is-of-global-document/is-of-global-document',
    './matches/matches',
    './mutate/mutate',
    './mutation-observer/mutation-observer'
], function (require, exports, module) {
    (function (global, require, exports, module) {
        'use strict';
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
    }(), require, exports, module));
});