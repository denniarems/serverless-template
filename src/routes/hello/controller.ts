import { OpenAPIHono } from '@hono/zod-openapi'
import { testRoute } from './route'

const hello = new OpenAPIHono()

hello.openapi(testRoute, (c) => {
	const { id } = c.req.valid('param')
	return c.json({
		id,
		age: 20,
		name: 'Ultra-man'
	})
})

export default hello
