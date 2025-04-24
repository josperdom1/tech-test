import '@testing-library/jest-dom';

// Mock window.matchMedia (critical for Ant Design)
global.matchMedia = global.matchMedia || function () {
  return {
    matches: false,
    addListener: jest.fn(),
    removeListener: jest.fn(),
  };
};