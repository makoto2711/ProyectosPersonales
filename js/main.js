// PROYECTO NUMERO 1
!function() 
{
    const resta = document.getElementById("resta"),
        cambiar = document.getElementById("cambiaNumber"),
        suma = document.getElementById("suma")

    // Convierto el "STRING" en "NUMERO"
    let presto = +cambiar.textContent

    suma.addEventListener("click", () => 
    {
        cambiar.textContent = ++presto
    })

    resta.addEventListener("click", () => 
    {
        cambiar.textContent = --presto
    })
    
}();




// PROYECTO 2
!function() 
{
    const $cambiar = document.getElementById("cambiar"),
        $bg_color = document.querySelector(".bg-color"),
        arr = ["red", "blue", "green", "yellow"]

    let cont = 0

    $cambiar.addEventListener("click", () => 
    {
        /*let random = Math.floor(Math.random()*3) + 0
        $bg_color.style.background = arr[random] + ""*/

        $bg_color.style.background = arr[cont] + ""
        cont > 2 ? cont = 0 : cont++
    })    
}();




// PROYECTO 3
!function() 
{
    const $input = document.getElementById("letras"),
      $total = document.getElementById("totalLetras")

    $input.addEventListener("keyup", (e)=> 
    {   
        let contar = $input.value.length;
        
        contar > 0 ? $total.textContent = contar : $total.textContent = ""
    })
        
}();




// PROYECTO 4
// Guardar Notas Proyecto
!function() 
{
    const $nota = document.getElementById("nota"),
          guardar = document.getElementById("guardar")

    const   $template = document.getElementById("template").content,
            $guardarAqui = document.getElementById("guardarAqui"),
            $fragmento = document.createDocumentFragment()


    let jason = {},
        arr = [],
        random,
        parse,
        lastStep


    mostrar(arr);


    $nota.addEventListener("keyup", (e) => 
    {
        let salvarValor = $nota.value
        salvarValor = salvarValor.split("")
        salvarValor = salvarValor.join("")

        let sinEspacios = salvarValor.trim()
        
        if (e.key == "Enter") 
        {
           
           if ( sinEspacios == "" ) 
           {
               e.preventDefault()
           }
           else
           {
               jason = { id: generarRandom(), nota: salvarValor }
               arr.push(jason)
               console.log(arr);
               mostrar(arr)
               $nota.value = "" 
           }
        }
    })


    guardar.addEventListener("click", (e) => 
    {
        if ( $nota.value.trim() == "") 
        {
            e.preventDefault()
        } 
        else 
        {
            jason = { id: generarRandom(), nota: $nota.value }
            arr.push(jason)
            console.log(arr);
            mostrar(arr)
            $nota.value = "" 
        }
    })


    function generarRandom() 
    {
        random = Math.random()
        parse = random + "" // Lo convierto  en String
        lastStep = parse.substring(2)
        lastStep = +lastStep  // Lo convierto en Int    
        return lastStep
    }


    function mostrar(arr) 
    {
        let longitud = arr.length , peluca;

        longitud > 0 ? peluca = "" : peluca = "popup"
        longitud > 0 ? iteracion(arr) : $guardarAqui.innerHTML = `<p class='w-50 m-auto alert alert-danger text-center ${peluca}' role='alert'>No hay notas pendientes</p>`
    }


    function iteracion(arr) 
    {
        $guardarAqui.innerHTML = ""
        arr.forEach((item, i) => {
            const copia = $template.cloneNode(true)
            copia.querySelector("p").textContent = item.nota
            copia.querySelector("a").setAttribute("data-delete", i)
            copia.querySelector("div").setAttribute("data-div", i)
            copia.querySelector("div").classList.add("notita")
            $fragmento.appendChild(copia)
        })

        $guardarAqui.appendChild($fragmento)
    }


    window.addEventListener("click", (e) => 
    {
        if (e.target.matches("[data-delete]")) 
        {
            // para obtener el padre del HIJO
            e.target.parentNode.classList.remove("notita")
            e.target.parentNode.classList.add("remove")

            setTimeout(() => 
            {
                arr.splice(e.target.getAttribute('data-delete'), 1)
                mostrar(arr)
            }, 600);
        }
    })
}();




