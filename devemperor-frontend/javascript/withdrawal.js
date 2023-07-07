const errMessage_container = document.querySelector("#errMessage");

const withdraw_fund = async (data) => {
  document.querySelector("#submit").value = "Proccessing...";
  errMessage_container.style.display = "none";

  try {
    const response = await fetch(
      "/api/user/withdraw_fund",
      // "http://localhost:5000/api/user/find",

      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      },
    );
    const result = await response.json();
    console.log(result);
    if (result.error) {
      errMessage_container.innerHTML = result.errMessage;
      errMessage_container.style.display = "block";
      document.querySelector("#submit").value = "Try again";

      return;
    }
    document.querySelector("#submit").value = "Success";
    // window.location.href = `bank_details.html?${result.message._id}`;
    // document.querySelector(".mail_success").innerHTML = result.message;
    // document.querySelector(".mail_success").style.display = "block";
    // setTimeout(() => {
    //   document.querySelector(".mail_success").style.display = "none";
    // }, 6000);
  } catch (error) {
    // document.querySelector(".email_message").innerHTML = "";
    errMessage_container.innerHTML = error.message;
    errMessage_container.style.display = "block";
    document.querySelector("#submit").value = "Try again";
  }
};

document.querySelector("#submit").onclick = () => {
  const withdrawal_amount = document.querySelector("#withdrawal_amount");
  const Bank_name = document.querySelector("#Bank_name");
  const Account_number = document.querySelector("#Account_number");
  const Account_name = document.querySelector("#Account_name");

  if (!withdrawal_amount.value)
    return (withdrawal_amount.style.border = "1px solid red");
  if (!Bank_name.value) return (Bank_name.style.border = "1px solid red");
  if (!Account_number.value)
    return (Account_number.style.border = "1px solid red");
  if (!Account_name.value) return (Account_name.style.border = "1px solid red");

  const user = getCookie("user");
  const token = getCookie("token");

  withdraw_fund({
    user,
    token,
    withdrawal_amount: withdrawal_amount.value,
    Bank_name: Bank_name.value,
    Account_number: Account_number.value,
    Account_name: Account_name.value,
  });
};

document.querySelectorAll("input").forEach((input) => {
  //   document.querySelector(".errMessage").innerHTML = "";
  errMessage_container.style.display = "none";

  input.onkeyup = () => (input.style.border = "0.1px solid #fff");
});

document.querySelectorAll("select").forEach((select) => {
  errMessage_container.style.display = "none";

  select.onchange = () => (select.style.border = "0.1px solid #fff");
});
