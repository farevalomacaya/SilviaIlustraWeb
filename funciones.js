import { edit, getData, remove, save, selectOne } from "./firestore.js"
//variable que contiene el id
let id = 0
document.getElementById('btnGuardar').addEventListener('click', () => {
    document.querySelectorAll('.form-control,.form-select').forEach(item => {
        verificar(item.id)
    })
    //verificar si existen estilos en rojo (is-invalid)
    if(document.querySelectorAll('.is-invalid').length == 0) {
        const registro = {
            nom: document.getElementById('nombre').value.trim(),
            ape: document.getElementById('apellido').value.trim(),
            run: document.getElementById('run').value,
            fon: document.getElementById('fono').value,
            mai: document.getElementById('mail').value,
            prod: document.getElementById('producto').value,
            detal: document.getElementById('detalles').value,
            fech: document.getElementById('fecha').value,
        }
        if (document.getElementById('btnGuardar').value == 'Guardar') {
            save(registro)
        }
        else {
            edit(id, registro)
            id = 0

        }
        limpiar()
    }
})




//DOMContentLoaded es un evento que se activa al recargar la página
window.addEventListener('DOMContentLoaded', () => {
    getData((datos) => {
        let tabla = ''
        datos.forEach((doc) => {
            //Data trae todos los valores de los documentos de la base de datos
            const item = doc.data()
            tabla += `<tr>
            <td>${item.nom}</td>
            <td>${item.ape}</td>
            <td>${item.run}</td>
            <td>${item.fon}</td>
            <td>${item.mai}</td>
            <td>${item.prod}</td>
            <td>${item.detal}</td>
            <td>${item.fech}</td>
            <td nowrap>
                <button class="btn btn-warning" id="${doc.id}">Editar</button>
                <button class="btn btn-danger" id="${doc.id}">Eliminar</button>
            </td>
        </tr>`
        })
        document.getElementById('contenido').innerHTML = tabla
        //recorrer todos los botones eliminar
        document.querySelectorAll('.btn-danger').forEach(btn => {
            //verificar en que boton se hizo click
            btn.addEventListener('click', () => {
                Swal.fire({
                    title: "Está seguro de borrar el registro?",
                    text: "No hay vuelta atrás!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    cancelButtonText: "Cancelar",
                    confirmButtonText: "Si! Borrar el registro!"
                }).then((result) => {
                    if (result.isConfirmed) {
                        
                        //invocamos la funcion que permite eliminar el documento, enviando el id
                        remove(btn.id)
                    }
                });

            })
        })
        document.querySelectorAll('.btn-warning').forEach(btn => {
            //async y await permite esperar una respuesta de la funcion para continuar con el codigo
            btn.addEventListener('click', async () => {
                //ejecutamos la consulta que retorna el documento apsando el id como parametro
                const pedido = await selectOne(btn.id)
                //capturamos los valores del documento
                const e = pedido.data()
                //pasar valores a los inputs

                document.getElementById('nombre').value = e.nom
                document.getElementById('apellido').value = e.ape
                document.getElementById('run').value = e.run
                document.getElementById('fono').value = e.fon
                document.getElementById('mail').value = e.mai
                document.getElementById('producto').value = e.prod
                document.getElementById('detalles').value = e.detal
                document.getElementById('fecha').value = e.fech
                //cambiar el boton a editar

                document.getElementById('btnGuardar').value = 'Editar'
                //solo lectura al run
                document.getElementById('run').readOnly = true
                //asignar id del documento
                id = pedido.id
            })
        })
    })
})


