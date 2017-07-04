import request from 'request-promise-native'
import console from 'global/console'

type RouteResponse = {
  route: Array<{
    lon: string,
    lat: string,
    tag: string,
  }>,
  copyright: string,
}

export default async function nextBusAllStops() {
  try {
    const response: RouteResponse = await request({
      url: 'http://webservices.nextbus.com/service/publicJSONFeed?command=routeConfig&a=sf-muni',
      headers: {'User-Agent': 'request'}
    })
    return stopsFromAllRoutes(JSON.parse(response))
  } catch (e) {
    console.error('nextBusAllStops: cannot ')
  }
  return []
}

function stopsFromAllRoutes(nbRoutes: RouteResponse) {
  const stops = []
  if (!nbRoutes) {
    return stops
  }

  const visited = {}

  for (const r of nbRoutes.route) {
    for (const s of r.stop) {
      // if (visited[s.tag]) {
      //   continue
      // }
      if (!visited[s.tag]) {
        visited[s.tag] = true
        stops.push({
          name: s.tag,
          location: [s.lon, s.lat]
        })
      }

    }
  }

  return stops
}
