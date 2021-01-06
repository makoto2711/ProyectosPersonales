
// Proyecto de Votacion

!function() 
{
    const numeroDNI = document.getElementById("numberDNI"),
          validar = document.getElementById("validar")

    let arr = [],
        jason = {},
        contarArr

    numeroDNI.addEventListener("keypress", (e) => 
    {
        let long = numeroDNI.value.length

        if ( long > 7 ) 
        {
            e.preventDefault()
        } 
    })


    validar.addEventListener("click", (e)=> 
    {
        /*
        if ( arr.length > 1 ) 
        {
            
        }*/
        
        jason = {id: Math.random(), dni: numeroDNI.value}
        arr.push(jason)
     

        console.log(arr);
    })

  


        let sabe = 
                [
                    {
                       dni:123 
                    },
                    {
                        dni: 1233
                    },
                    {
                        dni:456
                    }
                ]   
         
                let peluca = {dni:456}

                for (let i = 0; i < sabe.length; i++) 
                {
                   peluca.dni === sabe[i].dni ? console.log("elemento repetido") : console.log("nola");    
                }


}();



