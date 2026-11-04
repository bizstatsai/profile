# Contact Form API Specification

**Co-Author**: Srini Centhala, srini@absolut-e.com, Chief Data and AI Architect

## Overview
Specification for the contact form backend integration (future feature).

## Option A: EmailJS (Client-side)

No backend needed. EmailJS sends emails directly from the browser.

### Setup
1. Create EmailJS account at https://www.emailjs.com
2. Create email service (Gmail, Outlook, etc.)
3. Create email template
4. Add keys to `.env`

### Request Flow
```
Browser -> EmailJS API -> Email Service -> Inbox
```

### Integration
```js
import emailjs from '@emailjs/browser'

emailjs.send(
  import.meta.env.VITE_EMAILJS_SERVICE_ID,
  import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  {
    from_name: formData.name,
    from_email: formData.email,
    message: formData.message,
    subject: formData.subject,
  },
  import.meta.env.VITE_EMAILJS_PUBLIC_KEY
)
```

## Option B: Formspree (No backend)

### Endpoint
```
POST https://formspree.io/f/{form_id}
Content-Type: application/json
```

### Request Body
```json
{
  "name": "string (required)",
  "email": "string (required, valid email)",
  "subject": "string (optional)",
  "message": "string (required, max 5000 chars)"
}
```

### Response
```json
{
  "ok": true,
  "next": "https://formspree.io/thanks"
}
```

## Option C: Serverless Function (Vercel/Netlify)

### Endpoint
```
POST /api/contact
Content-Type: application/json
```

### Request Body
```json
{
  "name": "string (required, 1-100 chars)",
  "email": "string (required, valid email)",
  "subject": "string (optional, max 200 chars)",
  "message": "string (required, 10-5000 chars)",
  "honeypot": "string (must be empty, spam protection)"
}
```

### Validation Rules
- `name`: Required, 1-100 characters
- `email`: Required, valid email format
- `message`: Required, 10-5000 characters
- `honeypot`: Hidden field, must be empty (bot detection)
- Rate limit: 5 submissions per IP per hour

### Success Response (200)
```json
{
  "success": true,
  "message": "Message sent successfully"
}
```

### Error Response (400)
```json
{
  "success": false,
  "errors": {
    "email": "Invalid email format",
    "message": "Message must be at least 10 characters"
  }
}
```

### Error Response (429)
```json
{
  "success": false,
  "message": "Too many requests. Please try again later."
}
```
