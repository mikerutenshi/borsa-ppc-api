import request from 'supertest';
import app from '../../../../src/app';
import {
  assemblerType,
  blackType,
  brownType,
  drawerType,
  insoleType,
  invalidType,
  jobStatusAssigned,
  jobStatusCompleted,
  leatherType,
  outsoleType,
  sewerType,
  whiteType,
  _36Type,
  _36_5Type,
  _37Type,
} from '../../../../src/model/mock/Types';

export const typeTestSuite = () => {
  //beforeAll(async () => {
  //  const { databaseService } = new ProjectDependencies();
  //  await databaseService.dropRepository(Repositories.typeRepository);
  //});

  describe('Type routes tests', () => {
    const agent = request.agent(app);

    test('POST /v2/material-types => create a new material type', async () => {
      const leatherRes = await agent
        .post('/v2/material-types')
        .send(leatherType);
      const insoleRes = await agent.post('/v2/material-types').send(insoleType);
      expect(leatherRes.status).toBe(201);
      expect(leatherRes.body.data[0].name).toMatch(leatherType.name);
      expect(leatherRes.headers['content-type']).toMatch(/json/);
      expect(leatherRes.body.message).toContain('created');

      expect(insoleRes.status).toBe(201);
      expect(insoleRes.body.data[0].name).toMatch(insoleType.name);
      expect(insoleRes.headers['content-type']).toMatch(/json/);
      expect(insoleRes.body.message).toContain('created');
    });

    test('POST /v2/job-statuses => create a new job status', async () => {
      const response = await agent
        .post('/v2/job-statuses')
        .send(jobStatusAssigned);
      expect(response.status).toBe(201);
      expect(response.body.data[0].name).toMatch(jobStatusAssigned.name);
      expect(response.headers['content-type']).toMatch(/json/);
      expect(response.body.message).toContain('created');
    });

    test('POST /v2/job-types => create a new job type', async () => {
      const sewerRes = await agent.post('/v2/job-types').send(sewerType);
      const assemblerRes = await agent
        .post('/v2/job-types')
        .send(assemblerType);
      expect(sewerRes.status).toBe(201);
      expect(sewerRes.body.data[0].name).toMatch(sewerType.name);
      expect(sewerRes.headers['content-type']).toMatch(/json/);
      expect(sewerRes.body.message).toContain('created');

      expect(assemblerRes.status).toBe(201);
      expect(assemblerRes.body.data[0].name).toMatch(assemblerType.name);
      expect(assemblerRes.headers['content-type']).toMatch(/json/);
      expect(assemblerRes.body.message).toContain('created');
    });

    test('POST /v2/sizes => create a new size', async () => {
      const _36_5Res = await agent.post('/v2/sizes').send(_36_5Type);
      const _37Res = await agent.post('/v2/sizes').send(_37Type);
      expect(_36_5Res.status).toBe(201);
      expect(_36_5Res.body.data[0].name).toMatch(_36_5Type.name);
      expect(_36_5Res.headers['content-type']).toMatch(/json/);
      expect(_36_5Res.body.message).toContain('created');

      expect(_37Res.status).toBe(201);
      expect(_37Res.body.data[0].name).toMatch(_37Type.name);
      expect(_37Res.headers['content-type']).toMatch(/json/);
      expect(_37Res.body.message).toContain('created');
    });

    test('POST /v2/colors => create a new color', async () => {
      const whiteRes = await agent.post('/v2/colors').send(whiteType);
      const brownRes = await agent.post('/v2/colors').send(brownType);
      expect(whiteRes.status).toBe(201);
      expect(whiteRes.body.data[0].name).toMatch(whiteType.name);
      expect(whiteRes.headers['content-type']).toMatch(/json/);
      expect(whiteRes.body.message).toContain('created');

      expect(brownRes.status).toBe(201);
      expect(brownRes.body.data[0].name).toMatch(brownType.name);
      expect(brownRes.headers['content-type']).toMatch(/json/);
      expect(brownRes.body.message).toContain('created');
    });

    test('POST /v2/types => negative cases', async () => {
      const insoleRes = await agent.post('/v2/material-types').send(insoleType);
      const sewerRes = await agent.post('/v2/job-types').send(sewerType);
      const _36_5Res = await agent.post('/v2/sizes').send(_36_5Type);
      const whiteRes = await agent.post('/v2/colors').send(whiteType);
      expect(insoleRes.status).toEqual(409);
      expect(sewerRes.status).toEqual(409);
      expect(_36_5Res.status).toEqual(409);
      expect(whiteRes.status).toEqual(409);
      expect(insoleRes.body.message).toContain('exist');
      expect(sewerRes.body.message).toContain('exist');
      expect(_36_5Res.body.message).toContain('exist');
      expect(whiteRes.body.message).toContain('exist');

      const sewerInvalidRes = await agent
        .post('/v2/job-types')
        .send(invalidType);
      const _36_5InvalidRes = await agent.post('/v2/sizes').send(invalidType);
      const whiteInvalidRes = await agent.post('/v2/colors').send(invalidType);
      const materialInvalidRes = await agent
        .post('/v2/material-types')
        .send(invalidType);

      expect(sewerInvalidRes.status).toEqual(400);
      expect(_36_5InvalidRes.status).toEqual(400);
      expect(whiteInvalidRes.status).toEqual(400);
      expect(materialInvalidRes.status).toEqual(400);
    });

    test('GET /v2/types => get all types', async () => {
      const materialsRes = await agent.get('/v2/material-types');
      const jobsRes = await agent.get('/v2/job-types');
      const sizesRes = await agent.get('/v2/sizes');
      const colorsRes = await agent.get('/v2/colors');
      const jobStatusRes = await agent.get('/v2/job-statuses');
      expect(materialsRes.status).toBe(200);
      expect(materialsRes.body.data.length).toBe(2);
      expect(materialsRes.headers['content-type']).toMatch(/json/);
      expect(materialsRes.body.message).toContain('load');

      expect(jobsRes.status).toBe(200);
      expect(jobsRes.body.data.length).toBe(2);
      expect(jobsRes.headers['content-type']).toMatch(/json/);
      expect(jobsRes.body.message).toContain('load');

      expect(jobStatusRes.status).toBe(200);
      expect(jobStatusRes.body.data.length).toBe(1);
      expect(jobStatusRes.headers['content-type']).toMatch(/json/);
      expect(jobStatusRes.body.message).toContain('load');

      expect(sizesRes.status).toBe(200);
      expect(sizesRes.body.data.length).toBe(2);
      expect(sizesRes.headers['content-type']).toMatch(/json/);
      expect(sizesRes.body.message).toContain('load');

      expect(colorsRes.status).toBe(200);
      expect(colorsRes.body.data.length).toBe(2);
      expect(colorsRes.headers['content-type']).toMatch(/json/);
      expect(colorsRes.body.message).toContain('load');
    });

    test('GET /v2/types => get filtered types', async () => {
      const insoleRes = await agent.get('/v2/material-types').query({
        search_key: insoleType.name,
      });
      expect(insoleRes.status).toBe(200);
      expect(insoleRes.body.data[0].name).toMatch(insoleType.name);
      expect(insoleRes.headers['content-type']).toMatch(/json/);
      expect(insoleRes.body.message).toContain('load');

      const sewerRes = await agent.get('/v2/job-types').query({
        search_key: sewerType.name,
      });
      expect(sewerRes.status).toBe(200);
      expect(sewerRes.body.data[0].name).toMatch(sewerType.name);
      expect(sewerRes.headers['content-type']).toMatch(/json/);
      expect(sewerRes.body.message).toContain('load');

      const sizeRes = await agent.get('/v2/sizes').query({
        search_key: _37Type.name,
      });
      expect(sizeRes.status).toBe(200);
      expect(sizeRes.body.data[0].name).toMatch(_37Type.name);
      expect(sizeRes.headers['content-type']).toMatch(/json/);
      expect(sizeRes.body.message).toContain('load');

      const colorRes = await agent.get('/v2/colors').query({
        search_key: whiteType.name,
      });
      expect(colorRes.status).toBe(200);
      expect(colorRes.body.data[0].name).toMatch(whiteType.name);
      expect(colorRes.headers['content-type']).toMatch(/json/);
      expect(colorRes.body.message).toContain('load');
    });

    test('GET /v2/types => get one type by id', async () => {
      const insoleRes = await agent.get('/v2/material-types/2');
      expect(insoleRes.status).toBe(200);
      expect(insoleRes.body.data[0].name).toMatch(insoleType.name);
      expect(insoleRes.headers['content-type']).toMatch(/json/);
      expect(insoleRes.body.message).toContain('load');

      const assemblerRes = await agent.get('/v2/job-types/2');
      expect(assemblerRes.status).toBe(200);
      expect(assemblerRes.body.data[0].name).toMatch(assemblerType.name);
      expect(assemblerRes.headers['content-type']).toMatch(/json/);
      expect(assemblerRes.body.message).toContain('load');

      const brownRes = await agent.get('/v2/colors/2');
      expect(brownRes.status).toBe(200);
      expect(brownRes.body.data[0].name).toMatch(brownType.name);
      expect(brownRes.headers['content-type']).toMatch(/json/);
      expect(brownRes.body.message).toContain('load');

      const _37Res = await agent.get('/v2/sizes/2');
      expect(_37Res.status).toBe(200);
      expect(_37Res.body.data[0].name).toMatch(_37Type.name);
      expect(_37Res.headers['content-type']).toMatch(/json/);
      expect(_37Res.body.message).toContain('load');
    });

    test('UPDATE /v2/types => update type', async () => {
      const outsoleRes = await agent
        .put('/v2/material-types/2')
        .send(outsoleType);
      const findOutsoleRes = await agent.get('/v2/material-types/2');
      expect(outsoleRes.status).toBe(200);
      expect(outsoleRes.body.data[0].name).toMatch(outsoleType.name);
      expect(outsoleRes.headers['content-type']).toMatch(/json/);
      expect(outsoleRes.body.message).toContain('update');
      expect(findOutsoleRes.body.data[0].name).toMatch(outsoleType.name);

      const drawerRes = await agent.put('/v2/job-types/2').send(drawerType);
      const findDrawerRes = await agent.get('/v2/job-types/2');
      expect(drawerRes.status).toBe(200);
      expect(drawerRes.body.data[0].name).toMatch(drawerType.name);
      expect(drawerRes.headers['content-type']).toMatch(/json/);
      expect(drawerRes.body.message).toContain('update');
      expect(findDrawerRes.body.data[0].name).toMatch(drawerType.name);

      const jobCompletedRes = await agent
        .put('/v2/job-statuses/1')
        .send(jobStatusCompleted);
      const findJobCompletedRes = await agent.get('/v2/job-statuses/1');
      expect(jobCompletedRes.status).toBe(200);
      expect(jobCompletedRes.body.data[0].name).toMatch(
        jobStatusCompleted.name
      );
      expect(jobCompletedRes.headers['content-type']).toMatch(/json/);
      expect(jobCompletedRes.body.message).toContain('update');
      expect(findJobCompletedRes.body.data[0].name).toMatch(
        jobStatusCompleted.name
      );

      const blackRes = await agent.put('/v2/colors/2').send(blackType);
      const findBlackRes = await agent.get('/v2/colors/2');
      expect(blackRes.status).toBe(200);
      expect(blackRes.body.data[0].name).toMatch(blackType.name);
      expect(blackRes.headers['content-type']).toMatch(/json/);
      expect(blackRes.body.message).toContain('update');
      expect(findBlackRes.body.data[0].name).toMatch(blackType.name);

      const _36Res = await agent.put('/v2/sizes/2').send(_36Type);
      const find_36Res = await agent.get('/v2/sizes/2');
      expect(_36Res.status).toBe(200);
      expect(_36Res.body.data[0].name).toMatch(_36Type.name);
      expect(_36Res.headers['content-type']).toMatch(/json/);
      expect(_36Res.body.message).toContain('update');
      expect(find_36Res.body.data[0].name).toMatch(_36Type.name);
    });

    test('DELETE /v2/types => delete type', async () => {
      const delLeatherRes = await agent
        .delete('/v2/material-types')
        .query({ id: 1 });
      const noLeatherRes = await agent
        .delete('/v2/material-types')
        .query({ id: 1 });
      expect(delLeatherRes.status).toBe(200);
      expect(delLeatherRes.body.data).toBe(undefined);
      expect(delLeatherRes.headers['content-type']).toMatch(/json/);
      expect(delLeatherRes.body.message).toContain('delete');
      expect(noLeatherRes.status).toEqual(404);

      const delSewerRes = await agent.delete('/v2/job-types').query({ id: 1 });
      const noSewerRes = await agent.delete('/v2/job-types').query({ id: 1 });
      expect(delSewerRes.status).toBe(200);
      expect(delSewerRes.body.data).toBe(undefined);
      expect(delSewerRes.headers['content-type']).toMatch(/json/);
      expect(delSewerRes.body.message).toContain('delete');
      expect(noSewerRes.status).toEqual(404);

      const delJobStatusRes = await agent
        .delete('/v2/job-statuses')
        .query({ id: 1 });
      const notFoundRes = await agent
        .delete('/v2/job-statuses')
        .query({ id: 1 });
      expect(delJobStatusRes.status).toBe(200);
      expect(delJobStatusRes.body.data).toBe(undefined);
      expect(delJobStatusRes.headers['content-type']).toMatch(/json/);
      expect(delJobStatusRes.body.message).toContain('delete');
      expect(notFoundRes.status).toEqual(404);

      const delWhiteRes = await agent.delete('/v2/colors').query({ id: 1 });
      const noWhiteRes = await agent.delete('/v2/colors').query({ id: 1 });
      expect(delWhiteRes.status).toBe(200);
      expect(delWhiteRes.body.data).toBe(undefined);
      expect(delWhiteRes.headers['content-type']).toMatch(/json/);
      expect(delWhiteRes.body.message).toContain('delete');
      expect(noWhiteRes.status).toEqual(404);

      const del36_5Res = await agent.delete('/v2/sizes').query({ id: 1 });
      const no36_5Res = await agent.delete('/v2/sizes').query({ id: 1 });
      expect(del36_5Res.status).toBe(200);
      expect(del36_5Res.body.data).toBe(undefined);
      expect(del36_5Res.headers['content-type']).toMatch(/json/);
      expect(del36_5Res.body.message).toContain('delete');
      expect(no36_5Res.status).toEqual(404);
    });
  });
};
