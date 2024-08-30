//Referenciar a mis componentes de html en Javascript
var containerProductos = document.getElementById("containerProductos")

var checkBoxMayores50 = document.getElementById("checkBoxMayores50")
var checkBoxProducto90 = document.getElementById("checkBoxProducto90")
var checkBoxEncontrarId10 = document.getElementById("checkBoxEncontrarId10")
var inputBuscarProducto = document.getElementById("inputBuscarProducto")
var productosVacios =  document.getElementById("productosVacios")
productosVacios.style.display = "none"

var arrayFilterCheckBox = [checkBoxMayores50,checkBoxProducto90,checkBoxEncontrarId10]

//Usar el evento change para detectar un cambio en el checkBox
checkBoxMayores50.addEventListener('change', function () {
    if (checkBoxMayores50.checked) {
        let arrayMayores50 = filtrarArrayMayores50Algoritmo(productosArray)
        renderizarProductos(arrayMayores50)
    } else {
        validarFiltrosVacios()
    }
})

checkBoxProducto90.addEventListener('change', () => {
    if (checkBoxProducto90.checked) {
        let arrayProducto90 = filtrarProducto90(productosArray)
        renderizarProductos(arrayProducto90)
    } else {
        validarFiltrosVacios()
    }
})

checkBoxEncontrarId10.addEventListener('change', () => {
    if (checkBoxEncontrarId10.checked) {
        let arrayProductoId10 = encontrarProductoId10(productosArray)
        renderizarProductos(arrayProductoId10)
    } else {
        validarFiltrosVacios()
    }
})

inputBuscarProducto.addEventListener('input', ()=>{
    var entrada = inputBuscarProducto.value
 
    let arrayProudctoBuscado = buscarProducto(productosArray,entrada)
    if(arrayProudctoBuscado.length > 0){
        productosVacios.style.display = "none"
        renderizarProductos(arrayProudctoBuscado)
    }else{
        containerProductos.innerHTML = ""
        productosVacios.style.display = "block"
    }
})


function validarFiltrosVacios(){
    let filtrosVacios = arrayFilterCheckBox.filter( item=>
        item.checked === true
    )
    if(filtrosVacios.length === 0){
        renderizarProductos(productosArray)
    }
}

//Genera un string con html dinamico
function generarUIProducto(producto) {
    return `<div class="flex max-w-md overflow-hidden bg-white rounded-lg shadow-lg">
            <div class="flex flex-col justify-evenly">
                <div class="flex m-2 h-8 justify-start">
                    <span class="w-24 bg-teal-700 mt-2 text-white rounded-full h-6 px-3 text-sm ">
                        ${producto.category}
                    </span>
                </div>
                <img style="width: 100px; height: 80px" class=" bg-cover m-6 object-contain h-46 bg-landscape"
                    src=${producto.image} />
                <h1 class="text-2xl m-4 font-bold text-gray-700">
                    S/${producto.price}
                </h1>

            </div>

            <div class="w-2/3 p-4 flex flex-col justify-between">
                <div>
                    <h1 class="text-2xl line-clamp-1 font-bold text-gray-900">
                        ${producto.title}
                    </h1>
                    <p class="mt-2 line-clamp-3 text-sm text-gray-600">
                        ${producto.description}
                    </p>

                </div>
                <div class="flex justify-end me-2">

                    <button class="px-3 py-2 w-46 text-xs font-bold text-white uppercase bg-gray-800 rounded">
                        Add to cart
                    </button>

                </div>
            </div>
        </div>`
}

//Renderiza todos los productor que vengan en un array
function renderizarProductos(array) {
    containerProductos.innerHTML = ""

    // for(let i=0; i < array.length; i++){
    //     var productoHTML = generarUIProducto(array[i])
    //     containerProductos.innerHTML += productoHTML
    // }

    array.forEach(item =>
        containerProductos.innerHTML += generarUIProducto(item)
    )

    // array.map( producto =>
    //     containerProductos.innerHTML +=  generarUIProducto(producto)
    // )
}

renderizarProductos(productosArray)

