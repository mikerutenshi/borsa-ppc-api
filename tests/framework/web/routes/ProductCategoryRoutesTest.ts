import request from 'supertest';
import app from '../../../../src/app';
import { ProductCategory } from '../../../../src/model/Products';

export const productCategoryTestSuite = (dataset: ProductCategory[]) => {
  describe('Test product category routes', () => {
    const agent = request.agent(app);
    const route = '/v2/product-category';

    test('DELETE /v2/product-category => delete type', async () => {
      // Real last route was deleted in previous test
      const subParentId = dataset.length - 4;
      const lastId = dataset.length - 1;
      const unexistId = dataset.length + 1;

      const delSubParentResponse = await agent
        .delete(route)
        .query({ id: subParentId });
      expect(delSubParentResponse.status).toBe(403);
      expect(delSubParentResponse.body.message.toLowerCase()).toContain(
        'child'
      );

      const delLastRes = await agent.delete(route).query({ id: lastId });
      expect(delLastRes.status).toBe(200);
      expect(delLastRes.body.data).toBe(undefined);
      expect(delLastRes.body.message.toLowerCase()).toContain('deleted');

      const delUnexRes = await agent.delete(route).query({ id: unexistId });
      expect(delUnexRes.status).toEqual(404);
    });
  });
};
