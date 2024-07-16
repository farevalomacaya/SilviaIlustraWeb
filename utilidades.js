const limpiar = () => {
    document.querySelector('form').reset()
    document.querySelectorAll('.form-control,.form-select').forEach(item => {
        item.classList.remove('is-invalid')
        item.classList.remove('is-valid')
        document.getElementById('e-' + item.name).innerHTML = ''
    })
    //volver a la normalidad run y btnGuardar
    document.getElementById('run').readOnly = false
    document.getElementById('btnGuardar').value = 'Guardar'
}


const soloNumeros = (event) => {
    const input = document.getElementById('fono');
    const key = event.key;
    const regex = /[0-9]/; // Regex to allow only digits
  
    // Allow backspace even if it's not a digit
    if (key === 'Backspace') {
      return true;
    }
  
    if (!regex.test(key)) {
      event.preventDefault(); // Prevent character from being entered
      return false;
    }
  
    // Check if input value exceeds 9 digits
    if (input.value.length >= 9) {
      event.preventDefault();
      return false;
    }
  
    return true;
  }


const verificar = (id) => {
    //captura el input de cual estamos enviando el id
    const input = document.getElementById(id)
    //captura el div error de cada input 
    const div = document.getElementById('e-' + id)
    input.classList.remove('is-invalid')
    //verifica si el campo esta vacío 
    if (input.value.trim() == '') {
        //classList tiene la propiedad add y remove. add permite añadir un estilo, remove quitarlo
        input.classList.add('is-invalid')
        //innerHTML permite agregar nuevos elementos html desde js
        div.innerHTML = '<span class="badge bg-danger">El campo es obligatorio</span>'
    }
    else {
        input.classList.add('is-valid')
        div.innerHTML = ''
        if (id == 'sueldo') {
            if (input.value < 500000) {
                input.classList.add('is-invalid')
                div.innerHTML = '<span class="badge bg-danger">El sueldo no puede ser inferior a $500.000</span>'
            }
        }
        if (id == 'fechaIngreso') {
            const fecha = new Date(input.value)
            const hoy = new Date()
            if (fecha > hoy) {
                input.classList.add('is-invalid')
                div.innerHTML = '<span class="badge bg-danger">La fecha ingresa es mayor al hoy</span>'
            }
        }
        if (id == 'run') {
            //! verifica que sea false 
            if (!validaRun(input.value) /*|| input.value.length < 9*/) { //length cuenta la cantidad de letras
                input.classList.add('is-invalid')
                div.innerHTML = '<span class="badge bg-danger">El run no es válido</span>'
            }
        }
        if (id == 'mail') {
            if (!valdiaEmail(input.value)) {
                input.classList.add('is-invalid')
                div.innerHTML = '<span class="badge bg-danger">El email no tiene el formato correcto</span>'
            }
        }
    }
}

const valdiaEmail = (mail) => {
    const formato = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
    if (!formato.test(mail))
        return false
    return true
}

const validaRun = (run) => {
    const Fn = {
        // Valida el rut con su cadena completa "XXXXXXXX-X" 17744273-9
        validaRut: function (rutCompleto) {
            rutCompleto = rutCompleto.replace("‐", "-")
            if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(rutCompleto))
                return false
            const tmp = rutCompleto.split('-') //split separa en run en dos antes del guión y despues
            const digv = tmp[1] //dígito verificador
            const rut = tmp[0]//parte númerica
            if (digv == 'K') digv = 'k'

            return (Fn.dv(rut) == digv)
        },
        dv: function (T) {
            let M = 0, S = 1
            for (; T; T = Math.floor(T / 10))
                S = (S + T % 10 * (9 - M++ % 6)) % 11
            return S ? S - 1 : 'k'
        }
    }
    return Fn.validaRut(run)
}


const validaRadio = (name) => {
    
    const radio = document.querySelector('input[name='+name+']:checked')
    const div=document.getElementById('e-'+name)
    const all = document.querySelectorAll('input[name='+name+']')
    //sirve para verificar si hay un elemento seleccionado
    if(!radio){
        div.innerHTML = '<span class="badge bg-danger">Falta seleccionar opción</span>'
        all.forEach(item=>{
            item.classList.add('is-invalid')
        
        })
    }
    else{
        div.innerHTML=""
        all.forEach(item=>{
            item.classList.remove('is-invalid')
            item.classList.add('is-valid')
        })
    }
    const valorRegalo = radio?.value || null
    return valorRegalo
}

// Validar la clave y redirigir a la página de pedidos
formularioClave.addEventListener('submit', (event) => {
    event.preventDefault();
  
    const claveIngresada = document.getElementById('clave').value;
  
    if (claveIngresada === '1761Soto') {
      // Clave correcta, redirigir a la página de pedidos
      window.location.href = '/intranet.html';
    } else {
      // Clave incorrecta, mostrar mensaje de error
      alert('Clave incorrecta. Inténtalo de nuevo.');
    }
  });
  