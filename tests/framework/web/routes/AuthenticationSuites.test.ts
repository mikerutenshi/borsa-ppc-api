import { roleTestSuite } from './RoleRoutesTest';
import { rootTestSuite, userTestSuite } from './UserRoutesTest';

describe('Sequentially run auth test suites', () => {
  rootTestSuite();
  roleTestSuite(), userTestSuite();
});
