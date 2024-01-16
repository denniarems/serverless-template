import { OpenAPIHono } from '@hono/zod-openapi'
import hello from './hello/controller'

const mainRoute = new OpenAPIHono()

mainRoute.route('/hello', hello)

export default mainRoute
