// server.js or app.js (Node.js/Express)
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: 'https://swiggy-clone-live-api-project.netlify.app',
  credentials: true
}));

app.get('/api/swiggy', async (req, res) => {
  try {
    const swiggyURL = 'https://www.swiggy.com/dapi/restaurants/list/v5?lat=25.59430&lng=85.13520&is-seo-homepage-enabled=true';

    const swiggyResponse = await axios.get(swiggyURL, {
      headers: {
        'User-Agent': 'Mozilla/5.0', // required by Swiggy
        'Accept': 'application/json'
      }
    });

    res.json(swiggyResponse.data);
  } catch (error) {
    console.error('Swiggy fetch error:', error.message);
    res.status(500).json({ error: 'Unable to fetch Swiggy data' });
  }
});

app.listen(PORT, () => console.log(`Proxy server running`));
