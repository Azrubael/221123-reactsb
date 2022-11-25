import { Mark } from "./Mark"

// класс для отображения промаха
export class Miss extends Mark {
  constructor(cell) {
    super(cell)
    this.logo = null
    this.name = 'miss'
    // точка, отмечающая промах, будет синего цвета
    this.color = 'blue'
  }


}