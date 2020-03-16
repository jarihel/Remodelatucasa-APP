let btn = document.querySelector('#btn');
let app = document.querySelector('#app');
let i;
let resultado;
app.innerHTML = '';
let dir = "http://localhost:8181/resultado.json"

window.onload = traerdatos2();

function traerdatos2() {
    
    fetch(dir)
        .then(respuesta => respuesta.json())
        .then(arbol => {
            procesar(arbol);
        });
}

// validar hijos
function getpath(parent, json) {
    // recorremos el json
    for (let x in json.children) {
        //si el padre es igual al hijo del json
        if (json.children[x].path === parent) {
            // retornamos los hijos de los hijos
            return json.children[x];
        }
    }
    return false;
}
//esta es una funcion para procesar el json en la tabla
function procesar(arbol) {
    app.innerHTML = "";
    console.log('Json actual');
    console.log(arbol);
    
    i = arbol.name;
    //window.location.hash = i;


    arbol.children.forEach(item => {
        //recontruyo la tabla
        
        if (item.type === 'file') {
            app.innerHTML += `
                    <tr>
                    <th><a  id="path" href="${item.path}" dowload="${item.name}"  data-path="">${item.name}</a></td>
                    <th><a id="" href="#">${Math.round((item.size) / 1024)} KB</a></td>
                    <th><a id="" href="#">${item.type}</a></td>
                    </tr>`;
        }else{
            app.innerHTML += `
                    <tr>
                    <th><a  id="path" href="#" data-path="${item.path}">${item.name}</a></td>
                    <th><a id="" href="#">${Math.round((item.size) / 1024)} KB</a></td>
                    <th><a id="" href="#">${item.type}</a></td>
                    </tr>`;
        }
    });
    // seleccionamos los tr th a con id path
    // y hacemos un loop
    for (x of document.querySelectorAll('tr th a[id="path"]')) {
        // agregamos un evento click a cada a
        console.log(x);
        x.addEventListener('click', (e) => {
            
            // verificamos que tenga hijos
            //window.location.hash = e.target.dataset.path;
            console.log(e.target.dataset.path);
            let childrens = getpath(e.target.dataset.path, arbol);
            // si tiene hijos
            if (childrens) {
                // llamamos a procesar con la data de los hijos
                procesar(childrens);
            }
        });
    }
}














