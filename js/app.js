const landingView = document.querySelector("#landingView");
const signInView = document.querySelector("#signInCardView");
const getStartedButton = document.querySelector("#getStartedButton");

const signInForm = document.getElementById("signInForm");
const dashboardView = document.querySelector("#dashboardView");
const userName = document.querySelector("#userDemoName");

const expenseFormView =document.querySelector("#expenseFormView");
const addExpenseButton = document.querySelector("#addExpenseButton");



// getStartedButton.addEventListener("click", (event) => {
//     event.preventDefault(); //restrict the browser's default behaviour, jumping to #getStartrd
//     landingView.classList.add("hidden"); //hides the landing view upon clicking the "Get Started" button
//     signInView.classList.remove("hidden"); //reveals the sign in form/view upon clicking the "Get Started" button
// });


// signInForm.addEventListener("submit", (event) => {
//     event.preventDefault(); //stps the form's default action on submit: to reload the page
//     const name = document.querySelector("#username-field").value.trim();
    
//     if(name === "") { //if input field is empty, stop
//         return;
//     } 
//     try {localStorage.setItem("displayName", name); }catch (error) {} 

//     userName.textContent = name;
//     signInView.classList.add("hidden");
//     dashboardView.classList.remove("hidden");
// });

// addExpenseButton.addEventListener("click", (event) => {
//     event.preventDefault();
//     expenseFormView.classList.remove("hidden");
// })

// function that turns all views off, only turns the active views on

function showView(viewToshow) {

    //hide every major view
    landingView.classList.add("hidden");
    signInView.classList.add("hidden");
    dashboardView.classList.add("hidden");

    //reveal only a specific view
    viewToshow.classList.remove("hidden");
}

//when landingpage burron is clicked
getStartedButton.addEventListener("click", (event) => {
    event.preventDefault();

    showView(signInView);// calling the showView function function using signInForm as a parameter
})

//when continue button is clicked on the signIn form (sign in was successful)
signInForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.querySelector("#username-field").value.trim();

    if(name === "") {
        return;
    };

    try{localStorage.setItem("displayName", name) }catch (error) {};

const saved = localStorage.getItem("displayName");
if(saved) {
    userName.textContent=saved;
    showView(homeView);
}

});

addExpenseButton.addEventListener("submit", (event) => {
    
})

