init();

function bankingPage() {
  document.title = "Dashboard";
  document.getElementById("loggedInPage").style.display = "none";
  document.getElementById("dashboard").style.display = "block";
  document.querySelector("header h1").innerText = "Your banking dashboard.";

  const logoutBTN = document.querySelector("#logout-btn");

  logoutBTN.classList.remove("hidden");
  logoutBTN.addEventListener("click", () => {
    if (confirm("Are you sure?")) {
      init();
    }
  });

  // display field
  const depositTotal = document.getElementById("deposit-total");
  const withdrawTotal = document.getElementById("withdraw-total");
  const balanceTotal = document.getElementById("balance-total");

  // input field
  const depositField = document.querySelector(".deposit");
  const withdrawField = document.querySelector(".withdraw");
  const depositInput = document.getElementById("deposit-input");
  const withdrawInput = document.getElementById("withdraw-input");

  // input Button
  const depositBTN = document.getElementById("btn-deposit");
  const withdrawBTN = document.getElementById("btn-withdraw");

  // message
  let message = document.getElementById("message");

  // Deposit money
  depositBTN.addEventListener("click", () => {
    if (
      !isNaN(parseFloat(depositInput.value)) &&
      parseFloat(depositInput.value) > 0
    ) {
      updateFinalBalance(depositInput, balanceTotal, "deposit");
    } else {
      addMessage("Wrong input can't be added", "red");
    }
    depositInput.value = "";
    removeMessage();
  });

  // Withdraw money
  withdrawBTN.addEventListener("click", () => {
    if (
      !isNaN(parseFloat(withdrawInput.value)) &&
      parseFloat(withdrawInput.value) > 0
    ) {
      updateFinalBalance(withdrawInput, balanceTotal, "withdraw");
    } else {
      addMessage("Wrong input can't be added", "red");
    }
    withdrawInput.value = "";
    removeMessage();
  });

  // functions
  function addMoney(inputField, prevBalanceField) {
    const inputValue = inputField.value;
    const prevTotalValue = prevBalanceField.innerText;

    const balance = parseFloat(inputValue) + parseFloat(prevTotalValue);
    prevBalanceField.innerText = balance;
  }

  function updateFinalBalance(inputField, prevBalanceField, updateType) {
    const inputValue = inputField.value;
    const prevTotalValue = prevBalanceField.innerText;
    let finalBalance = 0;

    if (updateType == "deposit") {
      addMoney(depositInput, depositTotal);

      addMessage("Your money was deposited successfully.", "green");

      finalBalance = parseFloat(prevTotalValue) + parseFloat(inputValue);
      prevBalanceField.innerText = finalBalance;
    } else if (updateType == "withdraw") {
      finalBalance = parseFloat(prevTotalValue) - parseFloat(inputValue);

      if (finalBalance > 0) {
        addMoney(withdrawInput, withdrawTotal);

        addMessage("Your money was withdrawn successfully.", "red");

        prevBalanceField.innerText = finalBalance;
      } else {
        addMessage("You don't have sufficient money!", "red");
      }
    }
  }

  function addMessage(messageText, color) {
    const messageParent = message.parentElement;
    messageParent.classList.remove("hidden");
    messageParent.style.color = color;
    messageParent.style.borderColor = color;
    message.innerText = messageText;
  }

  function removeMessage() {
    setTimeout(() => {
      const messageParent = message.parentElement;
      messageParent.classList.add("hidden");
    }, 5000);
  }
}

function init() {
  document.title = "My Bank";
  document.getElementById("dashboard").style.display = "none";
  document.getElementById("loggedInPage").style.display = "block";

  document.querySelector("header h1").innerText = "Please Log in Here.";
  const loginBTN = document.getElementById("btn-login");
  document.querySelector("#logout-btn").classList.add("hidden");

  loginBTN.style;
  loginBTN.addEventListener("click", () => {
    const userEmail = document.getElementById("user-email").value.trim();
    const userPassword = document.getElementById("user-password").value.trim();

    if (userEmail == "abc@abc.com" && userPassword == "12345") {
      document.getElementById("user-email").value = "";
      document.getElementById("user-password").value = "";

      bankingPage();
    }
  });
}
