class Technique {
  constructor(power, weight) {
    this.power = power
    this.weight = weight
    this.switcher = false
  }

  turnOn () {
    this.switcher = true
    const status = `${this.type} включен (on)`
    console.log(status);
  }

  turnOff () {
    this.switcher = false
    const status = `${this.type} выключен (off)`
    console.log(status);
  }

  getInfo () {
    console.log(`Тип - ${this.type} | Потребление энергии ${this.power} ватт | Вес ${this.weight}кг`);
  }
}

class Notebook extends Technique {
  timerId = 0
  constructor(power, weight) {
    super(power, weight)
    this.type = 'Ноутбук'
    this.battery = 50
  }

  turnOn () {
    if (this.battery === 0) {
      console.log('Батарея разряжена');
      super.turnOff()
      return
    }
    super.turnOn()
    const count = () => {
      if (this.battery === 0) {
        console.log('Батарея разряжена');
        super.turnOff()
        return
      }
      console.log(`Текущий заряд ${this.battery}%`);

      this.battery -= 5
      this.timerId = setTimeout(() => {count()}, 1000)
    }
    count()
  }

  turnOff () {
    super.turnOff()
    clearTimeout(this.timerId)
  }

  rechargeOn () {
    if (this.battery === 100) {
      console.log('Батарея заряжена 100%');
      return
    }

    const charge = () => {
      if (this.battery === 100) {
        console.log('Батарея заряжена 100%');
        return
      }
      console.log(`Зарядка: ${this.battery}%`);

      this.battery += 10
      this.timerId = setTimeout(() => {charge()}, 1000)
    }
    charge()
  }

  rechargeOff () {
    clearTimeout(this.timerId)
  }
}

class Iron extends Technique {
  constructor(waterTank, power, weight) {
    super(power, weight)
    this.type = 'Утюг'
    this.waterTank = waterTank
  }

  getInfo () {
    console.log(`Тип - ${this.type} | Потребление энергии (мощность) ${this.power} ватт | Вес ${this.weight}кг | Резервуар воды ${this.waterTank}мл`);
  }

  spray () {
    if (this.waterTank === 0) {
      console.log('Резервуар воды пуст');
      return
    }

    this.waterTank -= 5
    console.log(`*ПШЫК* Количество воды ${this.waterTank}мл`);
  }
}

const notebook = new Notebook(900, 1.2)
const iron = new Iron(50, 3200, 1)

notebook.getInfo()
iron.getInfo()