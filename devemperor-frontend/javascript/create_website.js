const domain_name = document.querySelector("#domain_name");
const website_name = document.querySelector("#website_name");

const errMessage_container = document.querySelector("#errMessage");

const create_website = async (data) => {
  document.querySelector("#submit").value = "Proccessing...";
  errMessage_container.style.display = "none";

  try {
    const response = await fetch(
      "/api/user/create_website",
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
    window.location.href = `website-informations.html?${result.message}`;
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
  // if (!domain_name.value) return (domain_name.style.border = "2px solid red");
  if (!website_name.value) return (website_name.style.border = "2px solid red");
  create_website({
    //    app_name: app_name.value,
    token: getCookie("token"),
    user: getCookie("user"),
    domain_name: domain_name.value,
    website_name: website_name.value,
  });
};

// document.querySelector("#skip").onclick = () => {
// //   if (!domain_name.value) return (domain_name.style.border = "2px solid red");

//  create_website({
// //    app_name: app_name.value,
//    token: getCookie("token"),
//    user: getCookie("user"),
//  });
// };
//

//

document.querySelectorAll("input").forEach((input) => {
  input.onkeyup = () => {
    errMessage_container.style.display = "none";
    input.style.border = "1px solid gray";
  };
});
