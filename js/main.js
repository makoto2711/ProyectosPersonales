/*
const hide = document.getElementById("hidden")


window.addEventListener("beforeunload", () => 
{
    document.querySelector("body").style.overflow = "hidden"
})


window.addEventListener("load", () =>
{
    const spin = document.getElementById("carga")
    spin.remove()
  
    document.querySelector("body").style.overflow = "visible"
})
*/

 
 

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
        $bg_color = document.querySelector(".bg-color")

    let cont = 0

    $cambiar.addEventListener("click", () => 
    {
        /*let random = Math.floor(Math.random()*3) + 0
        $bg_color.style.background = arr[random] + ""*/

        $bg_color.style.background = randomBg()
    })    

    function randomBg() 
    {
        return `hsl(${Math.floor(Math.random() * 360) }, 100%, 50%)`    
    }

}();




// PROYECTO 3
!function() 
{
    const $input = document.getElementById("letras"),
      $total = document.getElementById("totalLetras")

    $input.addEventListener("keyup", ()=> 
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
            
            if (e.key == "Enter") 
            {

                if (random2 == adivina.value) 
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
            }

        });
}()



!function() 
{
    const imgs = document.getElementById("imgs"),
          img = document.querySelectorAll("#imgs img"),
          prev = document.getElementById("prev"),
          next = document.getElementById("next")

    let cont = 0,
        contando = img.length - 1 

   
        prev.addEventListener("click", () => 
        {
            cont <= 0 ? cont = contando : --cont
            imgs.style.transform = `translateX(${-cont * 500}px)`
        }) 
     

        next.addEventListener("click", () => 
        {
            cont >= contando ? cont = 0 : ++cont 
            imgs.style.transform = `translateX(${-cont * 500}px)`
        })


     /*
    function run() 
    {
        if (cont > contando) 
        {
            cont = 0    
        }

        imgs.style.transform = `translateX(${-cont * 500}px)`

        setTimeout( run , 9000 );
        cont++
    }

    run()  */

}();

 

!function() 
{
    const text = "Aprender JS es lo mejor ❤",
          escribe = document.getElementById("efectoAqui")

    let index = 0,
        contLetras = text.length

    const efectoPro = () => 
    { 
        escribe.innerText = text.slice(0,index) 
        escribe.style.color = "#fff"
        escribe.style.fontSize = "20px"

        index > contLetras ? index = 0 : index++
    }


    setInterval(efectoPro, 265)
}();


 
!function() 
{
    const newYear = "1 Jan 2021",
        anio = new Date(newYear).getFullYear()
  

    const dias = document.getElementById("days"),
          horas = document.getElementById("hours"),
            min = document.getElementById("min"),
            sec = document.getElementById("sec"),
        nuevoTexto = document.getElementById("nuevoTexto")
     
            function cuentaRegresiva()
            {
                const newYearsDate = new Date(newYear),
                      currentDate = new Date() ,
                      seconds = (newYearsDate - currentDate) / 1000,
                      days = Math.floor(seconds / 3600 / 24),
                      hours = Math.floor(seconds / 3600 ) % 24,
                      minutes = Math.floor(seconds / 60) % 60,
                      segundos = Math.floor(seconds) % 60

                if (anio === 2021) 
                {
                    clearInterval(guardarAnio)
                    nuevoTexto.textContent = "Feliz Año Nuevo"
                    dias.textContent = 0 + " : "
                    horas.textContent = 0 + " : "
                    min.textContent = 0 + " : "
                    sec.textContent = 0
                  
                    return
                }

                    dias.textContent = days + " : "
                    horas.textContent = hours + " : "
                    min.textContent = minutes + " : "
                    sec.textContent = segundos

                 //   console.log(days, hours,minutes, segundos);
            }
 
            let guardarAnio = setInterval(cuentaRegresiva, 1000);
}();



!function() 
{
    const guardarContra = document.getElementById("guardarContra"),
          lon = document.getElementById("lon"),
          upper = document.getElementById("upper"),
          lower = document.getElementById("lower"),
          number = document.getElementById("number"),
          symbol = document.getElementById("symbol"),
          generador = document.getElementById("generador"),
          copiar = document.getElementById("copiar")

    const   Up = "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
            normal = "abcdefghijklmnopqrstuvwxyz",
            num = "0123456789",
            sim = "!@#$%&*()_+="


    function obtenerMinusculas() 
    {
      return normal[Math.floor(Math.random()*normal.length)]    
    }      

    function obtenerMayusculas() 
    {
      return Up[Math.floor(Math.random() * Up.length)]
    }   

    function obtenerNumeros() 
    {
      return num[Math.floor(Math.random() * num.length)]
    } 

    function obtenerSimbolos() 
    {
      return sim[Math.floor(Math.random() * sim.length)]
    }   

    
    function generarPass() 
    {
        const len = lon.value

        let password = ""

        for (let i = 0; i < len; i++) 
        {
            const x = generateX()
            password += x             
        }

        
        guardarContra.value = password
    }   

    function generateX() 
    {
        const xs = []
        if (upper.checked) 
        {
            xs.push(obtenerMayusculas())
        }    

        if (lower.checked) 
        {
            xs.push(obtenerMinusculas())
        }

        if (number.checked) 
        {
            xs.push(obtenerNumeros())
        }

        if (symbol.checked) 
        {
            xs.push(obtenerSimbolos())
        }

        return xs[Math.floor(Math.random() * xs.length)]
    }



    // Cuando se trata de funciones, solo escribirlo sin los parentesis
    generador.addEventListener("click", generarPass )

    copiar.addEventListener("click", ()=>
    {
        const textarea = document.createElement("textarea"),
              contra = guardarContra.value

            if (!contra) 
            {
                return
            }

            textarea.value = contra
            document.body.appendChild(textarea)
            textarea.select()
            document.execCommand("copy")
            textarea.remove()
            alert("Se copio la contra")
    })
}();




 
!function() 
{
   
   const snake = document.getElementById("snake")  

   let pos = { x:0 , y:0 }

   document.addEventListener("keydown", (e)=> 
   {
       
       switch (e.key) 
       {
            case "d":
               if (pos.x < 270) 
               {
                   pos.x += 30
               }
               snake.style.left = pos.x + "px"
               break;
       
            case "a":
               if (pos.x > 0) 
               {
                   pos.x -= 30
               }
               snake.style.left = pos.x + "px"
               break;  
            
            case "s":
               if (pos.y < 270) 
               {
                   pos.y += 30
               }
               snake.style.top = pos.y + "px"
               break;  
               
            case "w":
               if (pos.y > 0) 
               {
                   pos.y -= 30
               }
               snake.style.top = pos.y + "px"
               break;     
       }    
   })
}();



!function() 
{
    const $foto = document.getElementById("observar"), 
          options = 
          {
             // root,
            rootMargin: "0px 0px 0px 0px",
            threshold: .5, // 50% de la foto para que pase algo, le puedo poner 1 tambien
          }

          function callback(entries,observer) 
          {
                 console.log("Se llamo al callback");


              entries[0].isIntersecting ?  $foto.style.filter = "hue-rotate(300deg)" :
                                           $foto.style.filter = "none" 
          }


        const observer = new IntersectionObserver(callback, options)  
        observer.observe($foto)
}();

 

