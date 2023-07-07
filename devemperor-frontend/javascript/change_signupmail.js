const errMessage_container = document.querySelector("#errMessage");



const change_signupmail = async (data) => {
  document.querySelector("#submit").innerHTML = "Proccessing...";
  errMessage_container.style.display = "none";

  try {
    const response = await fetch(
      "/api/user/change_signupmail",
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
    //   document.querySelector(".email_message").innerHTML = "";
      errMessage_container.innerHTML = result.errMessage;
      errMessage_container.style.display = "block";
      document.querySelector("#submit").innerHTML = "Try again";

      return;
    }
    document.querySelector("#submit").innerHTML = "Success";
    window.location.replace("confirm-email.html");
    // document.querySelector(".mail_success").innerHTML = result.message;
    // document.querySelector(".mail_success").style.display = "block";
    // setTimeout(() => {
    //   document.querySelector(".mail_success").style.display = "none";
    // }, 6000);
  } catch (error) {
    // document.querySelector(".email_message").innerHTML = "";
    // errMessage_container.innerHTML = error.message;
    // errMessage_container.style.display = "block";
    document.querySelector("#submit").innerHTML = "Try again";
  }
};

document.querySelector("#submit").onclick = () => {
  event.preventDefault();
  const email = document.querySelector("#email");
  if (!email.value) {
    email.style.border = "1px solid red";
    return;
  }
  const user = getCookie("user");
  const token = getCookie("token");
  change_signupmail({
    user,
    token,
    Email: email.value,
  });
};



document.querySelectorAll("input").forEach((input) => {
//   document.querySelector(".errMessage").innerHTML = "";
  input.onkeyup = () => (input.style.border = "0.1px solid #fff");
});