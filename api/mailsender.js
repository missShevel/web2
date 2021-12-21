import { createTransport } from 'nodemailer';
import sanitizeHTML from 'sanitize-html';
require('dotenv').config();

const from = `Form - ${process.env.EMAIL_ADDRESS}`;
const history = new Map();

function getTransporter() {
  return createTransport({
    host: process.env.HOST,
    port: process.env.EMIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
}

async function sendMail(options) {
  try {
    const transport = getTransporter();
    await transport.sendMail(options);
    return { success: true };
  } catch (error) {
    throw new Error(error.message);
  }
}

async function formSubmit(formData) {
  const textMessage = `You have new form submission. <br> 
    Name: 
    ${formData.name}
    <br> 
    Email:  
    ${formData.email}
    </br> 
    Message:  
    ${formData.message}`;
  return sendMail({
    from,
    to: process.env.EMAIL_TO_USER,
    subject: 'New form submission',
    html: sanitizeHTML(textMessage),
  });
}

const rateLimit = (ip, limit) => {
  if (!history.has(ip)) {
    history.set(ip, 1);
  }
  if (history.get(ip) > limit) {
    throw new Error();
  }
  history.set(ip, history.get(ip) + 1);
};

const emailCheckRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const nameCheckRegex = /^[a-zA-ZА-ЯЁа-яё]{2,}\s?[a-zA-ZА-ЯЁа-яё]*$/;

function validate(formdata) {
  const email = formdata.email;
  const name = formdata.name;
  if (!emailCheckRegex.test(String(email).toLowerCase())) {
    throw new Error();
  }

  if (!nameCheckRegex.test(String(name))) {
    throw new Error();
  }
}

module.exports = async (req, res) => {
  console.log(req.body);
  try {
    rateLimit(req.headers['x-real-ip'], 3);
  } catch (e) {
    return res.status(429).json({
      errors: ['Limitation error'],
      result: {
        success: false,
      },
    });
  }
  try {
    validate(req.body);
  } catch (e) {
    return res.status(402).json({
      errors: ['Validation error'],
      result: {
        success: false,
      },
    });
  }
  const result = await formSubmit(req.body);
  return res.json({ result });
};
