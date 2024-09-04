//Referenciar a mis componentes de html en Javascript
var containerProductos = document.getElementById("containerProductos")
var containerSubProductos = document.getElementById("containerSubProductos")
var checkBoxMayores50 = document.getElementById("checkBoxMayores50")
var checkBoxProducto90 = document.getElementById("checkBoxProducto90")
var checkBoxEncontrarId10 = document.getElementById("checkBoxEncontrarId10")
var inputBuscarProducto = document.getElementById("inputBuscarProducto")
var productosVacios = document.getElementById("productosVacios")
var textCarrito = document.getElementById("textCarrito")
var tablaCarritoCompras = document.getElementById("tablaCarritoCompras")
var iconCarrito = document.getElementById("iconCarrito")
var isCarritoVisible = false
productosVacios.style.display = "none"

var arrayFilterCheckBox = [checkBoxMayores50, checkBoxProducto90, checkBoxEncontrarId10]
var arrayCarritoCompras = []

iconCarrito.addEventListener("click", () => {
    if (isCarritoVisible == false) {
        isCarritoVisible = true
        tablaCarritoCompras.style.display = "block"

    } else {
        isCarritoVisible = false

        tablaCarritoCompras.style.display = "none"

    }
})
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

inputBuscarProducto.addEventListener('input', () => {
    var entrada = inputBuscarProducto.value

    let arrayProudctoBuscado = buscarProducto(productosArray, entrada)
    if (arrayProudctoBuscado.length > 0) {
        productosVacios.style.display = "none"
        renderizarProductos(arrayProudctoBuscado)
    } else {
        containerProductos.innerHTML = ""
        productosVacios.style.display = "block"
    }
})


function validarFiltrosVacios() {
    let filtrosVacios = arrayFilterCheckBox.filter(item =>
        item.checked === true
    )
    if (filtrosVacios.length === 0) {
        renderizarProductos(productosArray)
    }
}

function generarUISubproducto(producto) {
    return`<tr>
                <td class="p-2">
                    <div class="font-medium w-46 text-gray-800">${producto.title}</div>
                </td>
                <td class="p-2">
                    <div class="text-center w-16">${0}</div>
                </td>
                <td class="p-2">
                    <div class="text-left font-medium text-green-500">S/${producto.price}</div>
                </td>
                <td class="p-2">
                    <div class="flex justify-center">
                        <button>
                            <svg class="h-8 w-8 rounded-full p-1 hover:bg-gray-100 hover:text-blue-600"
                                fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                                </path>
                            </svg>
                        </button>
                    </div>
                </td>
         </tr>`
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
                    <button id-btn-custom="${producto.id}"  class="class-btn-custom  px-3 py-2 w-46 text-xs font-bold text-white uppercase bg-gray-800 rounded">
                        Add to cart
                    </button>
                </div>
            </div>
        </div>`
}

//Renderiza todos los productor que vengan en un array
function renderizarProductos(array) {
    containerProductos.innerHTML = ""
    array.forEach(item =>
        containerProductos.innerHTML += generarUIProducto(item)
    )
}


function renderizarSubproductos(array){
    containerSubProductos.innerHTML = ""
    array.forEach(item=>
        containerSubProductos.innerHTML += generarUISubproducto(item)
    )
}


renderizarProductos(productosArray)


document.addEventListener('click', (event) => {
    //Validamos si el click se hizo a un boton
    if (event.target.classList.contains("class-btn-custom")) {
        const productId = event.target.getAttribute("id-btn-custom")
        var productoSeleccionado = productosArray.find(item => item.id == productId)
        //agrego un elemento a mi array de carrito de compras
        arrayCarritoCompras.push(productoSeleccionado)
        textCarrito.textContent = arrayCarritoCompras.length
        renderizarSubproductos(arrayCarritoCompras)
    }
})


//TODO 1: Realizar el conteo de productos agregados
//TODO 2: Realizar el subtotal de todos los productos del carrito de compra, adicionalmente se realiza un descuento de S/30 
//TODO 3: Filtros para la categoria electronics
//TODO 4: Filtros para la categoria women's clothing
//TODO 5: Eliminar producto del carrito de compras
