const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('../frontend'));

// In-memory data
const properties = [
  { id: 1, name: 'Sunset Villa', address: '123 Beach Rd' },
  { id: 2, name: 'City Apartment', address: '456 Main St' }
];

const tenants = [
  { id: 1, name: 'Alice', lease: '2023-2024' },
  { id: 2, name: 'Bob', lease: '2024-2025' }
];

const maintenance = [];

function randomData() {
  return {
    temperature: 20 + Math.random() * 10,
    occupancy: Math.floor(Math.random() * 100),
    energy: Math.floor(Math.random() * 500)
  };
}

app.get('/api/iot-data', (req, res) => {
  const data = Array.from({length: 10}, randomData);
  res.json(data);
});

app.post('/api/maintenance', (req, res) => {
  const reqBody = req.body;
  reqBody.id = maintenance.length + 1;
  maintenance.push(reqBody);
  res.status(201).json(reqBody);
});

app.get('/api/properties', (req, res) => {
  res.json(properties);
});

app.get('/api/tenants', (req, res) => {
  res.json(tenants);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
