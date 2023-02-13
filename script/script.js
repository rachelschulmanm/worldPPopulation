let btn = document.querySelector(".btn");
let countries = document.querySelector(".countries");
let input = document.querySelector(".input");
let label = document.querySelector("label");
const ctx = document.getElementById("myChart");
let myLineChart;
let chartExists = false;
let newCountries = [];
let population = [];
let cities = [];
let populationCity = [];
let section = document.querySelector("section");

document.addEventListener("click", country);
// label.addEventListener("click", city);
document
  .querySelector(".countries")
  .addEventListener("click", (e) =>
    e.target.tagName === "BUTTON" ? city(e.target.innerText) : false
  );

async function country(event) {
  newCountries = [];
  population = [];
  if (event.target.className === "btn") {
    try {
      const res = await fetch(
        `https://restcountries.com/v3.1/region/${event.target.value}`
      );
      if (!res.ok) throw new Error("error");
      const data = await res.json();
      // console.log(data);
      countries.innerHTML = "";

      data.forEach((element) => {
        newCountries.push(element.name.common);
        population.push(element.population);

        let btnOfCountry = document.createElement("button");
        btnOfCountry.innerText = `${element.name.common}`;
        countries.appendChild(btnOfCountry);
      });
    } catch (err) {
      console.error(err);
    }
  }

  await createChart();
}

async function createChart() {
  if (chartExists === true) {
    myLineChart.destroy();
  }
  chartExists = true;

  myLineChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: newCountries,
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

async function city(buttonLabel = null) {
  cities = [];
  populationCity = [];
  // if (event.target.className === "btn") {
  try {
    const res = await fetch(
      "https://countriesnow.space/api/v0.1/countries/population/cities/filter",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          limit: 1000,
          order: "asc",
          orderBy: "name",
          country: `${buttonLabel || input.value}`,
        }),
      }
    );

    if (!res.ok) throw new Error("error");
    const data1 = await res.json();
    console.log(data1);
    countries.innerHTML = "";
    function getCity() {
      data1.data.forEach((element) => {
        cities.push(element.city);
        populationCity.push(element.populationCounts[0].value);
      });
    }
    getCity();
  } catch (err) {
    console.error(err);
  }
  // }

  await createChart2();
}
async function createChart2() {
  if (chartExists === true) {
    myLineChart.destroy();
  }
  chartExists = true;

  myLineChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: cities,
      datasets: [
        {
          label: "population of the countries",
          data: populationCity,
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
