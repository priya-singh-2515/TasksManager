const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb+srv://Tarunchauhan:Tarun123@cluster0.aub5cv6.mongodb.net/TasksManager', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

// User Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  mobile: String,
});

const User = mongoose.model('User', userSchema);

// Routes
app.post('/users', async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.send(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/users', async (req, res) => {
  const users = await User.find({});
  try {
    res.send(users);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/users/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  try {
    res.send(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.put('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.send(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
