const errMessage_container = document.querySelector("#errMessage");

const createAndAppendElement = (data) => {
  const history_list = document.createElement("div");
  const transaction_date = document.createElement("div");
  const transaction_type = document.createElement("div");
  const transaction_amount = document.createElement("div");
  const transaction_status = document.createElement("div");

  transaction_date.innerHTML = data.transaction_date.toUpperCase();
  transaction_type.innerHTML = data.debit ? "DEBIT" : "CREDIT";
  transaction_amount.innerHTML = data.debit || data.credit;
  transaction_status.innerHTML = data.status.toUpperCase();
  history_list.append(
    transaction_date,
    transaction_type,
    transaction_amount,
    transaction_status,
  );
  history_list.className = data.credit ? `history_list cred` : `history_list`;
  document.querySelector("#history_container").append(history_list);
};

(async () => {
  let token = getCookie("token");
  let user = getCookie("user");
  try {
    const response = await fetch("/api/user/transactions/fetch", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ token, user }),
    });
    const result = await response.json();
    console.log(result);
    if (result.error) {
      errMessage_container.innerHTML = result.errMessage;
      errMessage_container.style.display = "block";
      return;
    }

    result.message.forEach((data) => {
      createAndAppendElement(data);
    });
  } catch (err) {
    // document.querySelector(".errMessage").innerHTML = err.message;
    errMessage_container.innerHTML = error.message;
    errMessage_container.style.display = "block";
  }
})();
