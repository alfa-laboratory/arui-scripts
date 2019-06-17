function arrayConcatCustomizer(objValue, srcValue) {
    if (Array.isArray(objValue)) {
        return objValue.concat(srcValue);
    }
}

module.exports = arrayConcatCustomizer;
