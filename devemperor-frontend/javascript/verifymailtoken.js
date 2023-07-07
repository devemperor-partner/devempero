(async (data) => {
  //   document.querySelector("#submit").innerHTML = "Proccessing...";
  //   errMessage_container.style.display = "none";
  const verification_link = window.location.href;
  try {
    const response = await fetch(
      "/api/user/verify_account",
      // "http://localhost:5000/api/user/find",

      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ verification_link }),
      },
    );
    const result = await response.json();
    console.log(result);
    if (result.error) {
      //
      // window.confirm(`${result.errMessage}`);
      document.querySelector(".mail_success").style.display = "block";
      document.querySelector(".mail_success").innerHTML = result.errMessage;
      document.querySelector(".loading").style.display = "none";
      window.location.replace(`login.html`);

      return;
    }
    document.querySelector(".mail_success").style.display = "block";
    document.querySelector(".mail_success").innerHTML = result.message;
    document.querySelector(".loading").style.display = "none";
    window.location.replace(`login.html`);
  } catch (error) {
    document.querySelector(".mail_success").style.display = "block";
    document.querySelector(".mail_success").innerHTML = error.message;
    document.querySelector(".loading").style.display = "none";
    window.location.replace(`login.html`);
  }
})();
