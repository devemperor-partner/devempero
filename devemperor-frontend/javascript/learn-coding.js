// const select_element = (element) => document.querySelector(`#${element}`);
const showRedBorder = (element) =>
  (document.querySelector(`#${element}`).style.border = "2px solid red");

const Presence = select_element("Presence");
const development_category = select_element("development_category");
const special_courses = select_element("special_courses");
const experience = select_element("experience");

const submit_coding_course = async (data) => {
  select_element("submit").value = "Proccessing...";

  try {
    const response = await fetch("/api/user/learn-coding", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log(result);
    if (result.error) {
      select_element("errMessage").value = result.errMessage;
      select_element("errMessage").style.display = "block";
      select_element("submit").value = "Try again";
      return;
    }
    select_element("submit").value = "Success";
  } catch (error) {
    console.log(error.message);
    select_element("errMessage").value = error.message;
    select_element("submit").value = "Try again";
  }
};

select_element("submit").onclick = () => {
  if (!Presence.value) return showRedBorder("Presence");
  if (!development_category.value) return showRedBorder("development_category");
  if (development_category.value == "Special Courses") {
    if (!special_courses.value) return showRedBorder("special_courses");
  }
  if (!experience.value) return showRedBorder("experience");
  //   if(!special_courses)return showRedBorder("special_courses");
  //   if(!experience)ret
  alert("hey");
  const user = getCookie("user");
  const token = getCookie("token");
  submit_coding_course({
    user,
    token,
    presence: Presence.value,
    development_category: development_category.value,
    special_courses: special_courses.value,
    coding_experience: experience.value,
  });
};
document
  .querySelectorAll("select")
  .forEach(
    (select) =>
      (select.onchange = () => (select.style.border = "2px solid #e9ecef")),
  );

select_element("development_category").onchange = () => {
  select_element("development_category").style.border = "2px solid #e9ecef";
  if (select_element("development_category").value == "Special Courses")
    return (select_element("special_courses_div").style.display = "block");

  select_element("special_courses_div").style.display = "none";
};
