export function validar(input) {
    const tipoDeInput = input.dataset.attribute;
    if(validadores[tipoDeInput]) {
        validadores[tipoDeInput](input)
    }

    //Si el campo del formulario cumple con los requerimentos se remueve la clase que muestra el error, de lo contrario la clase se agrega
    if (input.validity.valid) {
        input.parentElement.classList.remove("input-container--invalid");
        input.parentELement.querySelector(".input-message-error").innerHTML = ""
    } else {
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInput, input);
    }
}

const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",
]

const mensajesDeError = {
    nombre: {
        valueMissing: "El campo nombre no puede estar vacio"
    },
    email: {
        valueMissing: "El campo correo no puede estar vacio",
        typeMismatch: "El correo no es valido"
    },
    password: {
        valueMissing: "El campo contraseña no puede estar vacio",
        patternMismatch: "Al menos 6 caracteres, maximo 12, debe contener una letra minúscula, una letra mayúscula, un número y no puede contener caracteres epeciales"
    },
    nacimiento: {
        valueMissing: "Este campo no puede estar vacio",
        customError: "Debes tener al menos 18 años de edad"
    },
    numero: {
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "El formato requerido es xxx xxx xxxx (10 numeros)",
    },
    direccion: {
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "La dirección debe contener entre 10 a 40 caracteres",
    },
    ciudad: {
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "La ciudad debe contener entre 10 a 40 caracteres",
    },
    provincia: {
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "La provincia debe contener entre 10 a 40 caracteres",
    },
}

const validadores = {
    nacimiento: (input) => validarNacimiento(input),
};

function mostrarMensajeDeError (tipoDeInput, input) {
    let mensaje = "";
    tipoDeErrores.forEach( error => {
        if (input.validity[error]) {
            mensaje = mensajesDeError[tipoDeInput][error];
        }
    })
    return mensaje;
}

function validarNacimiento(input) {
    const fechaUsuario = input.value;
    let mensaje = "";
    if (!mayorDeEdad(fechaUsuario)) {
        mensaje = "Debes tener al menos 18 años de edad";
    };

    //Vamos a usar una función del input setCustomValidity() para definir un mensaje de error customizado
    input.setCustomValidity(mensaje);
}

function mayorDeEdad(fecha) {
    //Implementación de la lógica para determinar si una persona es mayor de edad
    const fechaActual = new Date();
    const diferenciaFechas = new Date(
        fecha.getUTCFullYear() + 18, 
        fecha.getUTCMonth(), 
        fecha.getUTCDate()
    );
    return diferenciaFechas < fechaActual;
}