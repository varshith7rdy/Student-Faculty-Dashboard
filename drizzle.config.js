import { defineConfig } from "drizzle-kit"
import dotenv from "dotenv"

dotenv.config()

const config = defineConfig({
    dialect: "postgresql",
    dbCredentials: {
        url: process.env.DATABASE_URL,
    },
    schema: "./drizzle",
    out: "./drizzle",
})

export default config