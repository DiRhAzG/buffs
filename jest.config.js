/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',
    forceExit: true,
    roots: ['<rootDir>/src'],
    testMatch: ['**/__tests__/**/*.test.ts'],
    moduleNameMapper: {
        '^@alt1/base(.*)$': '<rootDir>/src/__mocks__/@alt1/base.ts',
        '.*image-reader\\.js$': '<rootDir>/src/__mocks__/image-reader.ts',
        '.*chatbox\\.js$': '<rootDir>/src/__mocks__/chatbox.ts',
        '.*bar\\.js$': '<rootDir>/src/__mocks__/bar.ts',
        '.*nexus\\.js$': '<rootDir>/src/__mocks__/nexus.ts',
        '.*jquery\\.js$': '<rootDir>/src/__mocks__/jquery.ts',
    },
    transform: {
        '^.+\\.[tj]sx?$': ['ts-jest', {
            tsconfig: {
                allowJs: true,
                esModuleInterop: true,
                moduleResolution: 'node',
            },
        }],
    },
};
