import config from 'config'
import mongoose, {Schema} from 'mongoose'
import console from 'global/console'

import connectMongodb from '../gateways/mongodb'
import nextBusAllStops from '../gateways/next-bus-all-stops'

connectMongodb(config.get('gateways').mongodb)

const locationSchema = new Schema({
  name: String,
  location: {
    type: [Number],
    index: '2d'
  }
})

const Location = mongoose.model('Location', locationSchema)

export async function findAll() {
  let locations = []

  try {
    locations = await Location.find()
  } catch (e) {
    console.error(`failed to findAll: ${e}`)
  }

  return locations
}

export async function findIn1Mile(lng, lat) {
  let rawLocations = []

  try {
    rawLocations = await Location.find({
      location: {
        $near: [lng, lat],
        $maxDistance: 0.00181
      }
    })
  } catch (e) {
    console.error(`failed to findIn1Mile: ${e}`)
  }

  return rawLocations.map(l => ({name: l.name, location: l.location}))
}

export async function insertMany(locations) {
  try {
    await Location.insertMany(locations)
  } catch (e) {
    console.error(`failred to insert: ${e}`)
  }
}

export async function initLocations() {
  try {
    await Location.collection.drop()
    const stops = await nextBusAllStops()
    await insertMany(stops)
  } catch (e) {
    console.log(`failed to initLocations: ${e}`)
  }
}
