const dotenv = require("dotenv");
dotenv.config();

const config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  testMatch: ["<rootDir>/src/**/*.test.{ts,tsx}"],
  globals: {
    __SERVER_PORT__: process.env.SERVER_PORT,
  },
};

module.exports = config;
