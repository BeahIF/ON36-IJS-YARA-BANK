
import axios from 'axios';
import { GeolocationPort } from 'src/conta-corrente/domain/ports/geolocation.port';

export class GeolocationAdapter implements GeolocationPort {
  async fetchLocation(): Promise<any> {
    const response = await axios.get('https://api.ipgeolocation.io/ipgeo?apiKey=23a816b485cb4dff814c4a70bba48464&ip=8.8.8.8');
    return response?.data
  }
}