require("dotenv").config()

// CORS when consuming Medusa from admin
const ADMIN_CORS = process.env.ADMIN_CORS || "https://app.medusa-commerce.com"

// CORS to avoid issues when consuming Medusa from a client
const STORE_CORS = process.env.STORE_CORS || "http://localhost:8000"

// Database URL (here we use a local database called medusa-development)
const DATABASE_URL =
  process.env.DATABASE_URL ||
  "postgres://medusa_backend_api_user:nBwpZxeApgXXLJBGUNqE3jiwAArrCotQ@dpg-cdkjfhmn6mpngrvou9rg-a.singapore-postgres.render.com/medusa_backend_api"

// Medusa uses Redis, so this needs configuration as well
const REDIS_URL =
  process.env.REDIS_URL ||
  "redis://default:CPazrhqJTMzi44muMonvHaPl7SZvcKKz@redis-13231.c295.ap-southeast-1-1.ec2.cloud.redislabs.com:13231"

// Stripe keys
const STRIPE_API_KEY = process.env.STRIPE_API_KEY || ""
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || ""

// Contentful Variables
const CONTENTFUL_SPACE_ID = process.env.CONTENTFUL_SPACE_ID || ""
const CONTENTFUL_ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN || ""
const CONTENTFUL_ENV = process.env.CONTENTFUL_ENV || ""

// This is the place to include plugins. See API documentation for a thorough guide on plugins.
const plugins = [
  `medusa-fulfillment-manual`,
  `medusa-payment-manual`,
  {
    resolve: `medusa-plugin-contentful`,
    options: {
      space_id: CONTENTFUL_SPACE_ID,
      access_token: CONTENTFUL_ACCESS_TOKEN,
      environment: CONTENTFUL_ENV,
    },
  },
  // Uncomment to add Stripe support.
  // You can create a Stripe account via: https://stripe.com
  // {
  //   resolve: `medusa-payment-stripe`,
  //   options: {
  //     api_key: STRIPE_API_KEY,
  //     webhook_secret: STRIPE_WEBHOOK_SECRET,
  //   },
  // },
]

module.exports = {
  projectConfig: {
    redis_url: REDIS_URL,
    // For more production-like environment install PostgresQL
    database_url: DATABASE_URL,
    database_type: "postgres",
    database_database: "./medusa-db.sql",
    database_type: "sqlite",
    store_cors: STORE_CORS,
    admin_cors: ADMIN_CORS,
  },
  plugins,
}
