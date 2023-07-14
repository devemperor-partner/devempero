const select_element = (element) => {
  return document.querySelector(`#${element}`);
};

const handle_set_dashboard = (data) => {
  select_element("full-name").innerHTML = data.full_name;
  // select_element("person-image").src = data.user_icon;
  document
    .querySelectorAll("#person-image")
    .forEach((user_icon) => (user_icon.src = data.user_icon));
  select_element("full_name").value = data.full_name;
  select_element("email").value = data.Email;
  select_element("phone_number").value = data.phone_number;
  if (data.changed_mail) {
    select_element("email_label").innerHTML = "Unverified";
    select_element("send_verification_link").innerHTML =
      "Send Verification Link";
  } else {
    select_element("email_label").innerHTML = "Verified";
    select_element("send_verification_link").innerHTML = "";
    select_element("send_verification_link").style.display = "none";
  }
  //   changed_mail;
};

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

select_element("send_verification_link").onclick = () => {};
