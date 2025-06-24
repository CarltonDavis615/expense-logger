let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

const monthlyBudget = 2000;
const annualBudget = 24000;

function addExpense() {
  const desc = document.getElementById("desc").value.trim();
  const amount = parseFloat(document.getElementById("amount").value);
  const category = document.getElementById("category").value.trim();

  if (!desc || isNaN(amount) || !category) {
    alert("Please enter all fields correctly.");
    return;
  }

  const expense = {
    desc,
    amount,
    category,
    date: new Date().toISOString()
  };

  expenses.push(expense);
  localStorage.setItem("expenses", JSON.stringify(expenses));
  renderExpenses();

// Clear input fields
document.getElementById("desc").value = "";
document.getElementById("amount").value = "";
document.getElementById("category").value = "";

}

function renderExpenses() {
  const tableBody = document.getElementById("expense-table-body");
  tableBody.innerHTML = "";

  let monthlyTotal = 0;
  let annualTotal = 0;

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  expenses.forEach(exp => {
    const date = new Date(exp.date);
    const readableDate = date.toLocaleDateString(undefined, {
      year: 'numeric', month: 'short', day: 'numeric'
    });

    if (date.getFullYear() === currentYear) {
      annualTotal += exp.amount;
      if (date.getMonth() === currentMonth) {
        monthlyTotal += exp.amount;
      }
    }

    const row = document.createElement("tr");
row.innerHTML = `
  <td>${readableDate}</td>
  <td>$${exp.amount.toFixed(2)}</td>
  <td>${exp.category}</td>
  <td>${exp.desc}</td>
  <td><button onclick="deleteExpense(${expenses.indexOf(exp)})">Delete</button></td>
`;
    tableBody.appendChild(row);
  });

  document.getElementById("monthly-total").textContent =
    `Monthly Total: $${monthlyTotal.toFixed(2)} / $${monthlyBudget}`;
  document.getElementById("annual-total").textContent =
    `Annual Total: $${annualTotal.toFixed(2)} / $${annualBudget}`;
}

renderExpenses();

function deleteExpense(index) {
  expenses.splice(index, 1);
  localStorage.setItem("expenses", JSON.stringify(expenses));
  renderExpenses();
}

