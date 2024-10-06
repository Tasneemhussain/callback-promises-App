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
const RandomAdvice = () => {
  return fetch("https://api.adviceslip.com/advice")
    .then((response) => response.json())
    .then((data) => data.slip.advice)
    .catch(() => "something went worng please try again");
};
const RandomJoke = () => {
  return fetch("https://official-joke-api.appspot.com/random_joke")
    .then((response) => response.json())
    .then((data) => ` ${data.setup} - ${data.punchline}`)
    .catch(() => "something went worng please try later");
};

// funtion for Event listener for the button
document.getElementById("flipButton").addEventListener("click", () => {
  const resultDiv = document.getElementById("result");
  const extraMessageDiv = document.getElementById("extraMessage");
  resultDiv.textContent = ""; // Clear previous result
  extraMessageDiv.textContent = ""; // Clear previous text message

  flipCoin()
    .then((message) => {
      resultDiv.textContent = message;
      resultDiv.style.color = "green"; // Change text color to green for success
      return RandomJoke();
    })
    .then((joke) => {
      extraMessageDiv.textContent = `Here is a Joke for you ${joke}`;
      extraMessageDiv.style.color = "green";
    })
    .catch((message) => {
      resultDiv.textContent = message;
      resultDiv.style.color = "red"; // Change text color to red for failure
      return RandomAdvice();
    })
    .then((advice) => {
      if (advice) {
        extraMessageDiv.textContent = `Here is a piece of advice for you ${advice}`;
        extraMessageDiv.style.color = "red";
      }
    });
});
