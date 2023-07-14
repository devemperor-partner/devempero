const handle_change_password = async (data) => {
  document.querySelector("#change_password").innerHTML = "proccessing";

  try {
    const response = await fetch("/api/user/update/update_password", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log(result);

    if (result.error) {
      document.querySelector("#password_error").innerHTML = result.errMessage;

      document.querySelector("#change_password").innerHTML = "Try again";
      return;
    }
    // document.querySelector("#userIcon").src = result.message;
    document.querySelector("#change_password").innerHTML = "Success";
  } catch (error) {
    document.querySelector("#password_error").innerHTML = error.message;
    document.querySelector("#change_password").innerHTML = "Try again";
  }
};






document.querySelector("#change_password").onclick = () => {
  const old_password = document.querySelector("#old_password");
  const new_password1 = document.querySelector("#new_password1");
  const new_password2 = document.querySelector("#new_password2");
  if (!old_password.value) return showRedBorder("old_password");
  if (!new_password1.value) return showRedBorder("new_password1");
  if (new_password1.value.length < 8)
    return (document.querySelector("#password_error").innerHTML =
      "password must be atleast 8 characters long");

  if (!new_password2.value) return showRedBorder("new_password2");
  if (new_password1.value != new_password2.value) {
    showRedBorder("new_password2");
    document.querySelector("#password_error").innerHTML =
      "password must match!";
    return;
  }
  document.querySelector("#password_error").innerHTML = "";
  const token = getCookie("token");
  const user = getCookie("user");

  handle_change_password({
    token,
    user,
    password: old_password.value,
    new_password: new_password1.value,
  });
};