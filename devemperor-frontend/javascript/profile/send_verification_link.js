const handle_send_verification_link = async (data) => {
  select_element("send_verification_link").innerHTML = "proccessing";

  try {
    const response = await fetch("/api/user/send_verification_link", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log(result);

    if (result.error) {
      document.querySelector("#verification_mail_error").innerHTML =
        result.errMessage;

      select_element("send_verification_link").innerHTML = "Try again";
      return;
    }
    // document.querySelector("#userIcon").src = result.message;
    select_element("send_verification_link").innerHTML = "Success";
  } catch (error) {
    document.querySelector("#verification_mail_error").innerHTML =
      error.message;
    select_element("send_verification_link").innerHTML = "Try again";
  }
};

select_element("send_verification_link").onclick = () => {
  // alert("hey");
  const user = getCookie("user");
  const token = getCookie("token");

  handle_send_verification_link({ user, token });
};

// verification_mail_error;
