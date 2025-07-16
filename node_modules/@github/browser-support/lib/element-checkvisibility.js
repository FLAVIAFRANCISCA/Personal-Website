export function checkVisibility({ checkOpacity = false, checkVisibilityCSS = false } = {}) {
    if (!this.isConnected)
        return false;
    const styles = getComputedStyle(this);
    if (styles.getPropertyValue('display') === 'contents')
        return false;
    if (checkVisibilityCSS && styles.getPropertyValue('visibility') !== 'visible')
        return false;
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    let node = this;
    while (node) {
        const nodeStyles = node === this ? styles : getComputedStyle(node);
        if (nodeStyles.getPropertyValue('display') === 'none')
            return false;
        if (checkOpacity && nodeStyles.getPropertyValue('opacity') === '0')
            return false;
        if (node !== this && nodeStyles.getPropertyValue('content-visibility') === 'hidden') {
            return false;
        }
        if (!node.parentElement && node.getRootNode() instanceof ShadowRoot) {
            node = node.getRootNode().host;
        }
        else {
            node = node.parentElement;
        }
    }
    return true;
}
export function isSupported() {
    return 'checkVisibility' in Element.prototype && typeof Element.prototype.checkVisibility === 'function';
}
export function isPolyfilled() {
    return Element.prototype.checkVisibility === checkVisibility;
}
export function apply() {
    if (!isSupported()) {
        Element.prototype.checkVisibility = checkVisibility;
    }
}
//# sourceMappingURL=element-checkvisibility.js.map