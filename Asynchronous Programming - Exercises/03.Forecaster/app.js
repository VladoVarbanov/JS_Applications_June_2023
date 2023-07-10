function attachEvents(e) {
  let getWeatherBtn = document.getElementById("submit");
  getWeatherBtn.addEventListener("click", weather);

  async function weather(e) {
    e.preventDefault();
    const div = document.getElementById("forecast");
    const divCurrent = document.getElementById("current");
    const divUpcoming = document.getElementById("upcoming");
    divCurrent.innerHTML = "";
    divUpcoming.innerHTML = "";
    const inputWeatherLocation = document.getElementById("location").value;
    let urlLocation = "http://localhost:3030/jsonstore/forecaster/locations";
    let urlWeatherToday = "http://localhost:3030/jsonstore/forecaster/today/";
    let urlWeatherUpcoming =
      "http://localhost:3030/jsonstore/forecaster/upcoming/";
    let responseLocation = await fetch(urlLocation);
    const dataLocation = await responseLocation.json();
    const city = {};
    dataLocation.forEach((element) => {
      if (element.name === inputWeatherLocation) {
        city.name = element.name;
        city.code = element.code;
      }
    });

    let responseWeatherToday = await fetch(`${urlWeatherToday}${city.code}`);
    let dataToday = await responseWeatherToday.json();
    let responseWeatherUpcoming = await fetch(
      `${urlWeatherUpcoming}${city.code}`
    );
    let dataUpcoming = await responseWeatherUpcoming.json();

    divCurrent.appendChild(createCurrentDOMElements(dataToday));
    divUpcoming.appendChild(createUpcomingDOMElements(dataUpcoming));

    div.style.display = "block";
    console.log(dataToday);
    console.log(dataUpcoming);
  }
}

attachEvents();

function createCurrentDOMElements(data) {
  const symbols = {
    Sunny: "☀",
    "Partly sunny": "⛅",
    Overcast: "☁",
    Rain: "☂",
    Degrees: "°",
  };
  let main = document.createElement("div");
  main.classList = "forecast";

  let spanSymbol = document.createElement("span");
  spanSymbol.classList = "condition symbol";
  spanSymbol.textContent = symbols[data.forecast.condition];

  let spanMainCondition = document.createElement("span");
  spanMainCondition.classList = "condition";

  let spanCityName = document.createElement("span");
  spanCityName.classList = "forecast-data";
  spanCityName.textContent = data.name;

  let spanDegree = document.createElement("span");
  spanDegree.classList = "forecast-data";
  spanDegree.textContent = `${data.forecast.low}${symbols.Degrees}/${data.forecast.high}${symbols.Degrees}`;

  let spanCondition = document.createElement("span");
  spanCondition.classList = "forecast-data";
  spanCondition.textContent = data.forecast.condition;

  main.appendChild(spanSymbol);
  spanMainCondition.appendChild(spanCityName);
  spanMainCondition.appendChild(spanDegree);
  spanMainCondition.appendChild(spanCondition);
  main.appendChild(spanMainCondition);

  return main;
}

function createUpcomingDOMElements(data) {
  const symbols = {
    Sunny: "☀",
    "Partly sunny": "⛅",
    Overcast: "☁",
    Rain: "☂",
    Degrees: "°",
  };

  let main = document.createElement("div");
  main.classList = "forecast-info";

  data.forecast.forEach((el) => {
    let spanMainCondition = document.createElement("span");
    spanMainCondition.classList = "upcoming";

    let spanSymbol = document.createElement("span");
    spanSymbol.classList = "symbol";
    spanSymbol.textContent = symbols[el.condition];

    let spanDegree = document.createElement("span");
    spanDegree.classList = "forecast-data";
    spanDegree.textContent = `${el.low}${symbols.Degrees}/${el.high}${symbols.Degrees}`;

    let spanCondition = document.createElement("span");
    spanCondition.classList = "forecast-data";
    spanCondition.textContent = el.condition;

    spanMainCondition.appendChild(spanSymbol);
    spanMainCondition.appendChild(spanDegree);
    spanMainCondition.appendChild(spanCondition);
    main.appendChild(spanMainCondition);
  });

  return main;
}
