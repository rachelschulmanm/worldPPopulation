let btn = document.querySelector(".btn");
let countries = document.querySelector(".countries");
// let btnOfCountry = document.createElement("button");
const ctx = document.getElementById("myChart");
let myLineChart;
let chartExis = false;
let newArray = [];
let population = [];
document.addEventListener("click", country);
async function country(event) {
  newArray = [];
  population = [];
  if (event.target.className === "btn") {
    try {
      const res = await fetch(
        `https://restcountries.com/v3.1/region/${event.target.value}`
      );
      if (!res.ok) throw new Error("error");
      const data = await res.json();
      console.log(data);
      countries.innerHTML = "";

      data.forEach((element) => {
        newArray.push(element.name.common);
        population.push(element.population);

        let btnOfCountry = document.createElement("button");
        btnOfCountry.innerText = `${element.name.common}`;
        countries.appendChild(btnOfCountry);
      });
      console.log(newArray);
    } catch (err) {
      console.error(err);
    }
  }

  await createChart();
}

async function createChart() {
  if (chartExis === true) {
    myLineChart.destroy();
  }
  chartExis = true;

  myLineChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: newArray,
      datasets: [
        {
          label: "population of the countries",
          data: population,
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}
