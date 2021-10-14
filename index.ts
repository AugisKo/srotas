const autoModelInput = document.getElementById("model") as HTMLInputElement;
const autoDateInput = document.getElementById("date") as HTMLInputElement;
const autoColorInput = document.getElementById("color") as HTMLInputElement;
const autoFuelInput = document.getElementById("fuel") as HTMLSelectElement;
//const autoFuelListInput = document.getElementById("fuelList");
const addButton = document.getElementById("save") as HTMLInputElement;

enum KuroTipas {
    Dyzelis,
    Benzinas,
}

class Car {
    public readonly model: string;
    public readonly date: Date;
    public readonly color: string;
    public readonly fuel: KuroTipas;

    constructor(model: string, date: string, color: string, fuel: string) {
        this.model = model;
        this.color = color;
        this.date = new Date(date);
        this.fuel = +fuel;
    }
}

const autoParkas: Car[] = [];

addButton?.addEventListener('click', () => {
    const car = new Car(autoModelInput.value,
        autoDateInput.value,
        autoColorInput.value,
        autoFuelInput.value);
    console.log('Mygtukas paspaustas!');
});




