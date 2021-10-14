"use strict";
const autoModelInput = document.getElementById("model");
const autoDateInput = document.getElementById("date");
const autoColorInput = document.getElementById("color");
const autoFuelInput = document.getElementById("fuel");
//const autoFuelListInput = document.getElementById("fuelList");
const addButton = document.getElementById("save");
var KuroTipas;
(function (KuroTipas) {
    KuroTipas[KuroTipas["Dyzelis"] = 0] = "Dyzelis";
    KuroTipas[KuroTipas["Benzinas"] = 1] = "Benzinas";
})(KuroTipas || (KuroTipas = {}));
class Car {
    constructor(model, date, color, fuel) {
        this.model = model;
        this.color = color;
        this.date = new Date(date);
        this.fuel = +fuel;
    }
}
const autoParkas = [];
addButton === null || addButton === void 0 ? void 0 : addButton.addEventListener('click', () => {
    const car = new Car(autoModelInput.value, autoDateInput.value, autoColorInput.value, autoFuelInput.value);
    console.log('Mygtukas paspaustas!');
});
