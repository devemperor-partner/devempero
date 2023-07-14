const select_element = (element) => {
  return document.querySelector(`#${element}`);
};

const handle_set_dashboard = (data) => {
  select_element("full-name").innerHTML = data.full_name;
  // select_element("person-image").src = data.user_icon;
  document
    .querySelectorAll("#person-image")
    .forEach((user_icon) => (user_icon.src = data.user_icon));
  // select_element("naira-sign").innerHTML = "₦";
  // select_element("user_balance").innerHTML = `${data.final_balance}.0`;
  // select_element("softwares").innerHTML = data.softwares;
  // select_element("courses").innerHTML = data.courses;
  // select_element("referral_link").innerHTML = data.referral_link;
};

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
      document.querySelector("#errMessage").innerHTML = result.errMessage;
      errMessage_container.style.display = "block";
    } else {
      handle_set_dashboard(result.message);
      //   document.querySelector("#email").href = `mailto:${result.message.Email}`;
      //   document.querySelector("#email").innerHTML = `${result.message.Email}`;
      //   setText(result.message);
      //   if (document.querySelector("#wallet_balance"))
      //     document.querySelector(
      //       "#wallet_balance",
      //     ).innerHTML = `Final Balance: $${result.message.final_balance}`;
    }
  } catch (error) {
    document.querySelector("#errMessage").innerHTML = error.message;
    errMessage_container.style.display = "block";
  }
})();
