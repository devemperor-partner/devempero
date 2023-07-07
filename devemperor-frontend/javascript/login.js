function setCookie(user, token, account_isverified) {
  // alert("called")
  console.log(user);
  const d = new Date();
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  // document.cookie=`username=${username} ; ${expires}`
  document.cookie = `user=${user} ; ${expires}`;
  document.cookie = `token=${token} ; ${expires}`;
  document.cookie = `account_isverified=${account_isverified} ; ${expires}`;
  // window.location.replace("dashboard.html");
}
const show_input_error = (input) => {
  input.style.border = "2px solid red";
};

const loginUser = async (Email, password) => {
  try {
    document.querySelector("#login").innerHTML = "proccessing...";
    const response = await fetch(
      // "http://localhost:5000/api/user/login",
      "/api/user/login",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ Email, password }),
      },
    );
    const result = await response.json();
    console.log(result);
    if (result.error) {
      document.querySelector(".errMessage").innerHTML = result.errMessage;
      document.querySelector("#login").innerHTML = "try again";
      return;
    }
    document.querySelector("#login").innerHTML = "success";
    setCookie(
      result.message.user,
      result.token,
      result.message.account_is_verified,
    );

    if (result.message.account_is_verified != true) {
      window.location.replace("confirm-email.html");
    } else {
      window.location.replace("dashboard.html");
    }
  } catch (err) {
    document.querySelector(".errMessage").innerHTML = err.message;
    document.querySelector("#login").innerHTML = "try again";
  }
};

// document.addEventListener("DOMContentLoaded", () => {
document.querySelector("#login").onclick = () => {
  event.preventDefault();
  const Email = document.querySelector("#Email");
  const password = document.querySelector("#password");
  if (!Email.value) return show_input_error(Email);
  if (!password.value) return show_input_error(password);
  if (password.value.length < 8)
    return (document.querySelector(".errMessage").innerHTML =
      "Password must be greater than 8 characters");

  document.querySelector(".errMessage").innerHTML = "";

  loginUser(Email.value, password.value);
};

document.querySelectorAll("input").forEach((input) => {
  document.querySelector(".errMessage").innerHTML = "";
  input.onkeyup = () => (input.style.border = "0.1px solid #fff");
});
// });

// const get_verification_message = (cname) => {
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
//   return "";
//   // window.location.href = "/login.html";
// };

// (() => {
//   const verification_message = get_verification_message("verification_message");
//   if (verification_message.length > 1) {
//     document.querySelector("#verification_message").innerHTML =
//       verification_message;
//     document.querySelector("#verification_message").style.display = "block";
//     setTimeout(() => {
//       document.querySelector("#verification_message").style.display = "none";
//     }, 6000);
//   }
// })();
