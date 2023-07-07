// const app_name = document.querySelector("#app_name");
const errMessage_container = document.querySelector("#errMessage");

const getParam = () => {
  const urlParams = new URLSearchParams(location.search);

  for (const [key, value] of urlParams) {
    return key;
  }
};

const selectInput = (input) => {
  return document.querySelector(input);
};

//variables
const website_category = selectInput("#website_category");
const Would_you_need_a_mobile_app_for_this_website_later = selectInput(
  "#would_you_need_a_mobile_app_later",
);
// const Do_you_want_this_mobile_app_to_be_made_available_on_playstore =
//   selectInput("#Do_you_want_this_mobile_app_to_be_made_available_on_playstore");

const What_is_your_budget_for_this_project = selectInput(
  "#What_is_your_budget_for_this_project",
);

// const Mobile_Operating_System = selectInput("#Mobile_Operating_System");
const What_is_your_business_about = selectInput("#what_is_your_business_about");
Why_do_you_need_a_website = selectInput("#Why_do_you_need_a_website");
const Who_is_your_target_audience = selectInput("#Who_is_your_target_audience");
const what_will_make_this_website_stand_out_the_competition = selectInput(
  "#what_will_make_this_website_stand_out_the_competition",
);

const who_are_your_top_competitors = selectInput(
  "#who_are_your_top_competitors",
);

const What_would_you_like_to_have_on_your_website_regarding_to_branding_and_styling =
  selectInput(
    "#What_would_you_like_to_have_on_your_website_regarding_to_branding_and_styling",
  );

const sample_link = selectInput("#sample_link");

const Organization_Name = selectInput("#organization_name");
const Organization_Phone_Number = selectInput("#organization_phone_number");
const Personal_Phone_Number = selectInput("#personal_phone_number");
const Whatsapp_Number = selectInput("#Whatsapp_Number");
const website_owner = selectInput("#website_owner");

const update_website_information = async (data) => {
  document.querySelector("#submit").value = "Proccessing...";
  errMessage_container.style.display = "none";

  try {
    const response = await fetch(
      "/api/user/update_website_information",
      // "http://localhost:5000/api/user/find",

      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      },
    );
    const result = await response.json();
    console.log(result);
    if (result.error) {
      errMessage_container.value = result.errMessage;
      errMessage_container.style.display = "block";
      errMessage_container.innerHTML = result.errMessage;
      document.querySelector("#submit").value = "Try again";

      return;
    }
    document.querySelector("#submit").value = "Success";
    // window.location.href = `mobileapp-informations.html?${result.message}`;
    // document.querySelector(".mail_success").innerHTML = result.message;
    // document.querySelector(".mail_success").style.display = "block";
    // setTimeout(() => {
    //   document.querySelector(".mail_success").style.display = "none";
    // }, 6000);
  } catch (error) {
    // document.querySelector(".email_message").innerHTML = "";
    errMessage_container.innerHTML = error.message;
    errMessage_container.style.display = "block";
    document.querySelector("#submit").value = "Try again";
  }
};

document.querySelector("#submit").onclick = () => {
  if (!website_category.value)
    return (website_category.style.border = "2px solid red");

  if (!Would_you_need_a_mobile_app_for_this_website_later.value)
    return (Would_you_need_a_mobile_app_for_this_website_later.style.border =
      "2px solid red");

  // if (!Do_you_want_this_mobile_app_to_be_made_available_on_playstore.value)
  //   return (Do_you_want_this_mobile_app_to_be_made_available_on_playstore.style.border =
  //     "2px solid red");

  if (!What_is_your_budget_for_this_project.value)
    return (What_is_your_budget_for_this_project.style.border =
      "2px solid red");

  // if (!Mobile_Operating_System.value)
  //   return (Mobile_Operating_System.style.border = "2px solid red");

  if (!What_is_your_business_about.value)
    return (What_is_your_business_about.style.border = "2px solid red");
  if (!Personal_Phone_Number.value)
    return (Personal_Phone_Number.style.border = "2px solid red");
  if (!Whatsapp_Number.value)
    return (Whatsapp_Number.style.border = "2px solid red");

  if (!website_owner.value) return (website_owner.style.border = "2px solid red");

  update_website_information({
    websiteID: getParam(),
    token: getCookie("token"),
    user: getCookie("user"),
    website_category: website_category.value,
    Would_you_need_a_mobile_app_for_this_website_later:
      Would_you_need_a_mobile_app_for_this_website_later.value,

    // Do_you_want_this_mobile_app_to_be_made_available_on_playstore:
    //   Do_you_want_this_mobile_app_to_be_made_available_on_playstore.value,

    What_is_your_budget_for_this_project:
      What_is_your_budget_for_this_project.value,

    // Mobile_Operating_System: Mobile_Operating_System.value,

    What_is_your_business_about: What_is_your_business_about.value,

    Why_do_you_need_a_website: Why_do_you_need_a_website.value,

    Who_is_your_target_audience: Who_is_your_target_audience.value,

    what_will_make_this_website_stand_out_the_competition:
      what_will_make_this_website_stand_out_the_competition.value,

    who_are_your_top_competitors: who_are_your_top_competitors.value,

    What_would_you_like_to_have_on_your_website_regarding_to_branding_and_styling:
      What_would_you_like_to_have_on_your_website_regarding_to_branding_and_styling.value,

    sample_link: sample_link.value,

    Organization_Name: Organization_Name.value,
    Organization_Phone_Number: Organization_Phone_Number.value,
    Personal_Phone_Number: Personal_Phone_Number.value,
    Whatsapp_Number: Whatsapp_Number.value,
    website_owner: website_owner.value,
  });
};

document.querySelectorAll("input").forEach((input) => {
  input.onkeyup = () => {
    errMessage_container.style.display = "none";
    input.style.border = "1px solid gray";
  };
});

document.querySelectorAll("select").forEach((select) => {
  select.onchange = () => {
    errMessage_container.style.display = "none";
    select.style.border = "1px solid gray";
  };
});

document.querySelectorAll("textarea").forEach((textarea) => {
  textarea.onkeyup = () => {
    errMessage_container.style.display = "none";
    textarea.style.border = "1px solid gray";
  };
});

document.addEventListener("DOMContentLoaded", () => {
  const websiteID = getParam();
  if (!websiteID) return window.location.replace("/create-website.html");
});
