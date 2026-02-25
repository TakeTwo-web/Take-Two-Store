# Take Two - Email Backend Setup

## Overview
This project has been updated to replace EmailJS with a secure Node.js backend using Nodemailer for sending contact form emails via Gmail SMTP.

## What's Changed
- **Removed**: EmailJS client-side implementation (was exposing public key)
- **Added**: Secure backend email service using Nodemailer with Gmail SMTP
- **Environment Variables**: All credentials are now stored securely server-side

## Requirements Met
1. ✅ Express server
2. ✅ Nodemailer for email sending
3. ✅ CORS enabled
4. ✅ dotenv for environment variables
5. ✅ POST route `/api/email/send`
6. ✅ Accepts: name, email, message from frontend
7. ✅ Sends email to your Gmail inbox
8. ✅ Returns JSON response (success or error)
9. ✅ Security: No hardcoded credentials
10. ✅ Uses async/await with try/catch
11. ✅ Clean HTML form with fetch()
12. ✅ Shows alert on success/failure
13. ✅ Ready for Render/Vercel deployment

## Setup Instructions

### Step 1: Install Dependencies
```
bash
npm install
```

### Step 2: Generate Gmail App Password
**IMPORTANT**: You cannot use your regular Gmail password. You must generate an App Password.

1. Go to your Google Account: https://myaccount.google.com/
2. Click on **Security** (left sidebar)
3. Under "How you sign in to Google", enable **2-Step Verification**
4. After enabling 2-Step Verification, search for "App Passwords" in the search bar
5. Select **Mail** as the app
6. Select **Other (Custom name)** and enter "Take Two Website"
7. Click **Generate**
8. Copy the 16-character password (format: `xxxx xxxx xxxx xxxx`)

### Step 3: Configure Environment Variables
1. Copy `.env.example` to `.env`:
```
bash
cp .env.example .env
```

2. Edit `.env` and fill in your values:
```
env
PORT=5000
NODE_ENV=development
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-character-app-password
```

**Example:**
```
env
PORT=5000
NODE_ENV=development
EMAIL_USER=john@gmail.com
EMAIL_PASS=abcd1234efgh5678
```

### Step 4: Run the Server
```
bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

### Step 5: Test the API
Send a POST request to test:
```
bash
curl -X POST http://localhost:5000/api/email/send \
  -H "Content-Type: application/json" \
  -d '{"name": "Test User", "email": "test@example.com", "message": "This is a test message from the contact form."}'
```

Expected response:
```
json
{
  "success": true,
  "message": "Your message has been sent successfully!",
  "messageId": "<some-id@google.com>"
}
```

## API Endpoint

### POST /api/email/send
Send a contact form message.

**Request Body:**
```
json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello, I would like to inquire about..."
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Your message has been sent successfully!",
  "messageId": "<abc123@google.com>"
}
```

**Error Response (400):**
```
json
{
  "success": false,
  "message": "Validation error message"
}
```

**Error Response (500):**
```
json
{
  "success": false,
  "message": "Failed to send email. Please try again later."
}
```

## Deployment to Render

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set the following environment variables in Render:
   - `EMAIL_USER`: your Gmail address
   - `EMAIL_PASS`: your 16-character App Password
   - `NODE_ENV`: production
4. Set build command: `npm install`
5. Set start command: `npm start`

## Deployment to Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in your project root
3. Add environment variables via Vercel dashboard:
   - `EMAIL_USER`: your Gmail address
   - `EMAIL_PASS`: your 16-character App Password

## Security Notes

- Never commit `.env` file to version control
- The `.gitignore` already excludes `.env`
- App Password is different from your regular Gmail password
- Keep your App Password secure

## Frontend Integration

The frontend is already configured to send data to the backend. The `sendContactForm()` function in `script.js` now uses fetch() to POST to `/api/email/send`.

## Troubleshooting

### "Email service is not configured"
- Make sure `EMAIL_USER` and `EMAIL_PASS` are set in your `.env` file

### "Invalid credentials" or "Authentication failed"
- Make sure you're using an App Password, not your regular Gmail password
- Verify 2-Step Verification is enabled on your Google Account

### "Too many requests"
- The API has rate limiting (5 requests per hour per IP)
- Wait an hour and try again

### CORS errors
- Update `CORS_ORIGIN` in `.env` to include your frontend domain
