import request from 'supertest';
import app from '../../../../src/app';
import ProjectDependencies from '../../../../src/di/ProjectDependencies';
import { Repositories } from '../../../../src/model/Enums';
import {
  genderType,
  subCategoryType,
  categoryType,
  extraCategoryType,
  subExtraCategoryType,
} from '../../../../src/model/mock/Types';
import { ProductCategoryType } from '../../../../src/model/Types';
import { loggerJest } from '../../../../src/util/Logger';

export const productCategoryTypeTestSuite = () => {
  beforeAll(async () => {
    const { databaseService } = new ProjectDependencies();
    await databaseService.dropRepository(
      Repositories.productCategoryTypeRepository
    );
  });

  const dataset = [
    genderType,
    categoryType,
    subCategoryType,
    extraCategoryType,
    subExtraCategoryType,
  ];

  describe('Test product category type CRUD routes', () => {
    const agent = request.agent(app);

    it.each(dataset)(
      'POST /v2/product-category-types => create new $name',
      async (data) => {
        const response = await agent
          .post('/v2/product-category-types')
          .send(data);

        expect(response.status).toBe(201);
        expect(response.body.data[0].name).toMatch(data.name);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body.message.toLowerCase()).toContain('created');
      }
    );

    test('GET /v2/product-category-types => get all product category type', async () => {
      const allResponse = await agent.get('/v2/product-category-types');
      expect(allResponse.status).toBe(200);
      expect(allResponse.body.data.length).toBe(5);
      expect(allResponse.headers['content-type']).toMatch(/json/);
      expect(allResponse.body.message.toLowerCase()).toContain('loaded');
    });

    test('GET /v2/product-category-types/2 => get one product category type', async () => {
      const getCategoryResponse = await agent.get(
        '/v2/product-category-types/2'
      );
      expect(getCategoryResponse.status).toBe(200);
      expect(getCategoryResponse.body.data[0].id).toBe(categoryType.id);
      expect(getCategoryResponse.body.data[0].name).toMatch(categoryType.name);
      expect(getCategoryResponse.body.message.toLowerCase()).toContain(
        'loaded'
      );
    });

    test('UPDATE /v2/product-category-types => update one product category type', async () => {
      const updateResponse = await agent
        .put('/v2/product-category-types/4')
        .send(new ProductCategoryType('test type', null));
      const findUpdatedResponse = await agent.get(
        '/v2/product-category-types/4'
      );

      expect(updateResponse.status).toBe(200);
      expect(updateResponse.body.data[0].name).toMatch('test type');
      expect(updateResponse.headers['content-type']).toMatch(/json/);
      expect(updateResponse.body.message).toContain('updated');
      expect(findUpdatedResponse.body.data[0].name).toMatch('test type');
    });

    test('DELETE /v2/types => delete type', async () => {
      const deleteCategoryResponse = await agent.delete(
        '/v2/product-category-types/4'
      );
      expect(deleteCategoryResponse.status).toBe(403);
      expect(deleteCategoryResponse.body.message.toLowerCase()).toContain(
        'child'
      );

      const deleteChild = await agent.delete('/v2/product-category-types/5');
      expect(deleteChild.status).toBe(200);
      const deleteCategoryAgainResponse = await agent.delete(
        '/v2/product-category-types/4'
      );
      expect(deleteCategoryAgainResponse.status).toBe(200);
      expect(deleteCategoryAgainResponse.body.data).toBe(undefined);
      expect(deleteCategoryAgainResponse.body.message.toLowerCase()).toContain(
        'deleted'
      );

      const deleteUnexistingResponse = await agent.delete(
        '/v2/product-category-types/6'
      );
      expect(deleteUnexistingResponse.status).toEqual(404);
    });
  });
};
