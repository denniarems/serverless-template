import { z } from 'zod'

const envVariables = z.object({
	NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
	PORT: z.coerce.number().default(3000),
	RUNTIME: z.enum(['bun', 'edge']).default('bun'),
	MONGO_URI: z.string().url()
})

export const ENV = envVariables.parse(Bun.env)
