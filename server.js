const { StreamChat } = require('stream-chat');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const apiKeys = process.env.API_KEY
const apiSecrets = process.env.API_SECRET
const apiKey = apiKeys;
const apiSecret = apiSecrets

const chatClient = new StreamChat(apiKey, apiSecret);

app.use(cors());

app.get('/token/:userId', async (req, res) => {
  const { userId } = req.params;
  
try {
    await chatClient.updateUser({
      id: userId,
      role: 'admin', // Change the role to 'admin' or another role with the required permissions
    });
  } catch (error) {
    console.error('Error updating user:', error);
  }

  const token = chatClient.createToken(userId);
  res.json({ token });
});

app.listen(3001, () => {
  console.log('Backend server running on port 3001');
});







