import { Mark } from "./Mark"

export class Damage extends Mark {
   constructor(cell) {
      super(cell)
      this.logo = 'X'
      this.name = 'damage'
      // отображение поврежденного корабля красням
      this.color = 'red'
   }
}