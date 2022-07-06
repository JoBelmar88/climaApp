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
    };

    get paramsWeather(){
        return {
            'units': 'metric',
            'lang': 'es',
            'appid':  process.env.OPENWEATHER_KEY
        }       
    };

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
                params: { ...this.paramsWeather,
                    'lat': lugar.lat,
                    'lon': lugar.lng,                    
                } 
            });

            // const {temp, temp_min, temp_max, weather} = await (await instance.get()).data.main;
            const {main, weather} = await (await instance.get()).data;

            const probabilidades = weather.map( probabilidad => ({
                main: probabilidad.main,
                description: probabilidad.description
            }));

            console.log('probabilidades: ', probabilidades);

            return {
                temperatura: main.temp,
                minima: main.temp_min,
                maxima: main.temp_max,
                probabilidades: probabilidades
            };
        } catch (error) {
            console.log(error);
        }
    }
}

export {
    Busqueda
}