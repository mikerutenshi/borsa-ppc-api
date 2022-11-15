import { roleTestSuite } from './RoleRoutesTest.mjs';
import { rootTestSuite, userTestSuite } from './UserRoutesTest.mjs';

describe('Sequentially run auth test suites', () => {
  rootTestSuite();
  roleTestSuite(), userTestSuite();
});
