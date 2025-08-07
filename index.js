const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post("/send", async (req, res) => {
  const { username, phone, points } = req.body;

  if (!username || !phone || !points) {
    return res.status(400).send("Missing data");
  }

  const message = `
🟢 طلب سحب جديد 🟢

👤 الاسم: ${username}
📱 رقم الهاتف: ${phone}
💰 النقاط: ${points}
`;

  try {
    await axios.post(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`, {
      chat_id: process.env.CHAT_ID,
      text: message,
    });

    res.send("تم إرسال الطلب ✅");
  } catch (error) {
    console.error("فشل الإرسال:", error.response?.data || error.message);
    res.status(500).send("فشل إرسال الطلب ❌");
  }
});

app.get("/", (req, res) => {
  res.send("الخادم يعمل ✅");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
