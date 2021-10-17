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
