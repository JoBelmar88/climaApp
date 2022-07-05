import { leerInput, inquirerMenu, pausa, listarLugares } from "./helpers/inquirer.js";
import { Busqueda } from "./models/busquedas.js";

const main = async() => {
    const busquedas = new Busqueda();
    let opt;

    do{
        opt = await inquirerMenu();

        switch( opt ){
            case 1:
                const lugar = await leerInput('Ciudad: ');
                const lugares = await busquedas.ciudad(lugar);
                const id = await listarLugares(lugares);
                const lugarSelecionado = lugares.find( lugar => lugar.id === id );
                const tiempoLugar = await busquedas.tiempo(lugarSelecionado);
                //console.log(lugarSelecionado);

                console.log(`\nInformación de la ciudad\n`.green);
                console.log(`Ciudad ${lugarSelecionado.nombre}`);
                console.log(`Latitud: ${lugarSelecionado.lat}`);
                console.log(`Longitud: ${lugarSelecionado.lng}`);
                console.log(`Temperatura: `);
                console.log(`Mínima: `);
                console.log(`Máxima: `);
                
            break;    

        }

        if(opt !== 0) {
            await pausa();       
        }; 
    }
    while(opt !== 0);
}

main();