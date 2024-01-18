import { OpenAPIHono } from '@hono/zod-openapi'
import { helloRoute } from './route'

const hello = new OpenAPIHono()

hello.openapi(helloRoute, (c) => {
	const { id } = c.req.valid('param')
	console.log('🚀 ~ hello.openapi ~ id:', id)
	const payload = c.get('jwtPayload') as { id: string }
	console.log('🚀 ~ hello.openapi ~ payload:', payload)
	return c.json({
		id,
		age: 20,
		name: 'Ultra-man'
	})
})

export default hello
