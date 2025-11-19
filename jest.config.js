module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    transform: {
        '^.+\\.ts?$': 'ts-jest',
        '^.+\\.tsx?$': 'ts-jest',
        '^.+\\.js?$': 'babel-jest',
        '^.+\\.jsx?$': 'babel-jest',
    },
};