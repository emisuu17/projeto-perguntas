export class FormController {
  constructor(form, input, message, app) {
    this.form = form;
    this.input = input;
    this.message = message;
    this.app = app;

    this.form.addEventListener("submit", (event) => {
      this.handleSubmit(event, false);
    });
  }

  handleSubmit(event, ordered = false) {
    if (event) event.preventDefault();

    const value = Number(this.input.value);

    if (this.input.value === "" || Number.isNaN(value)) {
      this.showMessage("Informe um valor numérico.");
      return;
    }

    const square = ordered
      ? this.app.addValueOrdered(value)
      : this.app.addValue(value);

    if (!square) {
      this.showMessage("O array está cheio.");
      return;
    }

    const index = this.app.array.items.indexOf(square);
    this.showMessage(`Valor ${value} inserido no índice ${index}.`);

    this.input.value = "";
    this.input.focus();
  }

  showMessage(text) {
    this.message.textContent = text;
  }
}
