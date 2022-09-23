class App {
  constructor() {
    this.loadButton = document.getElementById("cari-btn");
    this.clearButton = document.getElementById("hapus-btn");
    this.filterByTanggal = document.getElementById("input-tanggal");
    this.filterByWaktu = document.getElementById("input-waktu");
    this.filterByPenumpang = document.getElementById("input-penumpang");
    this.carContainerElement = document.getElementById("cars-container");
  }

  async init() {
    await this.load();


    this.loadButton.onclick = this.run;
    this.clearButton.onclick = this.clear;
  }

  run = () => {
    this.clear();
    const dateValue = this.filterByTanggal.value;
    const timevalue = this.filterByWaktu.value;
    const capacityValue = this.filterByPenumpang.value;

    const newDateTime = new Date(`${dateValue} ${timevalue}`);
    const epochTime = newDateTime.getTime();

    this.load(epochTime, capacityValue);
  };

  async load(dateFilter, capacityFilter) {
    const cars = await Binar.listCars(
      (item) =>
        item.available === true &&
        item.capacity >= capacityFilter &&
        item.availableAt >= dateFilter
    );
    Car.init(cars);
    console.log("car", cars);
    Car.list.forEach((car) => {
      const node = document.createElement("div");
      node.className = "col-4";
      node.innerHTML = car.render();
      this.carContainerElement.appendChild(node);
    });
  }

  clear = () => {
    let child = this.carContainerElement.firstElementChild;

    while (child) {
      child.remove();
      child = this.carContainerElement.firstElementChild;
    }
  };
}
