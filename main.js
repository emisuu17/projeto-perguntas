import { CanvasApp } from "./canvas-app.js";
import { FormController } from "./form-controller.js";

const app = new CanvasApp(document.getElementById("canvas"));

new FormController(
  document.getElementById("form-valor"),
  document.getElementById("input-valor"),
  document.getElementById("mensagem"),
  app,
);

document.getElementById("btn-ordenar").addEventListener("click", () => {
  app.array.sortItems();
  document.getElementById("mensagem").textContent =
    "Array ordenado em ordem crescente.";
});
