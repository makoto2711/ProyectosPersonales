const   $template = document.getElementById("template").content,
        $fragmento = document.createDocumentFragment(),
        $main = document.getElementById("main")
        
let arr ,
    contar,
    mensajes = [],
    arr2 = []

async function Obtener() 
{
    const JASON = await fetch(`https://webexapis.com/v1/messages?roomId=Y2lzY29zcGFyazovL3VzL1JPT00vZDZlMGU3MDAtNDNlNC0xMWViLTk2NTMtYWQ3ZmE3ZDRkYzVj`,
                                {
                                    headers:
                                    {
                                        'Content-type': 'application/json',
                                        'Authorization': 'Bearer YzBmMGEwODgtOGJkNS00ZmRlLThhODAtZjU1MWNlYmEzNzI2ZGUyZmI4YzAtN2Yz_PF84_consumer',
                                    }
                                })

    const resp = await JASON.json() 
    return resp
}

 

async function Procesar() 
{
    const data = await Obtener()    

    contar = data.items.length
    
    if(contar == 0) 
    {
        $main.innerHTML = "<h1 class='text-dark text-center'><strong>No hay alertas que mostrar</strong></h1>"
    }
    else
    {
        arr = data.items
        
        arr.forEach(valor => 
            {
                arr2.push(valor.text.split(" "))
            })

            console.log(arr2);
        
        $main.innerHTML = ""
        
        arr.forEach((items,i) => 
        {
            const copia = $template.cloneNode(true) 
            copia.querySelector(".caja-mapa").setAttribute("id", `map${i}`)
            copia.querySelector("h5").textContent = arr2[i][0]  
            copia.querySelector("h5").style.color = "#fd0d18"   
            const dia = new Date(items.created) , mes = new Date(items.created)            
            copia.querySelector(".fecha").textContent = ` ${dia.getDate()}/${mes.getMonth() + 1}`
            const hora = new Date(items.created), min = new Date(items.created)
            copia.querySelector(".hora").textContent = ` ${hora.getHours()}:${min.getMinutes()}` 
            $fragmento.appendChild(copia)
            crearMapa(i, arr2[i][2], arr2[i][4]) 
        });
        $main.appendChild($fragmento)
    }
    
}

  Procesar()



async function crearMapa(i, latitud, longitud) 
{
        latitud = await +latitud
        longitud = await +longitud 

    const exampleCoords = [latitud, longitud]
    var mymap = L.map(`map${i}`).setView(exampleCoords, 17);
    var marker = L.marker(exampleCoords).addTo(mymap);

    marker.bindPopup("<b>Esta es mi ubicación</b><br>Venir rapido.").openPopup();

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1

    }).addTo(mymap);
}



