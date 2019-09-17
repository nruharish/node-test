console.log("client side js file..");

// fetch("http://puzzle.mead.io/puzzle").then(response => {
//   response.json().then(data => {
//     console.log(data);
//   });
// });

const weatherForm = document.querySelector("form");
const searchText = document.querySelector("input");
const messageText = document.querySelector("#message1");

weatherForm.addEventListener("submit", e => {
  e.preventDefault();
  const loc = searchText.value;

  fetch("http://localhost:3000/weather?address=" + loc).then(response => {
    response.json().then(data => {
      if (data.error) {
        console.log(error);
        messageText.textContent = "error";
      } else {
        console.log(data);
        messageText.textContent = "temp: " + data.temperature;
      }
    });
  });
});
