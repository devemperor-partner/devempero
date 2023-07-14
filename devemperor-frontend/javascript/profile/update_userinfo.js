const handle_update_user_information = async (data) => {
  select_element("update_user_info").innerHTML = "proccessing";

  try {
    const response = await fetch("/api/user/update", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log(result);

    if (result.error) {
      document.querySelector("#password_error").innerHTML = result.errMessage;

      select_element("update_user_info").innerHTML = "Try again";
      return;
    }
    // document.querySelector("#userIcon").src = result.message;
    select_element("update_user_info").innerHTML = "Success";
  } catch (error) {
    document.querySelector("#password_error").innerHTML = error.message;
    select_element("update_user_info").innerHTML = "Try again";
  }
};

document.querySelector("#update_user_info").onclick = () => {
  select_element("input_error_message").innerHTML = "";
  const full_name = select_element("full_name");
  const email = select_element("email");
  const phone_number = select_element("phone_number");

  if (!full_name.value) return showRedBorder("full_name");
  if (full_name.value.length < 3) {
    select_element("input_error_message").innerHTML =
      "Full Name must be a valid Name";
    showRedBorder("full_name");
    return;
  }
  if (!email.value) return showRedBorder("email");
  if (!phone_number.value) return showRedBorder("phone_number");

  const token = getCookie("token");
  const user = getCookie("user");

  handle_update_user_information({
    token,
    user,
    full_name: full_name.value,
    email: email.value,
    phone_number: phone_number.value,
  });
};
