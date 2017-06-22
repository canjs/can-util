let _moduleExports;

export default _moduleExports;

// Returns `true` if the object can have properties (no `null`s).
_moduleExports = function (current) {
    return (/^f|^o/.test(typeof current)
    );
};