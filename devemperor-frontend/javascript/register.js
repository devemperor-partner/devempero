const show_input_error = (input) => {
  input.style.border = "2px solid red";
};
const hide_input_error = (input) => {
  input.style.border = "2px solid gray";
};

// const display_given_error = (given_error) => {
//   if (window.innerWidth <= 500) {
//     document.querySelector("#errMessage_02").innerHTML = given_error;
//     document.querySelector("#errMessage_01").innerHTML = "";
//   } else {
//     document.querySelector("#errMessage_02").innerHTML = "";
//     document.querySelector("#errMessage_01").innerHTML = given_error;
//   }
// };
const getReferral = () => {
  const urlParams = new URLSearchParams(location.search);

  for (const [key, value] of urlParams) {
    return key;
  }
};

function setCookie(user, token) {
  // alert("called")
  console.log(user);
  const d = new Date();
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  // document.cookie=`email=${email} ; ${expires}`
  document.cookie = `user=${user} ; ${expires}`;
  document.cookie = `token=${token} ; ${expires}`;
    document.cookie = `account_isverified=${false} ; ${expires}`;


  window.location.replace("confirm-email.html");
}

const register_user = async (data) => {
  try {
    document.querySelector("#register").innerHTML = "Proccessing...";

    const response = await fetch("/api/user/register", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (result.error) {
      document.querySelector(".errMessage").innerHTML = result.errMessage;
      document.querySelector("#register").innerHTML = "Try again";
      return;
    }
    document.querySelector("#register").innerHTML = "success";
    return setCookie(result.message.user, result.token);
  } catch (error) {
    document.querySelector("#errMessage").innerHTML = error.message;
    document.querySelector("#register").innerHTML = "Try again";
  }
};

document.querySelector("#register").onclick = () => {
  event.preventDefault();

  const full_name = document.querySelector("#full_name");
  const Email = document.querySelector("#Email");
  const phone_number = document.querySelector("#phone_number");
  const password = document.querySelector("#password");
  const confirm_password = document.querySelector("#confirm_password");

  if (!full_name.value) return show_input_error(full_name);
  if (!Email.value) return show_input_error(Email);
  if (!phone_number.value) return show_input_error(phone_number);
  if (!password.value) return show_input_error(password);
  if (password.value.length < 8) {
     show_input_error(password);
     document.querySelector("#passworderror").innerHTML="Password must be atleast 8 characters long";
     return;
  }
  if (!confirm_password.value) return show_input_error(confirm_password);
  if (password.value != confirm_password.value) {
    // show_input_error(password);
    show_input_error(confirm_password);
    document.querySelector("#errMessage").innerHTML = "Password must match";
    return;
  }

  const referral = getReferral();
  register_user({
    full_name: full_name.value,
    Email: Email.value,
    phone_number: phone_number.value,
    password: password.value,
    referral,
  });
};

document.querySelectorAll("input").forEach((input) => {
  input.onkeyup = () =>{
      document.querySelector("#passworderror").innerHTML=""
            document.querySelector("#errMessage").innerHTML = "";

hide_input_error(input)

  }
});

// document.querySelectorAll("input").forEach((input) => {
//   input.onkeyup = () => hide_input_error(input);
// });
