import { rootTestSuite, userTestSuite } from './UserRoutesTest.mjs';

describe('Sequentially run auth test suites', () => {
  rootTestSuite();
  userTestSuite();
});
