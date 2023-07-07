const errMessage_container = document.querySelector("#errMessage");

const getParam = () => {
  const urlParams = new URLSearchParams(location.search);

  for (const [key, value] of urlParams) {
    return key;
  }
};

(async () => {
  const user = getCookie("user");
  const token = getCookie("token");
  const deposit_request = getParam();
  try {
    const response = await fetch(
      "/api/user/deposit_request/fetch",
      // "http://localhost:5000/api/user/find",

      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ token, user, deposit_request }),
      },
    );
    const result = await response.json();
    // user_result = result.message;
    console.log(result);
    if (result.error) {
      errMessage_container.innerHTML = result.errMessage;
      errMessage_container.style.display = "block";
    } else {
      document.querySelector(
        "#transfer_txt",
      ).innerHTML = `Transfer ₦${result.message.deposit_amount
        .toString()
        .replace(
          /\B(?=(\d{3})+(?!\d))/g,
          ",",
        )} to the bank details below and click next to upload proof of
                    payment`;
      // document.querySelector("#email").href = `mailto:${result.message.Email}`;
      // document.querySelector("#email").innerHTML = `${result.message.Email}`;
      //   setText(result.message);
      //   if (document.querySelector("#wallet_balance"))
      //     document.querySelector(
      //       "#wallet_balance",
      //     ).innerHTML = `Final Balance: $${result.message.final_balance}`;
    }
  } catch (error) {
    // alert(error.message);
    errMessage_container.innerHTML = error.message;
    errMessage_container.style.display = "block";
  }
})();

document.querySelector("#submit").onclick = () => {
  document.querySelector("#submit").value = "Proccessing...";
  window.location.href = `submit_receipt.html?${getParam()}`;
};
