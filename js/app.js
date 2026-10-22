const landingView = document.querySelector("#landingView");
const signInView = document.querySelector("#signInCardView");
const getStartedButton = document.querySelector("#getStartedButton");

getStartedButton.addEventListener("click", (event) => {
    event.preventDefault(); //restrict the browser's default behaviour, jumping to #getStartrd
    landingView.classList.add("hidden"); //hides the landing view upon clicking the "Get Started" button
    signInView.classList.remove("hidden"); //reveals the sign in form/view upon clicking the "Get Started" button
});

const signInForm = document.getElementById("signInForm");
const dashboardView = document.querySelector("#dashboardView");
const userName = document.querySelector("#userDemoName");

signInForm.addEventListener("submit", (event) => {
    event.preventDefault(); //stps the form's default action on submit: to reload the page
    const name = document.querySelector("#username-field").value.trim();
    
    if(name === "") { //if input field is empty, stop
        return;
    } 
    try {localStorage.setItem("displayName", name); }catch (e) {} 

    userName.textContent = name;
    signInView.classList.add("hidden");
    dashboardView.classList.remove("hidden");
})