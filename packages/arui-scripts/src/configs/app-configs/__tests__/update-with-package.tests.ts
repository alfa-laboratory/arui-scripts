import { AppConfigs } from '../types';
import { updateWithPackage } from '../update-with-package';

describe('update-with-package', () => {
    it('should merge keys from "appPackage.aruiScripts" field into base config', () => {
        const baseConfig = {
            dockerRegistry: 'docker.my-company.com',
            appPackage: {
                aruiScripts: {
                    dockerRegistry: 'docker.other-company.com',
                },
            },
        } as AppConfigs;

        const updatedConfig = updateWithPackage(baseConfig);

        expect(updatedConfig.dockerRegistry).toBe('docker.other-company.com');
    });
});
