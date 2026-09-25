import { CanvasApp } from "./canvas-app.js";
import { FormController } from "./form-controller.js";

const app = new CanvasApp(document.getElementById("canvas"));

const formController = new FormController(
  document.getElementById("form-valor"),
  document.getElementById("input-valor"),
  document.getElementById("mensagem"),
  app,
);


document
  .getElementById("btn-inserir-ordenado")
  .addEventListener("click", () => {
    formController.handleSubmit(null, true);
  });


document.getElementById("btn-ordenar-array").addEventListener("click", () => {
  app.array.sortItems();
  document.getElementById("mensagem").textContent =
    "Elementos ordenados em ordem crescente.";
});
