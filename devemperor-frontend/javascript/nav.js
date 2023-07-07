const getCookie = (cname) => {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  // return "";
  window.location.href = "/login.html";
};

document.querySelector("#cancel").onclick = () => {
  document.querySelector("#nav").className = "nav-hide";
};

document.querySelector("#harmburger").onclick = () => {
  document.querySelector("#nav").className = "nav-show";
};

document.querySelector("#ring-icon").onclick = () => {
  const notification_box = document.querySelector("#notification-box");

  if (notification_box.className != "no_notification-box")
    return (notification_box.className = "no_notification-box");
  notification_box.className = "notification-box";
};

document.querySelector("#user_box_icon").onclick = () => {
  const userdropbox = document.querySelector("#userdropbox");
  if (userdropbox.className != "no_userdropbox")
    return (userdropbox.className = "no_userdropbox");
  userdropbox.className = "userdropbox";
};



const logUserOut = () => {
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 jan 1970 00:00:00 GMT";
  }

  window.location.replace("login.html");
};

document.querySelector("#logoutBtn").onclick = () => logUserOut();


(() => {
  const account_is_verified = getCookie("account_isverified");
  if (account_is_verified != "true")
    return window.location.replace("confirm-email.html");
})();
