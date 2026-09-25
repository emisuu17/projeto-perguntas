import { Square } from "./square.js";

export class ArrayContainer {
  constructor(x, y, capacity, cellSize, padding) {
    this.x = x;
    this.y = y;
    this.capacity = capacity;
    this.cellSize = cellSize;
    this.padding = padding;
    this.items = [];
    this.width = capacity * (cellSize + padding) + padding;
    this.height = cellSize + padding * 2;
  }

  get isFull() {
    return this.items.length >= this.capacity;
  }

  slotPosition(index) {
    return {
      x: this.x + this.padding + index * (this.cellSize + this.padding),
      y: this.y + this.padding,
    };
  }

  add(value, startX, startY) {
    if (this.isFull) return null;

    const target = this.slotPosition(this.items.length);
    const square = new Square(
      value,
      this.cellSize,
      startX,
      startY,
      target.x,
      target.y,
    );
    this.items.push(square);
    return square;
  }

  sortItems() {
    this.items.sort((a, b) => a.value - b.value);

    this.items.forEach((item, index) => {
      const { x, y } = this.slotPosition(index);
      item.startX = item.x;
      item.startY = item.y;
      item.targetX = x;
      item.targetY = y;
      item.progress = 0;
    });
  }

  update(deltaTime) {
    this.items.forEach((item) => item.update(deltaTime));
  }

  draw(ctx) {
    ctx.strokeStyle = "#374151";
    ctx.lineWidth = 3;
    ctx.strokeRect(this.x, this.y, this.width, this.height);

    // Desenha celulas e indices apenas para as posicoes ocupadas.
    for (const [index] of this.items.entries()) {
      const { x, y } = this.slotPosition(index);
      ctx.setLineDash([4, 4]);
      ctx.strokeStyle = "#9ca3af";
      ctx.lineWidth = 1;
      ctx.strokeRect(x, y, this.cellSize, this.cellSize);
      ctx.setLineDash([]);

      ctx.fillStyle = "#374151";
      ctx.font = "14px monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      ctx.fillText(
        `[${index}]`,
        x + this.cellSize / 2,
        this.y + this.height + 9,
      );
    }

    this.items.forEach((item) => item.draw(ctx));
  }
}
