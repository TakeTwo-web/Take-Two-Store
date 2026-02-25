/**
 * Standalone Email Test Server
 * This is a SIMPLE server for testing the email functionality
 * WITHOUT MongoDB dependency
 * 
 * Usage:
 * 1. Make sure you have EMAIL_USER and EMAIL_PASS in your .env file
 * 2. Run: node test-email-server.js
 * 3. Test with: curl -X POST http://localhost:3000/api/email/send -H "Content-Type: application/json" -d "{\"name\": \"Test\", \"email\": \"test@test.com\", \"message\": \"Hello world test\"}"
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Log all requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Email send endpoint
app.post('/api/email/send', async (req, res) => {
  console.log('Received request:', req.body);
  
  const { name, email, message } = req.body;

  // Validation
  if (!name || name.trim().length < 2) {
    return res.status(400).json({
      success: false,
      message: 'Name is required and must be at least 2 characters'
    });
  }

  if (!email) {
    return res.status(400).json({
      success: false,
      message: 'Email is required'
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a valid email address'
    });
  }

  if (!message || message.trim().length < 10) {
    return res.status(400).json({
      success: false,
      message: 'Message is required and must be at least 10 characters'
    });
  }

  // Check environment variables
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error('Missing EMAIL_USER or EMAIL_PASS in .env');
    return res.status(500).json({
      success: false,
      message: 'Email configuration missing. Please check .env file.'
    });
  }

  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Email options
    const mailOptions = {
      from: `"Take Two Website" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `New Contact Form: ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #333;">New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
          <hr>
          <p style="color: #666; font-size: 12px;">Sent from IP: ${req.ip}</p>
        </div>
      `
    };

    // Send email
    console.log('Sending email to:', process.env.EMAIL_USER);
    const info = await transporter.sendMail(mailOptions);
    
    console.log('Email sent successfully! Message ID:', info.messageId);
    
    res.json({
      success: true,
      message: 'Email sent successfully!',
      messageId: info.messageId
    });

  } catch (error) {
    console.error('Error sending email:', error.message);
    console.error('Full error:', error);
    
    res.status(500).json({
      success: false,
      message: 'Failed to send email: ' + error.message
    });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log('========================================');
  console.log('🎉 Email Test Server is running!');
  console.log(`📍 Server URL: http://localhost:${PORT}`);
  console.log(`📧 Email endpoint: POST http://localhost:${PORT}/api/email/send`);
  console.log('========================================');
  console.log('');
  console.log('Environment check:');
  console.log(`  EMAIL_USER: ${process.env.EMAIL_USER ? '✅ Set' : '❌ Missing'}`);
  console.log(`  EMAIL_PASS: ${process.env.EMAIL_PASS ? '✅ Set' : '❌ Missing'}`);
  console.log('');
  
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.log('⚠️  Please add these to your .env file:');
    console.log('   EMAIL_USER=your-email@gmail.com');
    console.log('   EMAIL_PASS=your-16-char-app-password');
    console.log('');
  }
});

module.exports = app;
