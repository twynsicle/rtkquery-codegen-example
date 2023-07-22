import type { ConfigFile } from '@rtk-query/codegen-openapi';

const config: ConfigFile = {
    schemaFile: './openapi.json',
    apiFile: '../todoClient.ts',
    apiImport: 'todoClient',
    outputFile: '../GENERATED_todoClientEndpoints.ts',
    exportName: 'todoClientEndpoints',
    hooks: true,
    filterEndpoints: (name: string) => {
        return name !== 'healthCheck';
    },
};

export default config;
