const errMessage_container = document.querySelector("#errMessage");

// const getCookie = (cname) => {
//   let name = cname + "=";
//   let decodedCookie = decodeURIComponent(document.cookie);
//   let ca = decodedCookie.split(";");
//   for (let i = 0; i < ca.length; i++) {
//     let c = ca[i];
//     while (c.charAt(0) == " ") {
//       c = c.substring(1);
//     }
//     if (c.indexOf(name) == 0) {
//       return c.substring(name.length, c.length);
//     }
//   }
//   // return "";
//   window.location.href = "/login.html";
// };

(async () => {
  const user = getCookie("user");
  const token = getCookie("token");
  try {
    const response = await fetch(
      "/api/users/myaccount",
      // "http://localhost:5000/api/user/find",

      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ token, user }),
      },
    );
    const result = await response.json();
    // user_result = result.message;
    console.log(result);
    if (result.error) {
      document.querySelector(".email_message").innerHTML = "";
      errMessage_container.innerHTML = result.errMessage;
      errMessage_container.style.display = "block";
    } else {
      document.querySelector("#email").href = `mailto:${result.message.Email}`;
      document.querySelector("#email").innerHTML = `${result.message.Email}`;

      // alert(result.message.account_is_verified);
      if (result.message.account_is_verified == true) {
        const d = new Date();
        d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
        let expires = "expires=" + d.toUTCString();
        document.cookie = `account_isverified=${true} ; ${expires}`;
        window.location.replace("dashboard.html");
      }
      //   setText(result.message);
      //   if (document.querySelector("#wallet_balance"))
      //     document.querySelector(
      //       "#wallet_balance",
      //     ).innerHTML = `Final Balance: $${result.message.final_balance}`;
    }
  } catch (error) {
    // alert(error.message);
    document.querySelector(".email_message").innerHTML = "";
    errMessage_container.innerHTML = error.message;
    errMessage_container.style.display = "block";
  }
})();

const resend_link = async () => {
  document.querySelector("#resend_link").innerHTML = "Proccessing...";
  document.querySelector(".mail_success").style.display = "none";
  errMessage_container.style.display = "none";

  try {
    const user = getCookie("user");
    const token = getCookie("token");

    const response = await fetch(
      "/api/user/resendlink",
      // "http://localhost:5000/api/user/find",

      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ token, user }),
      },
    );
    const result = await response.json();
    console.log(result);
    if (result.error) {
      document.querySelector(".email_message").innerHTML = "";
      errMessage_container.innerHTML = result.errMessage;
      errMessage_container.style.display = "block";
      document.querySelector("#resend_link").innerHTML = "Try again";

      return;
    }
    document.querySelector("#resend_link").innerHTML = "Email Sent";
    document.querySelector(".mail_success").innerHTML = result.message;
    document.querySelector(".mail_success").style.display = "block";
    setTimeout(() => {
      document.querySelector(".mail_success").style.display = "none";
    }, 6000);
  } catch (error) {
    document.querySelector(".email_message").innerHTML = "";
    errMessage_container.innerHTML = error.message;
    errMessage_container.style.display = "block";
    document.querySelector("#resend_link").innerHTML = "Try again";
  }
};

document.querySelector("#resend_link").onclick = () => {
  event.preventDefault();
  resend_link();
};
