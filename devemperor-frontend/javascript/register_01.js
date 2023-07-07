const register_user = async (form) => {
  try {
    const response = await fetch("/api/user/register", {
      method: "POST",
      body: formdata,
      //   headers: { "content-type": "application/json" },
      //   body:JSON.stringify(form)
    });
    const result = await response.json();
    console.log(result);
  } catch (error) {
    display_given_error(error.message);
  }
};
