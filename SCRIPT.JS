let users=[];
let sales=[];
let expenses=[];
let suppliers=[];
let employees=[];

/* Navigation */
function showSignup(){
    loginPage.style.display="none";
    signupPage.style.display="block";
}
function showLogin(){
    signupPage.style.display="none";
    loginPage.style.display="block";
}

/* Signup */
function signup(){
    if(signupEmail.value && signupPassword.value){
        users.push({
            email:signupEmail.value,
            pass:signupPassword.value
        });
        signupMsg.innerText="Account Created!";
    }else{
        signupMsg.innerText="Fill all fields!";
    }
}

/* Login */
function login(){
    let user=users.find(u=>u.email===loginEmail.value && u.pass===loginPassword.value);
    if(user){
        loginPage.style.display="none";
        dashboard.style.display="block";
    }else{
        loginMsg.innerText="Invalid Credentials!";
    }
}

function googleLogin(){
    alert("Google Login Successful (Demo)");
    loginPage.style.display="none";
    dashboard.style.display="block";
}

function forgotPassword(){
    alert("Password reset link sent (Demo)");
}

/* Sales */
function addSale(){
    if(saleDate.value && saleAmount.value){
        sales.push({
            date:saleDate.value,
            amount:parseFloat(saleAmount.value),
            type:saleType.value
        });
        renderSales();
    }
}
function renderSales(){
    salesTable.innerHTML="<tr><th>Date</th><th>Amount</th><th>Type</th><th>Action</th></tr>";
    sales.forEach((s,i)=>{
        salesTable.innerHTML+=`
        <tr>
            <td>${s.date}</td>
            <td>${s.amount}</td>
            <td>${s.type}</td>
            <td><button onclick="deleteSale(${i})">Delete</button></td>
        </tr>`;
    });
}
function deleteSale(i){
    sales.splice(i,1);
    renderSales();
}

/* Expense */
function addExpense(){
    if(expenseDate.value && expenseAmount.value){
        expenses.push({
            date:expenseDate.value,
            amount:parseFloat(expenseAmount.value),
            type:expenseType.value
        });
        renderExpense();
    }
}
function renderExpense(){
    expenseTable.innerHTML="<tr><th>Date</th><th>Amount</th><th>Type</th><th>Action</th></tr>";
    expenses.forEach((e,i)=>{
        expenseTable.innerHTML+=`
        <tr>
            <td>${e.date}</td>
            <td>${e.amount}</td>
            <td>${e.type}</td>
            <td><button onclick="deleteExpense(${i})">Delete</button></td>
        </tr>`;
    });
}
function deleteExpense(i){
    expenses.splice(i,1);
    renderExpense();
}

/* GST */
function calculateGST(){
    let collected=parseFloat(gstCollected.value)||0;
    let paid=parseFloat(gstPaid.value)||0;
    let totalSales=sales.reduce((a,b)=>a+b.amount,0);
    let totalExpense=expenses.reduce((a,b)=>a+b.amount,0);
    let net=totalSales-totalExpense-(collected-paid);
    gstResult.innerText="Net Profit After GST: ₹"+net;
}

/* Supplier */
function addSupplier(){
    suppliers.push({
        name:supplierName.value,
        payment:supplierPayment.value,
        due:supplierDue.value
    });
    renderSupplier();
}
function renderSupplier(){
    supplierTable.innerHTML="<tr><th>Name</th><th>Outstanding</th><th>Due Date</th><th>Action</th></tr>";
    suppliers.forEach((s,i)=>{
        supplierTable.innerHTML+=`
        <tr>
            <td>${s.name}</td>
            <td>${s.payment}</td>
            <td>${s.due}</td>
            <td><button onclick="deleteSupplier(${i})">Delete</button></td>
        </tr>`;
    });
}
function deleteSupplier(i){
    suppliers.splice(i,1);
    renderSupplier();
}

/* Payroll */
function addEmployee(){
    employees.push({
        name:empName.value,
        salary:empSalary.value,
        bonus:empBonus.value
    });
    renderPayroll();
}
function renderPayroll(){
    payrollTable.innerHTML="<tr><th>Name</th><th>Salary</th><th>Bonus</th><th>Action</th></tr>";
    employees.forEach((e,i)=>{
        payrollTable.innerHTML+=`
        <tr>
            <td>${e.name}</td>
            <td>${e.salary}</td>
            <td>${e.bonus}</td>
            <td><button onclick="deleteEmployee(${i})">Delete</button></td>
        </tr>`;
    });
}
function deleteEmployee(i){
    employees.splice(i,1);
    renderPayroll();
}

/* ADVANCED AI ANALYSIS */
function showAI(){

    if(sales.length===0 && expenses.length===0){
        aiResult.innerHTML="No data available for analysis.";
        return;
    }

    let totalSales=sales.reduce((a,b)=>a+b.amount,0);
    let totalExpenses=expenses.reduce((a,b)=>a+b.amount,0);

    let collected=parseFloat(gstCollected.value)||0;
    let paid=parseFloat(gstPaid.value)||0;

    let netProfit=totalSales-totalExpenses-(collected-paid);

    let status=netProfit>0?"PROFIT ✅":
               netProfit<0?"LOSS ❌":
               "BREAK EVEN ⚖";

    let saleTypeData={};
    sales.forEach(s=>{
        saleTypeData[s.type]=(saleTypeData[s.type]||0)+s.amount;
    });

    let most="",least="",max=-Infinity,min=Infinity;
    for(let t in saleTypeData){
        if(saleTypeData[t]>max){max=saleTypeData[t];most=t;}
        if(saleTypeData[t]<min){min=saleTypeData[t];least=t;}
    }

    let expenseTypeData={};
    expenses.forEach(e=>{
        expenseTypeData[e.type]=(expenseTypeData[e.type]||0)+e.amount;
    });

    let highestExpense="",high=-Infinity;
    for(let t in expenseTypeData){
        if(expenseTypeData[t]>high){high=expenseTypeData[t];highestExpense=t;}
    }

    let suggestion="";
    if(netProfit>0){
        suggestion="Focus more on "+most+" to increase growth.";
    }else{
        suggestion="Reduce spending in "+highestExpense+" and improve "+least+" sales.";
    }

    aiResult.innerHTML=`
    <b>AI Business Analysis Report</b><br><br>
    Total Revenue: ₹${totalSales}<br>
    Total Expenses: ₹${totalExpenses}<br>
    Net Profit: ₹${netProfit}<br>
    Status: ${status}<br><br>
    Most Important Sale Type: ${most||"N/A"}<br>
    Least Important Sale Type: ${least||"N/A"}<br>
    Highest Expense Category: ${highestExpense||"N/A"}<br><br>
    Suggestion: ${suggestion}
    `;
}