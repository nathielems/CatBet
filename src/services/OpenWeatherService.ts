import axios from "axios";

const key = 'a4080f89b1ee29f5b35a3a2785f982d5'
const hostname = `https://api.openweathermap.org/data/2.5/weather?`

class OpenWeatherService {
  async getTemperature(lat: number, long: number) {
    const http = `lat=${lat}&lon=${long}&appid=${key}&units=metric`

    try {
      const { data } = await axios.get(`${hostname}${http}`)
      return data.main.temp;
    }
    catch(e) {
      return e;
    }
  }
}

export default OpenWeatherService;
