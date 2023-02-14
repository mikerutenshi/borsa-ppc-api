import request from 'supertest';
import app from '../../../../src/app';
import ProjectDependencies from '../../../../src/di/ProjectDependencies';
import { ProductCategory } from '../../../../src/model/Products';
import { loggerJest } from '../../../../src/util/Logger';

export const productCategoryTestSuite = (dataset: ProductCategory[]) => {
  const { databaseService } = new ProjectDependencies();
  describe('Test product category routes', () => {
    const agent = request.agent(app);
    const route = '/v2/product-category';

    test('DELETE /v2/product-category => delete type', async () => {
      // Real last route was deleted in previous test
      const subParentRoute = `${route}/${dataset.length - 4}`;
      const lastRoute = `${route}/${dataset.length - 1}`;
      const unexistRoute = `${route}/${dataset.length + 1}`;
      const delSubParentResponse = await agent.delete(subParentRoute);
      expect(delSubParentResponse.status).toBe(403);
      expect(delSubParentResponse.body.message.toLowerCase()).toContain(
        'child'
      );

      const delLastRes = await agent.delete(lastRoute);
      loggerJest.debug('delLastRes', delLastRes.body);
      expect(delLastRes.status).toBe(200);
      expect(delLastRes.body.data).toBe(undefined);
      expect(delLastRes.body.message.toLowerCase()).toContain('deleted');

      const delUnexRes = await agent.delete(unexistRoute);
      expect(delUnexRes.status).toEqual(404);
    });
  });
};
