import { Mark } from "./Mark"

export class Ship extends Mark {
   constructor(cell) {
      // "super" - метод наследования класса "Mark"
      super(cell)
      this.logo = null
      this.name = 'ship'
      // корабли на доске рисуются серым цветом
      this.color = 'grey'
   }
}