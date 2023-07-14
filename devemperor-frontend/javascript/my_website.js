const errMessage_container = document.querySelector("#errMessage");

const create_app_element = (data) => {
  console.log("data", data);
  let col_lg_4_col_md_div = document.createElement("div");
  let card_pricing_div = document.createElement("div");
  let card_header_div = document.createElement("div");
  const charge_div = document.createElement("div");
  const card_body_div = document.createElement("div");
  const ul_list = document.createElement("ul");
  const name_li = document.createElement("li");
  const type_li = document.createElement("li");
  const category_li = document.createElement("li");
  const status_li = document.createElement("li");
  const payment_status_li = document.createElement("li");
  const errMessage_bg2 = document.createElement("li");
  const button = document.createElement("button");
  const edit_btn = document.createElement("a");

  col_lg_4_col_md_div.className = "col-lg-4 col-md";
  card_pricing_div.className =
    "card card-pricing text-center px-3 hover-scale-110";
  card_header_div.className = "card-header py-5 border-0 delimiter-bottom";
  charge_div.className = "h1 text-center mb-0";
  charge_div.innerHTML = data.charge
    ? `₦${data.charge.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
    : `₦...`;
  card_body_div.className = "card-body";
  ul_list.className = "list-unstyled text-sm mb-4";
  name_li.style.fontWeight = "bold";

  name_li.innerHTML = data.app_name.toUpperCase();
  type_li.innerHTML = `SOFTWARE TYPE: MOBILE APP`;
  category_li.innerHTML = `SOFTWARE CATEGORY: ${data.mobile_app_category}`;
  payment_status_li.innerHTML = `PAYMENT STATUS`;
  status_li.innerHTML = `DEVELOPMENT STATUS: ${data.development_status}`;
  payment_status_li.innerHTML = `PAYMENT STATUS: ${
    data.made_payment
      ? "<label style='color:green; font-weight:bold'>PAID</label>"
      : " <label style='color:green; font-weight:bold'>UNPAID</label>"
  }`;

  errMessage_bg2.className = "errMessage-bg2";
  errMessage_bg2.id = "errMessage-bg2";

  if (data.made_payment) {
    edit_btn.innerHTML =
      data.development_status == "PENDING"
        ? "edit App information"
        : "Request for App View";
    edit_btn.href =
      data.development_status == "PENDING" ? "edit" : data.website_link;
  } else {
    button.className = "btn btn-primary";
    button.innerHTML = "Pay with balance";
    data.charge
      ? (button.style.display = "block")
      : (button.style.display = "none");

    button.onclick = () =>
      handle_pay_for_mobileapp({
        button,
        App_ID: data._id,
        charge: data.charge,
        errMessage_bg2,
      });

    edit_btn.innerHTML =
      data.development_status == "PENDING"
        ? "edit website information"
        : "visit website";
    edit_btn.href =
      data.development_status == "PENDING" ? "edit" : "visit website";
  }

  ul_list.append(
    name_li,
    type_li,
    category_li,
    status_li,
    payment_status_li,

    errMessage_bg2,
    button,
    edit_btn,
  );
  card_body_div.append(ul_list);
  // card_pricing_div.append()
  card_pricing_div.append(card_header_div, card_body_div);
  card_header_div.append(charge_div);
  col_lg_4_col_md_div.append(card_pricing_div);

  document.querySelector("#card_container").append(col_lg_4_col_md_div);
};

const create_website_element = (data) => {
  console.log("data", data);
  let col_lg_4_col_md_div = document.createElement("div");
  let card_pricing_div = document.createElement("div");
  let card_header_div = document.createElement("div");
  const charge_div = document.createElement("div");
  const card_body_div = document.createElement("div");
  const ul_list = document.createElement("ul");
  const name_li = document.createElement("li");
  const type_li = document.createElement("li");
  const category_li = document.createElement("li");
  const status_li = document.createElement("li");
  const payment_status_li = document.createElement("li");
  // const comment_li = document.createElement("li");
  const errMessage_bg2 = document.createElement("li");
  const button = document.createElement("button");
  const edit_btn = document.createElement("a");

  col_lg_4_col_md_div.className = "col-lg-4 col-md";
  card_pricing_div.className =
    "card card-pricing text-center px-3 hover-scale-110";
  card_header_div.className = "card-header py-5 border-0 delimiter-bottom";
  charge_div.className = "h1 text-center mb-0";
  charge_div.innerHTML = data.charge
    ? `₦${data.charge.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
    : `₦...`;
  card_body_div.className = "card-body";
  ul_list.className = "list-unstyled text-sm mb-4";
  name_li.style.fontWeight = "bold";

  name_li.innerHTML = data.website_name.toUpperCase();
  type_li.innerHTML = `SOFTWARE TYPE: WEBSITE`;
  category_li.innerHTML = data.website_category
    ? `SOFTWARE CATEGORY: ${data.website_category}`
    : `SOFTWARE CATEGORY:UNSPECIFIED`;
  status_li.innerHTML = data.development_status
    ? `DEVELOPMENT STATUS: ${data.development_status}`
    : `UNSPECIFIED`;
  payment_status_li.innerHTML = `PAYMENT STATUS: ${
    data.made_payment
      ? "<label style='color:green; font-weight:bold'>PAID</label>"
      : " <label style='color:green; font-weight:bold'>UNPAID</label>"
  }`;
  errMessage_bg2.className = "errMessage-bg2";
  errMessage_bg2.id = "errMessage-bg2";
  if (data.made_payment) {
    edit_btn.innerHTML =
      data.development_status == "PENDING"
        ? "edit website information"
        : "visit website";
    edit_btn.href =
      data.development_status == "PENDING" ? "edit" : data.website_link;
  } else {
    button.className = "btn btn-primary";
    button.innerHTML = "Pay with balance";
    data.charge
      ? (button.style.display = "block")
      : (button.style.display = "none");

    button.onclick = () =>
      handle_pay_for_website({
        button,
        website_ID: data._id,
        charge: data.charge,
        errMessage_bg2,
      });

    edit_btn.innerHTML =
      data.development_status == "PENDING"
        ? "edit website information"
        : "visit website";
    edit_btn.href =
      data.development_status == "PENDING" ? "edit" : "visit website";
  }

  ul_list.append(
    name_li,
    type_li,
    category_li,
    status_li,
    payment_status_li,
    // comment_li,
    errMessage_bg2,
    button,
    edit_btn,
  );
  card_body_div.append(ul_list);
  // card_pricing_div.append()
  card_pricing_div.append(card_header_div, card_body_div);
  card_header_div.append(charge_div);
  col_lg_4_col_md_div.append(card_pricing_div);

  document.querySelector("#card_container").append(col_lg_4_col_md_div);
};

// const distribute_data = (data) => {
//   // console.log("data", data.app_informations.length);
//   if (data.app_informations.length >= 1) {
//     data.app_informations.forEach((element) => {
//       create_app_element(element);
//     });
//   }

//   if (data.website_informations.length >= 1) {
//     data.website_informations.forEach((element) => {
//       create_website_element(element);
//     });
//     // create_element(data.app_informations);
//   }
// };

const get_software_ID = () => {
  const urlParams = new URLSearchParams(location.search);

  for (const [key, value] of urlParams) {
    return key;
  }
};

(async () => {
  const user = getCookie("user");
  const token = getCookie("token");
  try {
    const response = await fetch(
      "/api/user/softwares/single",
      // "http://localhost:5000/api/user/find",

      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ token, user, software_ID: get_software_ID(),software_type:"website" }),
      },
    );
    const result = await response.json();
    // user_result = result.message;
    console.log(result);
    if (result.error) {
      errMessage_container.innerHTML = result.errMessage;
      errMessage_container.style.display = "block";
      return;
    } else {
     create_website_element(result.message);
    }
  } catch (error) {
    console.log(error);
    errMessage_container.innerHTML = error.message;
    errMessage_container.style.display = "block";
  }
})();
