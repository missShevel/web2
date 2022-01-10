import { createTransport } from 'nodemailer';
import sanitizeHTML from 'sanitize-html';
import { MyError } from '../src/Errors';
require('dotenv').config();

const from = `Form - ${process.env.EMAIL_ADDRESS}`;
const history = new Map();
const transport = createTransport({
  host: process.env.HOST,
  port: process.env.EMIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD,
  },
});

async function sendMail(options) {
  try {
    await transport.sendMail(options);
    return { success: true };
  } catch (error) {
    throw MyError.MailError();
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
  const count = history.get(ip) ? history.get(ip) : 0;
  if (count >= limit) {
    throw MyError.RateLimitError();
  }
  history.set(ip, count + 1);
};

const emailCheckRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const nameCheckRegex = /^[a-zA-ZА-ЯЁа-яё]{2,}\s?[a-zA-ZА-ЯЁа-яё]*$/;

function validate({ email, name }) {
  if (!emailCheckRegex.test(String(email).toLowerCase())) {
    throw MyError.ValidationError(`${email} is not valid`);
  }

  if (!nameCheckRegex.test(String(name))) {
    throw MyError.ValidationError(`${name} is not valid`);
  }
}

module.exports = async (req, res) => {
  console.log(req.body);
  try {
    rateLimit(req.headers['x-real-ip'], 3);
    validate(req.body);
    const result = await formSubmit(req.body);
    return res.json({ result });
  } catch (e) {
    return res.status(e.status).json({
      status: e.status,
      errors: [e.message],
      result: {
        success: false,
      },
    });
  }
};
