# Api for email subscription 🚀

This is an API for a Coming Soon website mainly.

The API makes use of JWT to encrypt the session and then it is stored in DB with the ip, email and date.

This app can do:

- Create & Register Emails with their IP's

# Environment Variables

- `DATABASE_URL`, The mongodb database uri
- `SECRET_PASSWORD`, The Secret token 

# Installation 🔧

```
git clone https://github.com/fernandezfermin/truefpshub-email-api
cd truefpshub-email-api
npm install
npm start
```

# Setup .env file 

```
# Mongo DB
# Local development
DATABASE_URL="mongodb://localhost:27017/emailapi"

# JSON web token (JWT) secret
SECRET_PASSWORD=email-api_secret_token

```

## Tech🛠️

This project uses:

- [node.js] - evented I/O for the backend
- [Express] - fast node.js network app framework


   [node.js]: <http://nodejs.org>

   [express]: <http://expressjs.com>
