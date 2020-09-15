/**
 * @param {string|string[]|object} entryPoint Строка, массив строк или объект с энтрипоинтами
 * @param {Function} getSingleEntry Функция, возвращающая конфигурацию для одного entryPoint
 * @returns {*}
 */
function getEntry(
    entryPoint: string | string[] | Record<string, string | string[]>,
    getSingleEntry: (entry: string[]) => string[]
): string[] | Record<string, string | string[]> {
    if (typeof entryPoint === 'string') {
        return getSingleEntry([entryPoint]);
    }
    if (Array.isArray(entryPoint)) {
        return getSingleEntry(entryPoint);
    }
    // client entry also can be an object, so we must add hot loader to each entry point
    return Object.keys(entryPoint).reduce((result, entryPointName) => {
        const entry = getEntry(entryPoint[entryPointName], getSingleEntry);

        return {
            ...result,
            [entryPointName]: entry
        };
    }, {});
}

export default getEntry;
