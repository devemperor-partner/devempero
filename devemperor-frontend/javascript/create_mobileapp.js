const app_name = document.querySelector("#app_name");
const errMessage_container = document.querySelector("#errMessage");

const create_mobile_app = async (data) => {
  document.querySelector("#submit").value = "Proccessing...";
  errMessage_container.style.display = "none";

  try {
    const response = await fetch(
      "/api/user/create_app",
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
    window.location.href = `mobileapp-informations.html?${result.message}`;
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
  if (!app_name.value) return (app_name.style.border = "2px solid red");
  if (app_name.value.length < 3) {
    // errMessage_container.value = ;
    errMessage_container.style.display = "block";
    errMessage_container.innerHTML =
      "App Name can't be lesser than 3 characters.";
    return;
  }
  create_mobile_app({
    app_name: app_name.value,
    token: getCookie("token"),
    user: getCookie("user"),
  });
};

document.querySelectorAll("input").forEach((input) => {
  input.onkeyup = () => {
    errMessage_container.style.display = "none";
    input.style.border = "1px solid gray";
  };
});
