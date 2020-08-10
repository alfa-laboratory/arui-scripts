/**
 * @param {string|string[]|object} entryPoint Строка, массив строк или объект с энтрипоинтами
 * @param {Function} getSingleEntryPoint Функция, возвращающая конфигурацию для одного entryPoint
 * @returns {*}
 */
function getEntryPoint(entryPoint, getSingleEntryPoint) {
    if (typeof entryPoint === 'string') {
        return getSingleEntryPoint([entryPoint]);
    }
    if (Array.isArray(entryPoint)) {
        return getSingleEntryPoint(entryPoint);
    }
    // client entry also can be an object, so we must add hot loader to each entry point
    return Object.keys(entryPoint).reduce((result, entryPointName) => {
        const entry = getEntryPoint(entryPoint[entryPointName], getSingleEntryPoint);

        return {
            ...result,
            [entryPointName]: entry
        };
    }, {});
}

module.exports = getEntryPoint;
