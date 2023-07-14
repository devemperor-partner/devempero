const handle_pay_for_website = async (data) => {
  const user = getCookie("user");
  const token = getCookie("token");

  data.button.innerHTML = "Proccessing...";
  try {
    const response = await fetch(
      "/api/user/software/payment/website_payment",
      // "http://localhost:5000/api/user/find",

      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ token, user, website_ID:data.website_ID}),
      },
    );
    const result = await response.json();
    // user_result = result.message;
    console.log(result);
    if (result.error) {
      data.errMessage_bg2.innerHTML=result.errMessage
      data.errMessage_bg2.style.display="block"
      if(result.insufficient_fund)return (window.location.href = `deposit-fund.html?${data.charge}`);
      // errMessage_container.innerHTML = result.errMessage;
      // errMessage_container.style.display = "block";
      data.button.innerHTML = "Try Again";
      return;
    } else {
      data.button.innerHTML = "Success";
       location.reload();
    }
  } catch (error) {
    console.log(error);
    errMessage_container.innerHTML = error.message;
    errMessage_container.style.display = "block";
    data.button.innerHTML = "Try Again";
  }
};






const handle_pay_for_mobileapp = async (data) => {
  const user = getCookie("user");
  const token = getCookie("token");

  data.button.innerHTML = "Proccessing...";
  try {
    const response = await fetch(
      "/api/user/software/payment/app_payment",
      // "http://localhost:5000/api/user/find",

      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ token, user, App_ID: data.App_ID }),
      },
    );
    const result = await response.json();
    // user_result = result.message;
    console.log(result);
    if (result.error) {
        data.errMessage_bg2.innerHTML = result.errMessage;
        data.errMessage_bg2.style.display = "block";
      data.button.innerHTML = "Try Again";
            if (result.insufficient_fund)
              return (window.location.href = `deposit-fund.html?${data.charge}`);

      return;
    } else {
      data.button.innerHTML = "Success";
      location.reload()
    }
  } catch (error) {
    console.log(error);
    errMessage_container.innerHTML = error.message;
    errMessage_container.style.display = "block";
    data.button.innerHTML = "Try Again";
  }
};
