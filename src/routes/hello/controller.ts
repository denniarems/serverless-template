import { OpenAPIHono } from '@hono/zod-openapi'
import { jwt } from 'hono/jwt'
import { testRoute } from './route'

const hello = new OpenAPIHono()
hello.use(
	'*',
	jwt({
		secret: 'secret'
	})
)
hello.openapi(testRoute, (c) => {
	const { id } = c.req.valid('param')
	console.log('🚀 ~ hello.openapi ~ id:', id)
	const payload = c.get('jwtPayload')
	console.log('🚀 ~ hello.openapi ~ payload:', payload)
	return c.json({
		id,
		age: 20,
		name: 'Ultra-man'
	})
})

export default hello
