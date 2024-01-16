import * as mongoose from 'mongoose'
import { ENV } from './env'

const connectDB = async () => {
	const conn = await mongoose.connect(ENV.MONGO_URI, {
		autoIndex: true
	})

	console.log(`MongoDB Connected: ${conn.connection.host}`)
}

export default connectDB
