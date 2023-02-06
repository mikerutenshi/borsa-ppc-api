import request from 'supertest';
import app from '../../../../src/app';
import ProjectDependencies from '../../../../src/di/ProjectDependencies';
import {
  genderType,
  subCategoryType,
  categoryType,
} from '../../../../src/model/mock/Types';
import { ProductCategoryType } from '../../../../src/model/Types';
import { loggerJest } from '../../../../src/util/Logger';

export const productCategoryTypeTestSuite = () => {
  beforeAll(async () => {
    const { databaseService } = new ProjectDependencies();
    await databaseService.dropRepository(
      databaseService.repositoryList.productCategoryTypeRepository
    );
  });

  describe('Test product category type CRUD routes', () => {
    const agent = request.agent(app);

    test('POST /v2/product-category-types => create new product category type', async () => {
      const genderResponse = await agent
        .post('/v2/product-category-types')
        .send(genderType);

      loggerJest.debug(genderResponse.body, 'Create gender response');
      expect(genderResponse.status).toBe(201);
      expect(genderResponse.body.data[0].name).toMatch(genderType.name);
      expect(genderResponse.headers['content-type']).toMatch(/json/);
      expect(genderResponse.body.message.toLowerCase()).toContain('created');

      const categoryResponse = await agent
        .post('/v2/product-category-types')
        .send(categoryType);

      expect(categoryResponse.status).toBe(201);
      expect(categoryResponse.body.data[0].name).toMatch(categoryType.name);
      expect(categoryResponse.headers['content-type']).toMatch(/json/);
      expect(categoryResponse.body.message.toLowerCase()).toContain('created');

      const subCategoryResponse = await agent
        .post('/v2/product-category-types')
        .send(subCategoryType);

      expect(subCategoryResponse.status).toBe(201);
      expect(subCategoryResponse.body.data[0].name).toMatch(
        subCategoryType.name
      );
      expect(subCategoryResponse.headers['content-type']).toMatch(/json/);
      expect(subCategoryResponse.body.message.toLowerCase()).toContain(
        'created'
      );
    });

    test('GET /v2/product-category-types => get all product category type', async () => {
      const allResponse = await agent.get('/v2/product-category-types');
      loggerJest.debug(allResponse.body, 'Get All Response');
      expect(allResponse.status).toBe(200);
      expect(allResponse.body.data.length).toBe(3);
      expect(allResponse.headers['content-type']).toMatch(/json/);
      expect(allResponse.body.message.toLowerCase()).toContain('loaded');
    });

    test('GET /v2/product-category-types/2 => get one product category type', async () => {
      const getCategoryResponse = await agent.get(
        '/v2/product-category-types/2'
      );
      expect(getCategoryResponse.status).toBe(200);
      expect(getCategoryResponse.body.data[0].id).toBe(2);
      expect(getCategoryResponse.body.data[0].name).toMatch(categoryType.name);
      expect(getCategoryResponse.body.message.toLowerCase()).toContain(
        'loaded'
      );
    });

    test('UPDATE /v2/product-category-types => update one product category type', async () => {
      const updateResponse = await agent
        .put('/v2/product-category-types/1')
        .send(new ProductCategoryType('test type', null));
      const findUpdatedResponse = await agent.get(
        '/v2/product-category-types/1'
      );

      expect(updateResponse.status).toBe(200);
      expect(updateResponse.body.data[0].name).toMatch('test type');
      expect(updateResponse.headers['content-type']).toMatch(/json/);
      expect(updateResponse.body.message).toContain('updated');
      expect(findUpdatedResponse.body.data[0].name).toMatch('test type');
    });

    test('DELETE /v2/types => delete type', async () => {
      const deleteCategoryResponse = await agent.delete(
        '/v2/product-category-types/2'
      );
      expect(deleteCategoryResponse.status).toBe(403);
      expect(deleteCategoryResponse.body.message.toLowerCase()).toContain(
        'child'
      );

      const deleteChild = await agent.delete('/v2/product-category-types/3');
      expect(deleteChild.status).toBe(200);
      const deleteCategoryAgainResponse = await agent.delete(
        '/v2/product-category-types/2'
      );
      expect(deleteCategoryAgainResponse.status).toBe(200);
      expect(deleteCategoryAgainResponse.body.data).toBe(undefined);
      expect(deleteCategoryAgainResponse.body.message.toLowerCase()).toContain(
        'deleted'
      );

      const deleteUnexistingResponse = await agent.delete(
        '/v2/product-category-types/5'
      );
      expect(deleteUnexistingResponse.status).toEqual(404);
    });
  });
};
