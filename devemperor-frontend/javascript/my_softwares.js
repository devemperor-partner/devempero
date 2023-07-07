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
  const button = document.createElement("button");

  col_lg_4_col_md_div.className = "col-lg-4 col-md";
  card_pricing_div.className =
    "card card-pricing text-center px-3 hover-scale-110";
  card_header_div.className = "card-header py-5 border-0 delimiter-bottom";
  charge_div.className = "h1 text-center mb-0";
  charge_div.innerHTML = data.charge ? `₦${data.charge}` : `UNAVAILABLE`;
  card_body_div.className = "card-body";
  ul_list.className = "list-unstyled text-sm mb-4";

  ul_list.append(name_li, type_li, category_li, status_li, button);
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
  const button = document.createElement("button");

  col_lg_4_col_md_div.className = "col-lg-4 col-md";
  card_pricing_div.className =
    "card card-pricing text-center px-3 hover-scale-110";
  card_header_div.className = "card-header py-5 border-0 delimiter-bottom";
  charge_div.className = "h1 text-center mb-0";
  charge_div.innerHTML = data.charge ? `₦${data.charge}` : `UNAVAILABLE`;
  card_body_div.className = "card-body";
  ul_list.className = "list-unstyled text-sm mb-4";
  name_li.style.fontWeight = "bold";

  name_li.innerHTML = data.website_name;
  type_li.innerHTML = `SOFTWARE TYPE: WEBSITE`;
  category_li.innerHTML = `SOFTWARE CATEGORY: ${data.website_category.toUpperCase()}`;
   status_li.innerHTML = `DEVELOPMENT STATUS: ${data.development_status}`;

  ul_list.append(name_li, type_li, category_li, status_li, button);
  card_body_div.append(ul_list);
  // card_pricing_div.append()
  card_pricing_div.append(card_header_div, card_body_div);
  card_header_div.append(charge_div);
  col_lg_4_col_md_div.append(card_pricing_div);

  document.querySelector("#card_container").append(col_lg_4_col_md_div);
};

const distribute_data = (data) => {
  // console.log("data", data.app_informations.length);
  if (data.app_informations.length >= 1) {
    data.app_informations.forEach((element) => {
      create_app_element(element);
    });
  }

  if (data.website_informations.length >= 1) {
    data.website_informations.forEach((element) => {
      create_website_element(element);
    });
    // create_element(data.app_informations);
  }
};

(async () => {
  const user = getCookie("user");
  const token = getCookie("token");
  try {
    const response = await fetch(
      "/api/user/softwares",
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
      errMessage_container.innerHTML = result.errMessage;
      errMessage_container.style.display = "block";
      return
    } else {
      distribute_data(result.message);
    }
  } catch (error) {
    errMessage_container.innerHTML = error.message;
    errMessage_container.style.display = "block";
  }
})();