// PROYECTO 5
!function() 
{
    const $pokecard = document.getElementById("pokeCard").content,
          $fragmento = document.createDocumentFragment(),
          $cartas = document.getElementById("cartas")

    let conjuntoDePokemones = [] 

    async function api() 
    {
        // Con esta URL puedo obtener la cantidad total de todos los POKEMONS y puedo decir cuantos quiero obtener con el API
        const JASON = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100&offset=0.")
        const data = await JASON.json() 
        conjuntoDePokemones = data.results 
        return conjuntoDePokemones
    }
    

    async function consumo() 
    {
        const data = await api()  
    
        data.forEach(item => 
        {
            recorrerApi(item.url)
        })    
    }


    async function recorrerApi(valor) 
    {
       try 
       {
           const JASON = await fetch(valor)   
           const data = await JASON.json()
           //console.log(data);
           const clonar = $pokecard.cloneNode(true)         
           clonar.querySelector("img").src = data.sprites.front_default
           clonar.querySelector("h6").textContent = data.name
           clonar.querySelector(".alto").textContent = data.height 
           clonar.querySelector(".ancho").textContent = data.weight 
           $fragmento.appendChild(clonar)
           $cartas.appendChild($fragmento)
       } 
       catch (error) 
       {
        console.log(error);    
       }
    }

    consumo()
}();


!function() 
{
    const subir = document.getElementById("subirFoto"), 
          archivo = document.getElementById("obtenerArchivo") 

    const c = document.getElementById("caja"),
          ctx = c.getContext("2d"),
          image = new Image()
    
    let fotoBro

    subir.addEventListener("click", () => 
    {
        archivo.click()
        archivo.addEventListener("change", ()=>
        { 
            fotoBro = archivo.files[0] 
            fotoBro = URL.createObjectURL(fotoBro)            
            
            image.addEventListener("load", () => 
            {
                c.classList.replace("d-none","marco")
                // console.log("cargando imagen");
                ctx.drawImage(image, 0, 0, c.width, c.height)
            })

            image.src = fotoBro
        })
    })
 
}();




!function() 
{
    const $cuadro = document.getElementById("cuadro"),
          $cambiarColor = document.getElementById("cambiarColor"),
          $colorEscogido = document.getElementById("colorEscogido")

    let guardarTemporal = $colorEscogido.parentNode
       
    $cambiarColor.addEventListener("input", ()=> 
    {
        $cuadro.style.background = $cambiarColor.value 
        guardarTemporal.style.filter = "invert(1)"
        guardarTemporal.style.background = $cambiarColor.value    
        $colorEscogido.style.color = $cambiarColor.value
        $colorEscogido.style.filter = "invert(1)"
        $colorEscogido.style.textShadow = "0 0 7px #000000"
        $colorEscogido.style.transform = "scale(1.5)"
        $colorEscogido.textContent = `Color: ${$cambiarColor.value}` 
    })    
          
}();



!function() 
{
    const adivina = document.getElementById("adivina"),
            rpta = document.getElementById("respuesta")

    let random2

        adivina.addEventListener("keypress", (e)=>
        {
            // Validacion con el "e.key" para saber que caracter se presiono

             random2 = Math.floor(Math.random()*5 ) + 1

            if (adivina.value.length > 0 || e.key > 5 || e.key < 1) 
            {
                e.preventDefault();
            }
            

            if(random2 == adivina.value) 
            {
                rpta.textContent = `Ganaste - el numero era: ${random2}` 
                 rpta.parentNode.classList.add("ganaste")   
                rpta.parentNode.classList.remove("perdiste")   
            }
            else
            {
                rpta.textContent = `Perdiste - el numero era: ${random2}`
                rpta.parentNode.classList.add("perdiste")  
                rpta.parentNode.classList.remove("ganaste")  
            }
        })

}()



















