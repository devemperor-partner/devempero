const available_date = document.querySelector("#available_date");
const available_time = document.querySelector("#available_time");
const anti_phishing_code = document.querySelector("#anti_phishing_code");

const getParam = () => {
  const urlParams = new URLSearchParams(location.search);

  for (const [key, value] of urlParams) {
    return key;
  }
};

const schedule_app_conversation_time = async (data) => {
  document.querySelector("#submit").value = "Proccessing...";
  errMessage_container.style.display = "none";

  try {
    const response = await fetch(
      "/api/user/schedule_app_conversation_time",
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
      errMessage_container.innerHTML = result.errMessage;
      document.querySelector("#submit").value = "Try again";

      return;
    }
    document.querySelector("#submit").value = "Success";
    // window.location.href = `mobileapp-informations.html?${result.message}`;
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

document.addEventListener("DOMContentLoaded", () => {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  document
    .querySelector("#available_date")
    .setAttribute("min", date.toISOString().split("T")[0]);

  //   document
  //     .querySelector("#available_time")
  //     .setAttribute("min", new Date().getTime().toISOString().split("T")[0]);
});

document.querySelector("#submit").onclick = () => {
  if (!available_date.value)
    return (available_date.style.border = "2px solid red");
  if (!available_time.value)
    return (available_time.style.border = "2px solid red");
  if (!anti_phishing_code)
    return (anti_phishing_code.style.border = "2px solid red");

  schedule_app_conversation_time({
    user: getCookie("user"),
    token: getCookie("token"),
    appID: getParam(),
    available_date: available_date.value,
    available_time: available_time.value,
    anti_phishing_code: anti_phishing_code.value,
  });
};
