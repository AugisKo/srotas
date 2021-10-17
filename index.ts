const autoModelInput = document.getElementById('model') as HTMLInputElement;
const autoDateInput = document.getElementById('date') as HTMLInputElement;
const autoColorInput = document.getElementById('color') as HTMLInputElement;
const autoFuelInput = document.getElementById('fuel') as HTMLSelectElement;

const addButton = document.getElementById('save') as HTMLInputElement;
const carList = document.getElementById('list') as HTMLInputElement;

const addCarForm = document.getElementById('add_car') as HTMLElement;
const updateCarForm = document.getElementById('update_car') as HTMLElement;

const modelUpdateInput = document.getElementById(
  'updateModel'
) as HTMLInputElement;
const dateUpdateInput = document.getElementById(
  'updateDate'
) as HTMLInputElement;
const colorUpdateInput = document.getElementById(
  'updatecolor'
) as HTMLInputElement;
const fuelUpdateInput = document.getElementById(
  'updateFuel'
) as HTMLInputElement;

let updateCar: Car; //Atnaujinamo automobilio objektas

enum KuroTipas {
  Dyzelinas,
  Benzinas,
  Elektra,
}

class Car {
  public model: string;
  public date: Date;
  public color: string;
  public fuel: KuroTipas;
  public id: number;

  constructor(model: string, date: string, color: string, fuel: string) {
    (this.model = model),
      (this.color = color),
      (this.date = new Date(date)),
      (this.fuel = +fuel),
      (this.id = Math.round(Math.random() * 1000));
  }
  public printCar(element: HTMLElement) {
    element.innerHTML += `<div class="entry">
            <div class="entry_parameter">${this.model}</div>
            <div class="entry_parameter">${this.date}</div>
            <div class="entry_parameter">${this.color}</div>
            <div class="entry_parameter>${KuroTipas[this.fuel]}</div>
            <div class="actions">
                <img class="edit" onclick="onUpdateCar(${
                  this.id
                })" src="./img/edit.png">
                <img class="delete" onclick="onDeleteCar(${
                  this.id
                })" src="./img/delete.png">
            </div>
         </div>`;
  }
}

const autoParkas: Car[] = [];

addButton?.addEventListener('click', (e) => {
  if (
    autoModelInput.value === '' ||
    autoDateInput.value === '' ||
    autoColorInput.value === '' ||
    autoFuelInput.value === ''
  ) {
    alert('Nepakanka duomenų!!!');
    return;
  }

  const car = new Car(
    autoModelInput.value,
    autoDateInput.value,
    autoColorInput.value,
    autoFuelInput.value
  );
  console.log('Mygtukas paspaustas!');

  autoParkas.push(car);

  publishCars();

  autoModelInput.value = '';
  autoDateInput.value = '';
  autoColorInput.value = '';
  autoFuelInput.value = '';
});

function publishCars(filter?: KuroTipas) {
  carList.innerHTML = '';
  for (const car of autoParkas) {
    if (filter === undefined || filter === car.fuel) {
      car.printCar(carList);
      console.log(car.model);
    }
  }
}

function onUpdateCar(id: number): void {
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

function onDeleteCar(id: number): void {
  let deleteCar: Car | undefined; // = autoParkas[0];
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
