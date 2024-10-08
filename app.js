// Function for  coin flip

const flipCoin = () => {
  return new Promise((resolve, reject) => {
    const outcome = Math.random(); // Generate a random number between 0 and 1
    if (outcome > 0.5) {
      resolve("You win! you  will get a joke"); // (heads)
    } else {
      reject("You lose! you  will get a adivce"); //  (tails)
    }
  });
};

// Fetch random advice when the player loses
const RandomAdvice = async () => {
  try {
    // .then and catch method
    const response = await fetch("https://api.adviceslip.com/advice"); // return fetch("https://api.adviceslip.com/advice")
    const data = await response.json(); //.then((response) => response.json())
    return data.slip.advice; // Return the fetched advice                      // .then((data) => data.slip.advice)
  } catch (error) {
    return "something went worng please try again"; //.catch(() => "something went worng please try again");
  }
};
const RandomJoke = async () => {
  try {
    const response = await fetch(
      "https://official-joke-api.appspot.com/random_joke"
    );
    const data = await response.json();
    return ` ${data.setup} - ${data.punchline}`;
  } catch (error) {
    return "something went worng please try later";
  }
};

// funtion for Event listener for the button
document.getElementById("flipButton").addEventListener("click", async () => {
  const resultDiv = document.getElementById("result");
  const extraMessageDiv = document.getElementById("extraMessage");
  resultDiv.textContent = ""; // Clear previous result
  extraMessageDiv.textContent = ""; // Clear previous text message

  flipCoin();
  try {
    const message = await flipCoin(); // Await the result of the coin flip
    resultDiv.textContent = message;
    resultDiv.style.color = "green"; // Change text color to green for success

    const joke = await RandomJoke(); // Await the result of the  Random joke
    extraMessageDiv.textContent = `Here is a Joke for you ..${joke}`;
    extraMessageDiv.style.color = "green"; // Change text color to green for success
  } catch (error) {
    resultDiv.textContent = message;
    resultDiv.style.color = "red"; // Change text color to red for failure

    const advice = await RandomJoke();
    extraMessageDiv.textContent = `Here is a piece of advice for you ..${advice}`;
    extraMessageDiv.style.color = "red";
  }
  /*.then((message) => {
      resultDiv.textContent = message;
      resultDiv.style.color = "green"; // Change text color to green for success
      return RandomJoke();
    })
    .then((joke) => {
      extraMessageDiv.textContent = `Here is a Joke for you ..${joke}`;
      extraMessageDiv.style.color = "green";
    })
    .catch((message) => {
      resultDiv.textContent = message;
      resultDiv.style.color = "red"; // Change text color to red for failure
      return RandomAdvice();
    })
    .then((advice) => {
      if (advice) {
        extraMessageDiv.textContent = `Here is a piece of advice for you ..${advice}`;
        extraMessageDiv.style.color = "red";
      }
    });*/
});

// weather api function
document.getElementById("getWeather").addEventListener("click", () => {
  const Weatherdiv = document.getElementById("Weather");
  const searchInput = document.getElementById("searchcity").value;
  Weatherdiv.textContent = ""; // clear previous result

  const apikey = "a88af912f62bac7ec2b9e1cd525f01da";
  const lat = 56.0467;
  const lon = 12.6944;
  const units = "metric";

  const weatherInhelsingborg = async () => {
    try {
      // const response = await fetch ("https://api.open-meteo.com/v1/forecast?latitude=56.0467&longitude=12.6944&current=temperature_2m&timezone=Europe%2FBerlin");
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}&units=${units}`
      );
      const data = await response.json();

      Weatherdiv.textContent = `The temperature in Helsingborg is currently: ${data.main.temp}°C`;
    } catch (error) {
      Weatherdiv.textContent = "something went worng. Please try again later.";
    }
  };
  weatherInhelsingborg();
});
