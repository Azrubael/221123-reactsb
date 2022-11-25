export class Mark {
   constructor(cell) {
      this.cell = cell
      this.cell.mark = this
      this.logo = null
      this.color = null
      this.id = Math.random()
      // "name" может быть 'ship', 'damage' или 'miss'
      this.name = ''
   }
}