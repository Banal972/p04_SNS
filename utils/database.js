import { MongoClient } from 'mongodb'

// DB URL
const url = process.env.DB_URL;
// DB 옵션
const options = {  }
// useNewUrlParser: true

// DB 커넥트
let connectDB

// mongodb의 
if (process.env.NODE_ENV === 'development') {
  if (!global._mongo) {
    global._mongo = new MongoClient(url, options).connect()
  }
  connectDB = global._mongo
} else {
  connectDB = new MongoClient(url, options).connect();
}
export { connectDB }
