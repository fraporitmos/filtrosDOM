//Referenciar a mis componentes de html en Javascript
var containerProductos = document.getElementById("containerProductos")
var btnFiltrarCategoria = document.getElementById("btnFiltrarCategoria")

//Usar el evento click y ejecutar una funcion
btnFiltrarCategoria.addEventListener("click",actionBtnFiltrarCategoria )

function actionBtnFiltrarCategoria(){
   let arrayFiltrarCategoria = productosArray.filter(
    item => item.category === "jewelery"
   )
   renderizarProductos(arrayFiltrarCategoria)
}

//Genera un string con html dinamico
function generarUIProducto(producto) {
    return `<div class="flex max-w-md overflow-hidden bg-white rounded-lg shadow-lg">
                <img class="w-1/3 bg-cover h-56 m-6 object-cover bg-landscape"
                    src=${producto.image} />

                <div class="w-2/3 p-4 flex flex-col justify-between">
                    <div>
                        <h1 class="text-2xl line-clamp-1 font-bold text-gray-900">
                            ${producto.title}
                        </h1>
                        <p class="mt-2 line-clamp-3 text-sm text-gray-600">
                            ${producto.description}
                        </p>

                    </div>
                    <div>
                        <div class="flex w-full justify-end">
                            <span class=" bg-teal-700 text-white rounded-full h-6 px-3 ">
                                ${producto.category}
                            </span>

                        </div>

                        <div class="flex justify-between mt-3 item-center">
                            <h1 class="text-xl font-bold text-gray-700">
                                S/${producto.price}
                            </h1>
                            <button class="px-3 py-2 text-xs font-bold text-white uppercase bg-gray-800 rounded">
                                Add to Card
                            </button>
                        </div>
                    </div>
                </div>
            </div>`
}

//Renderiza todos los productor que vengan en un array
function renderizarProductos(array){
    containerProductos.innerHTML = ""

    // for(let i=0; i < array.length; i++){
    //     var productoHTML = generarUIProducto(array[i])
    //     containerProductos.innerHTML += productoHTML
    // }
    
    array.forEach( item => 
        containerProductos.innerHTML += generarUIProducto(item)
    )
    
    // array.map( producto =>
    //     containerProductos.innerHTML +=  generarUIProducto(producto)
    // )
}

renderizarProductos(productosArray)

