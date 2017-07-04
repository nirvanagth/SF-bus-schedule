import nextBusAllStops from './next-bus-all-stops'
import connectMongodb, {onClose} from './mongodb'

export default function setGateways(server) {
  server.gateways.nextBusAllStops = nextBusAllStops

  connectMongodb(server.config.gateways.mongodb, server)
  server.gateways.onClose(onClose)
}
