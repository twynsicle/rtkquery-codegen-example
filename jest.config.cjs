module.exports = {
    transform: {
        "^.+\\.(ts|tsx|js|jsx)$": [
            'ts-jest', {
                tsconfig: 'tsconfig.json',
                isolatedModules: true
            },
        ]
    },
    coverageReporters: ['lcov'],
    testEnvironment: "jsdom",
    testEnvironmentOptions: {
        url: 'http://localhost'
    },
    setupFilesAfterEnv: [
        "<rootDir>/src/testUtils/test.setup.tsx"
    ]
};