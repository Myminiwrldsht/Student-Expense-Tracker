
const API_URL = "http://localhost:3005/expenses";
const landingView = document.querySelector("#landingView");
const signInView = document.querySelector("#signInCardView");
const getStartedButton = document.querySelector("#getStartedButton");

const signInForm = document.getElementById("signInForm");
const dashboardView = document.querySelector("#dashboardView");
const userName = document.querySelector("#userDemoName");

const expenseFormView =document.querySelector("#expenseFormView");
const addExpenseButton = document.querySelector("#addExpenseButton");
const expenseForm = document.getElementById("expenseForm");
const formMessage = document.querySelector("#formMessage");
const expenseList =document.querySelector("#expenseList");
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

    try{localStorage.setItem("displayName", name); }catch (error) {};

const saved = localStorage.getItem("displayName");
if(saved) {
    userName.textContent=saved;
    showView(dashboardView);
}

});



//expense form event listener
addExpenseButton.addEventListener("click", () => {
     expenseFormView.classList.toggle("hidden");
});

// expense form submit logic
expenseForm.addEventListener("submit", (event) => {
    formMessage.textContent = "";// clears old error messages 
    event.preventDefault();

    const description = document.querySelector("#description").value.trim();

    if(description === "") {
        formMessage.textContent = "Please enter a short description!";
        return;
    }

    const amount = Number(document.querySelector("#amount").value);//converts to a number

    if(amount < 50) {
        formMessage.textContent = "Please enter an amount greater than or equal to Ksh.50";
        return; //stop here
    }

    const category =document.querySelector("#category").value;

    if(category === "") {
        formMessage.textContent = "Please select a category!";
        return;
    }
    const date = document.querySelector("#date").value;

    if(date === "") {
        formMessage.textContent = "Please select a date!";
        return;
    }

    const expense = {description, amount, category, date };
    console.log(expense);
    expenseForm.reset(); 

expenseFormView.classList.add("hidden");

})


//async function to get expenses
async function loadExpenses() {
    const response = await fetch(API_URL);
    const expenses = await response.json();
    return expenses;
}


//recent expenses
function renderExpenses(expenses) {
    expenseList.innerHTML = "";//clear the form to add new expenses instead of adding the old stored expenses

    if(expenses.length === 0) {
        const message= document.createElement("li");
 message.textContent= "No expenses yet";
        expenseList.appendChild(message);

        return;
    };

    expenses.forEach((expense) => {
        const item = document.createElement("li");

        
        item.textContent = `${expense.description} - Ksh. ${expense.amount} - ${expense.category} - ${expense.date}`
        expenseList.appendChild(item);
    });
}





loadExpenses().then((data) => renderExpenses(data));