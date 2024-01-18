import { OpenAPIHono } from '@hono/zod-openapi'
import { apiReference } from '@scalar/hono-api-reference'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { prettyJSON } from 'hono/pretty-json'

import connectDB from './configs/db'
import { ENV } from './configs/env'
import { errorHandler, notFound } from './middlewares/errorMiddlewares'
import mainRoute from './routes'

const app = new OpenAPIHono()

await connectDB()

app.use('*', logger(), prettyJSON())
app.use(
	'*',
	cors({
		origin: '*',
		allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
	})
)

app.get('/', (c) => c.text('Welcome to the API!'))

app.route('/api', mainRoute)

app.doc31('/docs', {
	openapi: '3.1.0',
	info: {
		version: '1.0.0',
		title: 'My API'
	}
})
app.openAPIRegistry.registerComponent('securitySchemes', 'bearerAuth', {
	bearerFormat: 'JWT',
	type: 'http',
	scheme: 'bearer'
})
app.get(
	'/doc',
	apiReference({
		spec: {
			url: '/docs'
		}
	})
)

app.onError((err, c) => {
	console.log('🚀 ~ app.onError ~ err:', err)
	const error = errorHandler(c)
	return error
})

app.notFound((c) => {
	const error = notFound(c)
	return error
})

export default {
	port: ENV.PORT,
	fetch: app.fetch
}
