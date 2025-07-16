/*#__PURE__*/
export function withResolvers() {
    const out = {};
    out.promise = new Promise((resolve, reject) => {
        out.resolve = resolve;
        out.reject = reject;
    });
    return out;
}
/*#__PURE__*/
export function isSupported() {
    return 'withResolvers' in Promise && typeof Promise.withResolvers === 'function';
}
/*#__PURE__*/
export function isPolyfilled() {
    return 'withResolvers' in Promise && Promise.withResolvers === withResolvers;
}
export function apply() {
    if (!isSupported()) {
        Object.assign(Promise, { withResolvers });
    }
}
//# sourceMappingURL=promise-withResolvers.js.map