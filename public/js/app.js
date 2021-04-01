console.log("Client-side JS file loaded");
const msg1 = document.querySelector("#msg-1");
const msg2 = document.querySelector("#msg-2");

const getForecast = (address) => {
  msg1.textContent = "Loading...";
  msg2.textContent = "";
  fetch(`/weather?address=${address}`).then((response) =>
    response.json().then((data) => {
      if (data.error) {
        msg1.textContent = data.error;
      } else {
        msg1.textContent = `Weather in ${data.location}:`;
        msg2.textContent = `
        The temperature is: ${data.temperature} 
        The precipitation chance is: ${data.precip}
        And the temperature feels like: ${data.feelslike}`;
      }
    })
  );
};

document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
  const location = document
    .querySelector("input")
    .value.replace(/^\w/, (c) => c.toUpperCase());
  getForecast(location);
});
