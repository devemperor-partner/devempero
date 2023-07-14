//

const errMessage_container = document.querySelector("#errMessage");

const list_courses = (data) => {
  data.forEach((data) => {
    console.log("data", data);
    let col_lg_4_col_md_div = document.createElement("div");
    let card_pricing_div = document.createElement("div");
    let card_header_div = document.createElement("div");
    const course_price_div = document.createElement("div");
    const card_body_div = document.createElement("div");
    const ul_list = document.createElement("ul");
    const name_li = document.createElement("li");
    const type_li = document.createElement("li");
    const classes = document.createElement("li");
    const status_li = document.createElement("li");
      const errMessage_bg2 = document.createElement("li");

    const button = document.createElement("button");
    const purchase_btn = document.createElement("button");

    col_lg_4_col_md_div.className = "col-lg-4 col-md";
    card_pricing_div.className =
      "card card-pricing text-center px-3 hover-scale-110";
    card_header_div.className = "card-header py-5 border-0 delimiter-bottom";
    course_price_div.className = "h1 text-center mb-0";
    course_price_div.innerHTML = data.course_price
      ? `₦${data.course_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
      : `₦...`;
    card_body_div.className = "card-body";
    ul_list.className = "list-unstyled text-sm mb-4";
    name_li.style.fontWeight = "bold";

    name_li.innerHTML = data.development_category;
    type_li.innerHTML = `COURSE NAME: ${
      data.development_category == "Special Course"
        ? data.special_courses
        : data.development_category
    }`;
    classes.innerHTML = `Classes: ${data.presence}`;
    // ? `SOFTWARE CATEGORY: ${data.website_category}`
    // : `SOFTWARE CATEGORY:UNSPECIFIED`;
    // status_li.innerHTML = data.development_status
    //   ? `DEVELOPMENT STATUS: ${data.development_status}`
    //   : `UNSPECIFIED`;

    button.className = "btn btn-primary";
    button.innerHTML = "Start Learning";
    data.paid_for_course
      ? (button.style.display = "block")
      : (button.style.display = "none");

    purchase_btn.className = "btn btn-primary";
    purchase_btn.innerHTML = "Purchase Course";
    data.paid_for_course
      ? (purchase_btn.style.display = "none")
      : (purchase_btn.style.display = "block");
    purchase_btn.onclick = () =>
      handle_purchase_course({
        course_ID: data._id,
        button: purchase_btn,
        errMessage_bg2,
        course_price: data.course_price,
      });
    // data.development_status == "PENDING"
    //   ? "edit website information"
    //   : "visit website";
    // purchase_btn.href =
    //   data.development_status == "PENDING" ? "edit" : "visit website";

    errMessage_bg2.className = "errMessage-bg2";
    errMessage_bg2.id = "errMessage-bg2";

    ul_list.append(name_li, type_li, classes, status_li,errMessage_bg2, button, purchase_btn);
    card_body_div.append(ul_list);
    // card_pricing_div.append()
    card_pricing_div.append(card_header_div, card_body_div);
    card_header_div.append(course_price_div);
    col_lg_4_col_md_div.append(card_pricing_div);

    document.querySelector("#card_container").append(col_lg_4_col_md_div);
  });
};

// const distribute_data = (data) => {
//   console.log(data);
//     // console.log("data", data.app_informations.length);
//     if (data.app_informations.length >= 1) {
//       data.app_informations.forEach((element) => {
//         create_app_element(element);
//       });
//     }

//     data.message

//   //   if (data.website_informations.length >= 1) {
//   //     data.website_informations.forEach((element) => {
//   //       create_website_element(element);
//   //     });
//   //     // create_element(data.app_informations);
//   //   }
// };

(async () => {
  const user = getCookie("user");
  const token = getCookie("token");
  try {
    const response = await fetch(
      "/api/codig_courses/fetch",
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
      return;
    } else {
      list_courses(result.message);
    }
  } catch (error) {
    console.log(error);
    errMessage_container.innerHTML = error.message;
    errMessage_container.style.display = "block";
  }
})();
