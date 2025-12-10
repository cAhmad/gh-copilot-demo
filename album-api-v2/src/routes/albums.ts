import { Router, Request, Response } from 'express';
import { Album, albums } from '../models/album';

const router = Router();

// In-memory storage (starts with sample data)
let albumCollection: Album[] = [...albums];

// GET /albums - Get all albums
router.get('/', (req: Request, res: Response) => {
  res.json(albumCollection);
});

// GET /albums/:id - Get album by ID
router.get('/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const album = albumCollection.find(a => a.id === id);
  
  if (!album) {
    return res.status(404).json({ message: 'Album not found' });
  }
  
  res.json(album);
});

// POST /albums - Add new album
router.post('/', (req: Request, res: Response) => {
  const { title, artist, price, image_url } = req.body;
  
  // Basic validation
  if (!title || !artist || price === undefined || !image_url) {
    return res.status(400).json({ message: 'Missing required fields: title, artist, price, image_url' });
  }
  
  // Generate new ID
  const maxId = albumCollection.length > 0 
    ? Math.max(...albumCollection.map(a => a.id)) 
    : 0;
  
  const newAlbum: Album = {
    id: maxId + 1,
    title,
    artist,
    price: parseFloat(price),
    image_url
  };
  
  albumCollection.push(newAlbum);
  res.status(201).json(newAlbum);
});

// PUT /albums/:id - Update album
router.put('/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const albumIndex = albumCollection.findIndex(a => a.id === id);
  
  if (albumIndex === -1) {
    return res.status(404).json({ message: 'Album not found' });
  }
  
  const { title, artist, price, image_url } = req.body;
  
  // Update only provided fields
  if (title !== undefined) albumCollection[albumIndex].title = title;
  if (artist !== undefined) albumCollection[albumIndex].artist = artist;
  if (price !== undefined) albumCollection[albumIndex].price = parseFloat(price);
  if (image_url !== undefined) albumCollection[albumIndex].image_url = image_url;
  
  res.json(albumCollection[albumIndex]);
});

// DELETE /albums/:id - Delete album
router.delete('/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const albumIndex = albumCollection.findIndex(a => a.id === id);
  
  if (albumIndex === -1) {
    return res.status(404).json({ message: 'Album not found' });
  }
  
  const deletedAlbum = albumCollection.splice(albumIndex, 1)[0];
  res.json(deletedAlbum);
});

export default router;
