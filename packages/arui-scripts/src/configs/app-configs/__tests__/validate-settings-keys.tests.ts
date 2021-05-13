import validateSettingsKeys from '../validate-settings-keys';

describe('validate-settings-keys', () => {
    it('should warn with console.warn if object contains unknown properties', () => {
        const objectWithSettings = {
            name: 'vasia',
            country: 'russia',
        };
        const allowedKeys = ['name'];
        jest.spyOn(console, 'warn');

        validateSettingsKeys(allowedKeys, objectWithSettings);

        expect(console.warn).toHaveBeenCalledTimes(1);
    });
});
