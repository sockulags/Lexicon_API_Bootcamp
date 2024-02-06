const apiUrl = "https://majazocom.github.io/Data/";

const dogs = [];
const pokemons = [];
const books = [];
const attendees = [];

function renderObjects(array, propName, condition = null) {
  const container = document.createElement("div");
  array.forEach((item) => {
    if (condition && item[propName] !== condition) {
      return;
    }
    const element = document.createElement("div");
    element.textContent = item[propName];
    container.appendChild(element);
  });
  document.body.insertAdjacentElement("afterbegin", container);
}

function fetchData(type, arr) {
  return fetch(getApiUrl(type))
    .then((response) => {
      if (!response.ok) {
        throw new Error("Response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log(`${type} data: `, data);
      data.forEach((item) => {
        arr.push(item);
      });
      console.log(`${type} array: `, arr);
    })
    .catch((error) => {
      console.error("Error: ", error);
    });
}

function getApiUrl(queryName) {
  return `${apiUrl}${queryName}.json`;
}


fetchData("pokemons", pokemons)
  .then(() => {
    renderObjects(pokemons, "name");
  })
  .catch((error) => {
    console.error("Error fetching pokemons: ", error);
  });

fetchData("dogs", dogs)
  .then(() => {
    renderObjects(dogs, "name");
  })
  .catch((error) => {
    console.error("Error fetching dogs: ", error);
  });

fetchData("books", books)
  .then(() => {
    const filteredBooks = books.filter((book) => book.pages <= 500);
    renderObjects(filteredBooks, "title");
  })
  .catch((error) => {
    console.error("Error fetching books: ", error);
  });

fetchData("attendees", attendees)
  .then(() => {
    const actualAttendees = attendees.filter((attendee) => attendee.attending)
    renderObjects(actualAttendees, "name");
  })
  .catch((error) => {
    console.error("Error fetching attendees: ", error);
  });
