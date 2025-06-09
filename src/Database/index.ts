import dotenv from 'dotenv'
import { drizzle } from 'drizzle-orm/neon-http';
dotenv.config();

 export const db = drizzle(process.env.DATABASE_URL! || (() => { throw new Error('Database URL is not defined') })());
