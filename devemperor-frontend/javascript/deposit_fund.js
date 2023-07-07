const errMessage_container = document.querySelector("#errMessage");

const deposit_fund = async (data) => {
  document.querySelector("#submit").value = "Proccessing...";
  errMessage_container.style.display = "none";

  try {
    const response = await fetch(
      "/api/user/deposit_fund",
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
      errMessage_container.value = result.errMessage;
      errMessage_container.style.display = "block";
      errMessage_container.innerHTML=result.errMessage
      document.querySelector("#submit").value = "Try again";

      return;
    }
    document.querySelector("#submit").value = "Success";
    window.location.href = `bank_details.html?${result.message._id}`;
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
  event.preventDefault();
  const deposit_amount = document.querySelector("#deposit_amount");
  const deposit_method = document.querySelector("#deposit_method");
  if (!deposit_amount.value)
    return (deposit_amount.style.border = "1px solid red");
  if (!deposit_method.value)
    return (deposit_method.style.border = "1px solid red");

  const user = getCookie("user");
  const token = getCookie("token");
  deposit_fund({
    token,
    user,
    deposit_amount: deposit_amount.value,
    deposit_method: deposit_method.value,
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
