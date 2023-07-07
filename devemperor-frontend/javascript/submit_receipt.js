const errMessage_container = document.querySelector("#errMessage");

const getParam = () => {
  const urlParams = new URLSearchParams(location.search);

  for (const [key, value] of urlParams) {
    return key;
  }
};

const submit_receipt = async (data) => {
  document.querySelector("#submit").value = "proccessing...";

  try {
    const response = await fetch("/api/user/complete_deposit_request", {
      method: "POST",
      body: data,
    });
    const result = await response.json();
    console.log(result);
    if (result.error) {
      errMessage_container.innerHTML = result.errMessage;
      errMessage_container.style.display = "block";
      document.querySelector("#submit").value = "Try again";
      return;
    }
    document.querySelector("#submit").value = "Success";
  } catch (error) {
    errMessage_container.innerHTML = error.message;
    errMessage_container.style.display = "block";
    document.querySelector("#submit").value = "Try again";
  }
};

document.querySelector("#submit").onclick = () => {
  const payment_proof = document.querySelector("#payment_proof");
  // if (!payment_proof.value)
  //   return (payment_proof.style.border = "1px solid red");
  if (!payment_proof.files[0]) return (payment_proof.style.border = "2px solid red");

  const user = getCookie("user");
  const token = getCookie("token");
  const deposit_request = getParam();

  const formdata = new FormData();
  formdata.append("user", user);
  formdata.append("token", token);
  formdata.append("deposit_request", deposit_request);
  formdata.append("payment_proof", payment_proof.files[0]);
document.querySelector("#payment_proof").style.border="2px solid gray";
errMessage_container.innerHTML ="" 
submit_receipt(formdata);
};
