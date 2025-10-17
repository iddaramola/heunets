import fastify from 'fastify'
import cors from '@fastify/cors';


import { itemsRoutes } from './routes/items.route'


export function buildServer() {
const app = fastify({ logger: true })
app.register(cors, { origin: '*' })
app.register(itemsRoutes)
return app
}