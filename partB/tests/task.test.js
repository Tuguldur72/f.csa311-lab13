const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app'); 
const Task = require('../src/models/Task');

let createdTaskId;

describe('Task API Tests', () => {
  
  // 1. Ажил амжилттай үүсгэх
  it('1. Ажил амжилттай үүсгэх (201)', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({ title: 'Хөгжилтэй ажил', priority: 'High' });
    expect(res.statusCode).toEqual(201);
    expect(res.body.data).toHaveProperty('title', 'Хөгжилтэй ажил');
    createdTaskId = res.body.data._id; // Дараагийн тестүүдэд ID-г нь ашиглахын тулд хадгалав
  });

  // 2. Гарчиггүй үүсгэх алдаа
  it('2. Гарчиггүй ажил үүсгэхэд алдаа заах (400)', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({ priority: 'Low' });
    expect(res.statusCode).toEqual(400);
  });

  // 3. Бүх ажлыг жагсаалтаар авах
  it('3. Бүх ажлыг жагсаалтаар авах (200)', async () => {
    const res = await request(app).get('/api/tasks');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body.data)).toBeTruthy();
  });

  // 4. Нэг ажил ID-аар нь харах
  it('4. Зөвхөн ганц ажлыг ID-аар нь харах (200)', async () => {
    const res = await request(app).get(`/api/tasks/${createdTaskId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.data._id).toEqual(createdTaskId);
  });

  // 5. Байхгүй ID-аар хайхад 404 заах
  it('5. Байхгүй ID-аар хайхад 404 алдаа заах', async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request(app).get(`/api/tasks/${fakeId}`);
    expect(res.statusCode).toEqual(404);
  });

  // 6. Ажлын мэдээллийг засах
  it('6. Ажлын мэдээллийг засах (Update 200)', async () => {
    const res = await request(app)
      .put(`/api/tasks/${createdTaskId}`)
      .send({ description: 'Цагийн хязгаар тавих' });
    expect(res.statusCode).toEqual(200);
    expect(res.body.data.description).toContain('хязгаар');
  });

  // 7. Төлөвийг "Completed" болгох
  it('7. Төлөвийг "Completed" болгож өөрчлөх', async () => {
    const res = await request(app)
      .put(`/api/tasks/${createdTaskId}`)
      .send({ status: 'Completed' });
    expect(res.statusCode).toEqual(200);
    expect(res.body.data.status).toEqual('Completed');
  });

  // 8. Priority-г буруу утгаар өгөх
  it('8. Priority-г буруу утгаар өгөхөд алдаа заах', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({ title: 'Алдаатай ажил', priority: 'Urgent' });
    expect(res.statusCode).toEqual(400);
  });

  // 9. Ажлыг устгах
  it('9. Ажлыг устгах (Delete 200)', async () => {
    const res = await request(app).delete(`/api/tasks/${createdTaskId}`);
    expect(res.statusCode).toEqual(200);
  });

  // 10. Устгагдсан ажлыг дахин хайхад 404
  it('10. Устгагдсан ажлыг дахин хайхад 404 заах', async () => {
    const res = await request(app).get(`/api/tasks/${createdTaskId}`);
    expect(res.statusCode).toEqual(404);
  });
});

// Тест дууссаны дараа DB холболтыг салгах
afterAll(async () => {
  await mongoose.connection.close();
});