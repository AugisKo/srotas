const autoModelInput = document.getElementById('model');
const autoDateInput = document.getElementById('date');
const autoColorInput = document.getElementById('color');
const autoFuelInput = document.getElementById('fuel');
const addButton = document.getElementById('save');
const carList = document.getElementById('list');
const addCarForm = document.getElementById('add_car');
const updateCarForm = document.getElementById('update_car');
const modelUpdateInput = document.getElementById('updateModel');
const dateUpdateInput = document.getElementById('updateDate');
const colorUpdateInput = document.getElementById('updatecolor');
const fuelUpdateInput = document.getElementById('updateFuel');
let updateCar; //Atnaujinamo automobilio objektas
var KuroTipas;
(function (KuroTipas) {
    KuroTipas[KuroTipas["Dyzelinas"] = 0] = "Dyzelinas";
    KuroTipas[KuroTipas["Benzinas"] = 1] = "Benzinas";
    KuroTipas[KuroTipas["Elektra"] = 2] = "Elektra";
})(KuroTipas || (KuroTipas = {}));
class Car {
    constructor(model, date, color, fuel) {
        (this.model = model),
            (this.color = color),
            (this.date = new Date(date)),
            (this.fuel = +fuel),
            (this.id = Math.round(Math.random() * 1000));
    }
    printCar(element) {
        element.innerHTML += `<div class="entry">
            <div class="entry_parameter">${this.model}</div>
            <div class="entry_parameter">${this.date}</div>
            <div class="entry_parameter">${this.color}</div>
            <div class="entry_parameter>${KuroTipas[this.fuel]}</div>
            <div class="actions">
                <img class="edit" onclick="onUpdateCar(${this.id})" src="./img/edit.png">
                <img class="delete" onclick="onDeleteCar(${this.id})" src="./img/delete.png">
            </div>
         </div>`;
    }
}
const autoParkas = [];
addButton === null || addButton === void 0 ? void 0 : addButton.addEventListener('click', (e) => {
    if (autoModelInput.value === '' ||
        autoDateInput.value === '' ||
        autoColorInput.value === '' ||
        autoFuelInput.value === '') {
        alert('Nepakanka duomenų!!!');
        return;
    }
    const car = new Car(autoModelInput.value, autoDateInput.value, autoColorInput.value, autoFuelInput.value);
    console.log('Mygtukas paspaustas!');
    autoParkas.push(car);
    publishCars();
    autoModelInput.value = '';
    autoDateInput.value = '';
    autoColorInput.value = '';
    autoFuelInput.value = '';
});
function publishCars(filter) {
    carList.innerHTML = '';
    for (const car of autoParkas) {
        if (filter === undefined || filter === car.fuel) {
            car.printCar(carList);
            console.log(car.model);
        }
    }
}
function onUpdateCar(id) {
    for (const car of autoParkas) {
        if (id === car.id) {
            updateCar = car;
        }
    }
    console.log(updateCar);
    populateUpdateForm();
    addCarForm.classList.add('hide');
    updateCarForm.classList.remove('hide');
}
function populateUpdateForm() {
    modelUpdateInput.value = updateCar.model;
    dateUpdateInput.value = updateCar.date.toISOString().slice(0, 10);
    colorUpdateInput.value = updateCar.color;
    fuelUpdateInput.value = updateCar.fuel.toString();
}
function onSave() {
    updateCar.model = modelUpdateInput.value;
    updateCar.date = new Date(dateUpdateInput.value);
    updateCar.color = colorUpdateInput.value;
    updateCar.fuel = +fuelUpdateInput.value;
    addCarForm.classList.remove('hide');
    updateCarForm.classList.add('hide');
    publishCars();
}
function onDeleteCar(id) {
    let deleteCar; // = autoParkas[0];
    for (const car of autoParkas) {
        if (id === car.id) {
            deleteCar = car;
        }
    }
    if (deleteCar) {
        autoParkas.splice(autoParkas.indexOf(deleteCar), 1);
    }
    publishCars();
}
function dyzelCarList() {
    publishCars(KuroTipas.Dyzelinas);
}
function benzCarList() {
    publishCars(KuroTipas.Benzinas);
}
function elektrCarList() {
    publishCars(KuroTipas.Benzinas);
}
function allCarList() {
    publishCars();
}
/*


const UI = {
  autoModelInput: document.getElementById('model') as HTMLInputElement,
  autoDatelInput: document.getElementById('date') as HTMLInputElement,
  autoColorInput: document.getElementById('color') as HTMLInputElement,
  autoFuelInput: document.getElementById('fuel') as HTMLInputElement,

  addButton: document.getElementById('addbutton'),

  allCars: document.querySelector('.list') as HTMLDivElement,
};

//kuro tipų apsirašymas
enum FuelType {
  Dyzelinas = 'Dyzelinas',
  Benzinas = 'Benzinas',
  Elektra = 'Elektra',
}

// automobilių sąrašo formavimas

class CarList {
  //ad cars to list
  addCar(car: Car): void {
    cars.push(car);
  }

  whatIsThisFuel(fuel: string): FuelType {
    let thisFuel: FuelType = FuelType.Dyzelinas;

    if (fuel === '0') {
      thisFuel = FuelType.Dyzelinas;
    }

    if (fuel === '1') {
      thisFuel = FuelType.Benzinas;
    }

    if (fuel === '2') {
      thisFuel = FuelType.Elektra;
    }
    return thisFuel;
  }
}

// sukuriam automobilių objektą
class Car {
  public readonly model: string;
  public readonly color: string;
  public readonly fuel: FuelType;
  public readonly date: Date;

  constructor(model: string, color: string, fuel: FuelType, date: Date) {
    (this.model = model),
      (this.color = color),
      (this.date = date),
      (this.fuel = fuel);
    /* (this.fuel = fuel as FuelType), //enum tipa paverciame i stringa
    (this.date = new Date(date)); //Date tipa vercia i stringa
  }
  public printCarToHTML(element?: HTMLElement): void {
    const dateFull = formatDate(JSON.stringify(this.date.toString()));
    const dateNoTime = dateFull.split(',')[0];
    console.log(dateNoTime);

    if (element) {
      element.innerHTML += `
            <div class="card">
                <div class="controls">
                    <img class="icon edit" src="https://cdn-icons-png.flaticon.com/512/4277/4277132.png">
                    <img class="icon delete" src="https://cdn-icons-png.flaticon.com/512/1617/1617543.png">
                </div>
                <div class="details">
                    <div>${this.model}</div>
                    <div>${dateNoTime}</div>
                    <div>${this.color}</div>
                    <div>${this.fuel}</div>
                </div>
            </div>`;
    }
  }
}

/*HELPERS FUNCTIONS
function formatDate(date: string): string {
  const d = new Date(date);
  const dateformat = [d.getFullYear(), d.getMonth() + 1, d.getDate()].join('-');
  return dateformat;
}

//render HTML from Array of objects
function display(): void {
  UI.allCars.innerHTML = '';
  for (const car of cars) {
    car.printCarToHTML(UI.allCars);
    console.log('***show data***');
  }
}
const CARS_LOCAL_STORAGE_KEY = 'Cars';
// išsaugomi duomenys į LocalStorage
function saveCar(): void {
  const carsString = JSON.stringify(cars);

  window.localStorage.setItem('CARS_LOCAL_STORAGE_KEY', carsString);
}

// naujo automobilių sąrašo sukurimas
const autoParduotuve = new CarList();
const cars: Car[] = [];

UI.addButton?.addEventListener('click', () => {
  const model = UI.autoModelInput?.value;
  const color = UI.autoColorInput?.value;
  const fuel = UI.autoFuelInput?.value;
  const date = UI.autoDatelInput?.value;

  const thisFuel = autoParduotuve.whatIsThisFuel(fuel);

  // pridedam automobilį į sąrašą
  const car = new Car(model, color, thisFuel, new Date(date));
  autoParduotuve.addCar(car);

  console.log(cars);

  car.printCarToHTML(UI.allCars);

  //įkeliam sukurtus automobilius į LocalStorage
  saveCar();
});
*/
