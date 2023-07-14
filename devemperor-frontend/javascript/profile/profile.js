const openImageButton = document.querySelector("#open_images");
const showRedBorder = (item) => {
  document.querySelector(`#${item}`).style.border = "2px solid red";
};

const handle_change_profile = async (data) => {
  try {
    const response = await fetch("/api/user/update/changeUserProfile", {
      method: "POST",
      body: data,
    });
    const result = await response.json();
    console.log(result);

    if (result.error) {
      document.querySelector("#input_error_message").innerHTML =
        result.errMessage;

      document.querySelector("#change_profile").innerHTML = "Try again";
      return;
    }
    document.querySelector("#userIcon").src = result.message;
    document.querySelector("#change_profile").innerHTML = "Success";
  } catch (error) {
    document.querySelector("#input_error_message").innerHTML = error.message;
    document.querySelector("#change_profile").innerHTML = "Try again";
  }
};

document.querySelector("#change_profile").onclick = () => {
  openImageButton.click();
};

openImageButton.onchange = () => {
  document.querySelector("#change_profile").innerHTML = "updating photo...";
  document.querySelector("#input_error_message").innerHTML = "";

  const token = getCookie("token");
  const user = getCookie("user");
  // console.log(openImageButton.files[0]);
  const formdata = new FormData();
  formdata.append("token", token);
  formdata.append("user", user);
  formdata.append("profile_photo", openImageButton.files[0]);
  handle_change_profile(formdata);
};
























document.querySelectorAll("input").forEach(
  (input) =>
    (input.onkeyup = () => {
      input.style.border = "1px solid gray";
    }),
);
