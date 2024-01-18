import { OpenAPIHono } from '@hono/zod-openapi'
import { jwt } from 'hono/jwt'
import hello from './hello/controller'

type Bindings = {
	TOKEN: string
}

type Variables = {
	jwtPayload: {
		id: string
	}
}

const mainRoute = new OpenAPIHono<{ Bindings: Bindings; Variables: Variables }>()

mainRoute.use(
	'*',
	jwt({
		secret: 'secret'
	})
)

mainRoute.route('/hello', hello)

export default mainRoute
