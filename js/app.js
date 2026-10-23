
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
const totalSpent = document.querySelector("#totalSpent");
const toSpendNote = document.querySelector("#toSpendNote");
const largestCategory = document.querySelector("#largestCategory");
const largestNote = document.querySelector("#largestNote");
const budgetUsed = document.querySelector("#budgetUsed");
const budgetStatus = document.querySelector("#budgetStatus");
const remaining = document.querySelector("#remaining");
const remainingNote = document.querySelector("#remainingNote");
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



    userName.textContent= name;
    showView(dashboardView);


});

const navLinks = document.querySelectorAll("[data-view]");

navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault();

        //read saved name fresh, every click
        let savedName = null;
        try { savedName = localStorage.getItem("displayName"); } catch (error) {}

        //dashboard link clicked with no name is saved
        if(link.dataset.view === "dashboardView" && !savedName) { //$$- both parts must be true
            showView(signInView);
            return; //stop listener

        }
        const target = document.getElementById(link.dataset.view);
        showView(target);
    });//close click listener

        
    }); //close for each




//expense form event listener
addExpenseButton.addEventListener("click", () => {
     expenseFormView.classList.toggle("hidden");
});

// expense form submit logic
expenseForm.addEventListener("submit", async (event) => {
    formMessage.textContent = "";// clears old error messages 
    event.preventDefault();
//description
    const description = document.querySelector("#description").value.trim();

    if(description === "") {
        formMessage.textContent = "Please enter a short description!";
        return;
    }

    //amount
    const amount = Number(document.querySelector("#amount").value);//converts to a number

    if(amount < 50) {
        formMessage.textContent = "Please enter an amount greater than or equal to Ksh.50";
        return; //stop here
    }

    //category
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
    await addExpense(expense);
    await refreshDashboard();
    expenseForm.reset(); 

expenseFormView.classList.add("hidden");

})


//async function to get expenses
async function loadExpenses() {
    const response = await fetch(API_URL);
    const expenses = await response.json();
    return expenses;
}


//recent expenses (GET)
function renderExpenses(expenses) {
    expenseList.innerHTML = "";//clear the form to add new expenses instead of adding the old stored expenses

    if(expenses.length === 0) {
        const row = document.createElement("tr");
        const cell = document.createElement("td");
        cell.colSpan = 4;//number of columns
        cell.textContent = "No expenses yet";
        row.appendChild(cell);
        expenseList.appendChild(row);
        return;//stop function block
    };

    expenses.forEach((expense) => {
        const row = document.createElement("tr");

        //description cell
        const descriptionCell = document.createElement("td");
        descriptionCell.textContent = expense.description;
        //category cell
        const categoryCell = document.createElement("td");
        categoryCell.textContent = expense.category;
        //amount cell
        const amountCell = document.createElement("td");
        amountCell.textContent = formatKsh(expense.amount);
        //date cell
        const dateCell = document.createElement("td");
        dateCell.textContent = expense.date;

        row.appendChild(descriptionCell);
        row.appendChild(categoryCell);
        row.appendChild(amountCell);
        row.appendChild(dateCell);

        
       expenseList.appendChild(row);
    });
}

//card stats functions:
const semesterBudget = 40000;
const categoryLabels = {
    tuition: "Tuition",
    books: "Books",
    dining: "Dining",
    campuslife: "Campus life"
}

function formatKsh(amount) {
    return `Ksh. ${amount.toLocaleString("en-KE")}`;

}

function getCategoryTotals(expenses)  {
const totals = {};
expenses.forEach((expense) => {
    totals[expense.category] = (totals[expense.category] || 0) + expense.amount;
});
return totals;
}

//update stat cards
function updateStatCards(expenses) {
    //total spent card
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    totalSpent.textContent = formatKsh(total);

    //remaining card
    const left = semesterBudget - total;
    const percentageUsed = Math.round((total / semesterBudget) * 100);

    //to spend note
    toSpendNote.textContent = left >=0 
    ? `${formatKsh(left)} left to spend`
    : `${formatKsh(Math.abs(left))} over budget`;

    //budget used
    budgetUsed.textContent = `${percentageUsed}%`;

    remaining.textContent = left >= 0 ? `${100 - percentageUsed}%` : "0%";
    remainingNote.textContent = left >= 0
    ? "of your semester budget"
    : "You've passed your budget";

    //largest category
    if(expenses.length === 0) {
        largestCategory.textContent = "No expenses yet";
        largestNote.textContent = "No expenses yet";

    }
    else {
        const totals = getCategoryTotals(expenses);
        const [topKey, topAmount] = Object.entries(totals)
        .sort((a, b)=> b[1] - a[1]) [0];
        const share = Math.round((topAmount / total) * 100);


        largestCategory.textContent = categoryLabels[topKey.toLowerCase()] || topKey;
        largestNote.textContent = `${share}% of your spending`;

      

    }
      //status card
        if(percentageUsed > 100) {
            budgetStatus.textContent = "Over budget";

        } 
        else if(percentageUsed >= 80) {
            budgetStatus.textContent = "Close to budget limit";
        }
        else {
            budgetStatus.textContent = "Within Budget";
        }
}

//Async function to refresh dashboard

async function refreshDashboard() {
    const expenses = await loadExpenses();
    renderExpenses(expenses);
    updateStatCards(expenses);
}




//addExpense (POST)
async function addExpense(expense) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(expense)
    });
    return await response.json();
}

let saved = null;
try {saved = localStorage.getItem("displayName")} catch (error) {}
if(saved) {
    userName.textContent = saved;
    showView(dashboardView);
}

refreshDashboard();