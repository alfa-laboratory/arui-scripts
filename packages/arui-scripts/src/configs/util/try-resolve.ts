export function tryResolve(...args: Parameters<typeof require.resolve>) {
    try {
        return require.resolve(...args);
    } catch (e) {
        return undefined;
    }
}
