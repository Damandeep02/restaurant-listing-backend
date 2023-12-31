const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const Restaurant = require('./models/restaurant');
const User = require('./models/user');
const sequelize = require('./db'); 
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cors = require('cors');



cloudinary.config({
  cloud_name: 'ddfwnttt1',
  api_key: '944699772993581',
  api_secret: 'i5zNaAmsjz5YHeUYI4XgC6w9tE0',
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'restaurant-images',
  allowedFormats: ['jpg', 'png','jpeg'],
  transformation: [{ width: 300, height: 200, crop: 'limit' }],
});

const upload = multer({ storage: storage });

const app = express();
app.use(cors());


app.get('/restaurants', async (req, res) => {
  try {
    const restaurants = await Restaurant.findAll({
      include: User, 
    });
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/restaurants', upload.single('image'), async (req, res) => {
  const { name, address, contact, added_by } = req.body;
  let image = null;

  if (req.file) {
    const result = await cloudinary.uploader.upload(req.file.path);
    image = result.secure_url;
  }



  try {
    const restaurant = await Restaurant.create({
      name,
      address,
      contact,
      image,
      added_by,
    });
    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/restaurants/:id', async (req, res) => {
  const { id } = req.params;
  const { name, address, contact } = req.body;
  try {
    const restaurant = await Restaurant.findByPk(id);
    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }
    restaurant.name = name;
    restaurant.address = address;
    restaurant.contact = contact;
    await restaurant.save();
    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/restaurants/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const restaurant = await Restaurant.findByPk(id);
    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }
    await restaurant.destroy();
    res.json({ message: 'Restaurant deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});
app.use('/uploads', express.static('uploads'));

sequelize.sync().then(() => {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
