import request from 'supertest';
import app from '../server';

describe('Album API v2', () => {
  describe('GET /', () => {
    it('should return welcome message', async () => {
      const response = await request(app).get('/');
      expect(response.status).toBe(200);
      expect(response.text).toBe('Hit the /albums endpoint to retrieve a list of albums!');
    });
  });

  describe('GET /albums', () => {
    it('should return all albums', async () => {
      const response = await request(app).get('/albums');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body[0]).toHaveProperty('id');
      expect(response.body[0]).toHaveProperty('title');
      expect(response.body[0]).toHaveProperty('artist');
      expect(response.body[0]).toHaveProperty('price');
      expect(response.body[0]).toHaveProperty('image_url');
    });

    it('should return albums with correct sample data', async () => {
      const response = await request(app).get('/albums');
      const firstAlbum = response.body.find((a: any) => a.id === 1);
      expect(firstAlbum).toBeDefined();
      expect(firstAlbum.title).toBe('You, Me and an App Id');
      expect(firstAlbum.artist).toBe('Daprize');
      expect(firstAlbum.price).toBe(10.99);
    });
  });

  describe('GET /albums/:id', () => {
    it('should return album by id', async () => {
      const response = await request(app).get('/albums/1');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', 1);
      expect(response.body).toHaveProperty('title');
    });

    it('should return 404 for non-existent album', async () => {
      const response = await request(app).get('/albums/999');
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('message', 'Album not found');
    });
  });

  describe('POST /albums', () => {
    it('should create a new album', async () => {
      const newAlbum = {
        title: 'Test Album',
        artist: 'Test Artist',
        price: 9.99,
        image_url: 'https://example.com/test.jpg'
      };

      const response = await request(app)
        .post('/albums')
        .send(newAlbum);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.title).toBe(newAlbum.title);
      expect(response.body.artist).toBe(newAlbum.artist);
      expect(response.body.price).toBe(newAlbum.price);
      expect(response.body.image_url).toBe(newAlbum.image_url);
    });

    it('should return 400 for missing required fields', async () => {
      const incompleteAlbum = {
        title: 'Test Album'
        // Missing artist, price, image_url
      };

      const response = await request(app)
        .post('/albums')
        .send(incompleteAlbum);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message');
    });
  });

  describe('PUT /albums/:id', () => {
    it('should update an existing album', async () => {
      const updates = {
        title: 'Updated Title',
        price: 15.99
      };

      const response = await request(app)
        .put('/albums/1')
        .send(updates);

      expect(response.status).toBe(200);
      expect(response.body.title).toBe(updates.title);
      expect(response.body.price).toBe(updates.price);
      expect(response.body.id).toBe(1);
    });

    it('should return 404 for non-existent album', async () => {
      const response = await request(app)
        .put('/albums/999')
        .send({ title: 'Updated' });

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('message', 'Album not found');
    });

    it('should partially update album fields', async () => {
      const response = await request(app)
        .put('/albums/2')
        .send({ artist: 'New Artist' });

      expect(response.status).toBe(200);
      expect(response.body.artist).toBe('New Artist');
      expect(response.body).toHaveProperty('title'); // Other fields preserved
    });
  });

  describe('DELETE /albums/:id', () => {
    it('should delete an album', async () => {
      // First, create a new album to delete
      const newAlbum = await request(app)
        .post('/albums')
        .send({
          title: 'To Delete',
          artist: 'Delete Artist',
          price: 5.99,
          image_url: 'https://example.com/delete.jpg'
        });

      const albumId = newAlbum.body.id;

      const deleteResponse = await request(app).delete(`/albums/${albumId}`);
      expect(deleteResponse.status).toBe(200);
      expect(deleteResponse.body.id).toBe(albumId);

      // Verify it's deleted
      const getResponse = await request(app).get(`/albums/${albumId}`);
      expect(getResponse.status).toBe(404);
    });

    it('should return 404 for non-existent album', async () => {
      const response = await request(app).delete('/albums/999');
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('message', 'Album not found');
    });
  });
});
