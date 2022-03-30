jest.mock('../../app-configs', () => ({
    overridesPath: ['overrides']
}));

beforeEach(() => {
    jest.resetModules();
});

it('should return config as is if there is no matched overrides keys', () => {
    jest.doMock('overrides', () => {
        return {};
    }, { virtual: true });

    const applyOverrides = require('../apply-overrides').default;

    const baseConfig = {
        something: true,
        other: false
    };

    expect(applyOverrides('foo', baseConfig)).toBe(baseConfig);
});


it('should throw an error when overrides is not a function', () => {
    jest.doMock('overrides', () => {
        return {
            foo: 1
        };
    }, { virtual: true });

    const applyOverrides = require('../apply-overrides').default;

    expect(() => applyOverrides('foo', {})).toThrowError(TypeError);
});

it('should call override function and update config', () => {
    const override = jest.fn(() => 'new value');
    jest.doMock('overrides', () => {
        return {
            foo: override
        };
    }, { virtual: true });

    const applyOverrides = require('../apply-overrides').default;

    expect(applyOverrides('foo', {})).toBe('new value');
    expect(override).toHaveBeenCalledWith({}, { overridesPath: ['overrides'] });
});

it('should call multiple override functions and update config with latest value', () => {
    const override1 = jest.fn(() => 'new value');
    const override2 = jest.fn(() => 'new value2');
    jest.doMock('overrides', () => {
        return {
            foo: override1,
            bar: override2
        };
    }, { virtual: true });

    const applyOverrides = require('../apply-overrides').default;

    expect(applyOverrides(['foo', 'bar'], {})).toBe('new value2');
    expect(override1).toHaveBeenCalledWith({}, { overridesPath: ['overrides'] });
    expect(override2).toHaveBeenCalledWith('new value', { overridesPath: ['overrides'] });
});
