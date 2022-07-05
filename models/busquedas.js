import 'dotenv/config';
import axios from "axios";

class Busqueda {
    historial = ['Concepción', 'Madrid', 'San José', 'Buenos Aires'];

    constructor() {
        //Leer db si existe
    }

    get paramsMapBox(){
        return {
            'access_token': process.env.MAPBOX_KEY,
            'language': 'es',
            'limit': 5
        }       
    }

    async ciudad( lugar = string ){

        try {
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ lugar }.json`,
                params: this.paramsMapBox
            });
            const resultado = await instance.get();

            return resultado.data.features.map( lugar => ({
                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1]
            })); 

        } catch (error) {
            console.log(error);
            return []; // retornar lugares
        }

    }

    async tiempo(lugar){
        
        try {
            const instance = axios.create({
                baseURL: 'https://api.openweathermap.org/data/2.5/weather',
                params: {
                    'lat': lugar.lat,
                    'lon': lugar.lng,
                    'appid':  process.env.OPENWEATHER_KEY
                } 
            });

            const tiempoLugar = await instance.get();
            console.log("tiempo: ", tiempoLugar);
        } catch (error) {
            console.log(error);
        }
    }
}

export {
    Busqueda
}