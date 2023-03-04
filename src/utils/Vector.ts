export class Vector {
  constructor(public x: number, public y: number) {}

  static from({ x, y }: { x: number; y: number }) {
    return new Vector(x, y);
  }

  add(base: Vector) {
    return new Vector(this.x + base.x, this.y + base.y);
  }

  sub(base: Vector) {
    return new Vector(this.x - base.x, this.y - base.y);
  }

  mul(a: number) {
    return new Vector(this.x * a, this.y * a);
  }

  div(a: number) {
    return new Vector(this.x / a, this.y / a);
  }
}
