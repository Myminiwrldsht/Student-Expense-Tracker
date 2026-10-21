const landingView = document.querySelector("#landingView");
const signInView = document.querySelector("#signInCardView");
const getStartedButton = document.querySelector("#getStartedButton");

getStartedButton.addEventListener("click", (event) => {
    event.preventDefault();
    landingView.classList.add("hidden"); //hides the landing view upon clicking the "Get Started" button
    signInView.classList.remove("hidden"); //reveals the sign in form/view upon clicking the "Get Started" button
});