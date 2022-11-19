function Technique () {
  this.switcher = false
}

Technique.prototype.turnOn = function () {
  this.switcher = true
  const status = `${this.type} включен (on)`
  console.log(status);
}

Technique.prototype.turnOff = function () {
  this.switcher = false
  const status = `${this.type} выключен (off)`
  console.log(status);
}

Technique.prototype.getInfo = function () {
  console.log(`Тип - ${this.type} | Потребление энергии ${this.power} ватт | Вес ${this.weight}кг`);
}

function Notebook (power, weight) {
  this.type = 'Ноутбук'
  this.power = power
  this.weight = weight
  this.battery = 100
  this.timerId = 0
}
Notebook.prototype = new Technique()

Notebook.prototype.turnOn = function () {
  if (this.battery === 0) {
    console.log('Батарея разряжена');
    this.switcher = false
    const status = `${this.type} выключен (off)`
    console.log(status);
    return
  }

  this.switcher = true
  const status = `${this.type} включен (on)`
  console.log(status);

  const count = () => {
    if (this.battery === 0) {
      console.log('Батарея разряжена');
      this.switcher = false
      const status = `${this.type} выключен (off)`
      console.log(status);
      return
    }
    console.log(`Текущий заряд ${this.battery}%`);

    this.battery -= 5
    this.timerId = setTimeout(() => {count()}, 1000)
  }
  count()
}

Notebook.prototype.turnOff = function () {
  this.switcher = false
  const status = `${this.type} выключен (off)`
  console.log(status);
  clearTimeout(this.timerId)
}


function Iron (power, weight, waterTank) {
  this.type = 'Утюг'
  this.power = power
  this.weight = weight
  this.waterTank = waterTank
}
Iron.prototype = new Technique()

Iron.prototype.getInfo = function () {
  console.log(`Тип - ${this.type} | Потребление энергии (мощность) ${this.power} ватт | Вес ${this.weight}кг | Резервуар воды ${this.waterTank}мл`);
}

Iron.prototype.spray = function () {
  if (this.waterTank === 0) {
    console.log('Резервуар воды пуст');
    return
  }

  this.waterTank -= 5
  console.log(`*ПШЫК* Количество воды ${this.waterTank}мл`);
}




const notebook = new Notebook(1000, 1)
const iron = new Iron(3200, 1.2, 50)

notebook.getInfo()
iron.getInfo()
iron.spray()