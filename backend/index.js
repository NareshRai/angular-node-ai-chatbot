import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const TOGETHER_API_KEY = process.env.TOGETHER_API_KEY;  

app.post('/chat', async (req, res) => {
    const { prompt } = req.body;
  
    try {
      const response = await fetch("https://api.together.xyz/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${TOGETHER_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "mistralai/Mixtral-8x7B-Instruct-v0.1", // or try meta-llama/Llama-3-8b
          messages: [{ role: "user", content: prompt }],
          temperature: 0.7,
          max_tokens: 256
        })
      });
  
      const data = await response.json();
      const reply = data.choices?.[0]?.message?.content || "No response from Together.ai";
      res.json({ message: reply });
  
    } catch (error) {
      console.error("Together AI Error:", error);
      res.status(500).json({ error: "Together AI error" });
    }
  });
  
  app.listen(3000, () => {
    console.log('🧠 Together.ai Chatbot server running at http://localhost:3000');
  });


  


import axios from 'axios';

const options = {
  method: 'get',
  url: 'https://apps-uat.phonepe.com/v3/transaction/{M23CY5AEQLDMW}/{T2507170920470104872283}/status',
  headers: {
        accept: 'text/plain',
        },

};
axios
  .request(options)
      .then(function (response) {
      console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });