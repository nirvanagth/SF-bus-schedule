import mongoose from 'mongoose'
import global from 'global'
import console from 'global/console'

mongoose.Promise = global.Promise

export default async function connectMongodb(config) {
  try {
    await mongoose.connect(config.url, {useMongoClient: true})
  } catch (e) {
    console.error(`failed to connectMongodb: ${e}`)
  }
}

export function onClose() {
  mongoose.connection.close()
}
