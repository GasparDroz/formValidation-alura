import { validar } from "./validaciones.js";

const inputs = document.querySelectorAll("input");

inputs.forEach( input => {
    //Ponemos un addEventListener("blur")  ya que queremos que la accion ocurre cuando se quite el foco del elemento
    input.addEventListener("blur", (input) => {
        validar(input.target);
    });
})