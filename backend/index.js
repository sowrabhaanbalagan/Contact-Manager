// backend/index.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const mongoURI = 'mongodb://localhost:27017/contactForm';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
});

const Contact = mongoose.model('Contact', contactSchema);

app.post('/contact', async (req, res) => {
  const { name, email, phone } = req.body;

  const newContact = new Contact({ name, email, phone });

  try {
    await newContact.save();
    res.status(201).send('Contact form submitted successfully!');
  } catch (error) {
    console.error('Error saving contact form data:', error);
    res.status(500).send('Error submitting contact form');
  }
});
app.get('/contacts', async (req, res) => {
    try {
      const contacts = await Contact.find();
      res.status(200).json(contacts);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      res.status(500).send('Error fetching contacts');
    }
  })

  app.delete('/contact/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedContact = await Contact.findByIdAndDelete(id);
      if (!deletedContact) {
        return res.status(404).send('Contact not found');
      }
      res.status(200).send('Contact deleted successfully');
    } catch (error) {
      console.error('Error deleting contact:', error);
      res.status(500).send('Error deleting contact');
    }
  })

  app.put('/contact/:id', async (req, res) => {
    try {
      const contact = await Contact.findById(req.params.id);
      if (!contact) {
        return res.status(404).json({ message: 'Contact not found' });
      }
  
      contact.name = req.body.name;
      contact.email = req.body.email;
      contact.phone = req.body.phone;
  
      const updatedContact = await contact.save();
      res.json(updatedContact);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  })

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
