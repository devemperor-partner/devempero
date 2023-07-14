const User = require("../model/user");
const Coding_lesson = require("../model/coding_lessons");

// const handle_special_courses = () => {};

const handle_offline_courses = async (req) => {
  try {
    switch (req.development_category) {
      case "Frontend web Development(full course)":
        const frontend_coding_lesson = await new Coding_lesson({
          user: req.user,
          course_price: 50000,
          presence: "Online Class",
          development_category: req.development_category,
          // special_courses: req.special_courses,
          coding_experience: req.coding_experience,
        });
        await frontend_coding_lesson.save();
        return { error: false, message: frontend_coding_lesson };
        break;

      case "Backend Development(full course)":
        const backend_coding_lesson = await new Coding_lesson({
          user: req.user,
          course_price: 50000,
          presence: "Online Class",
          development_category: req.development_category,
          // special_courses: req.special_courses,
          coding_experience: req.coding_experience,
        });
        await backend_coding_lesson.save();
        return { error: false, message: backend_coding_lesson };
        break;

      case "Full Stack Web Development":
        const fullstack_coding_lesson = await new Coding_lesson({
          user: req.user,
          course_price: 75000,
          presence: "Online Class",
          development_category: req.development_category,
          //   special_courses: req.special_courses,
          coding_experience: req.coding_experience,
        });
        await fullstack_coding_lesson.save();
        return { error: false, message: fullstack_coding_lesson };

        break;

      case "Mobile App Development(IOS and android)":
        const mobileApp_coding_lesson = await new Coding_lesson({
          user: req.user,
          course_price: 75000,
          presence: "Online Class",
          development_category: req.development_category,
          // special_courses: req.special_courses,
          coding_experience: req.coding_experience,
        });
        await mobileApp_coding_lesson.save();
        return { error: false, message: mobileApp_coding_lesson };
        break;

      case "Special Courses":
        const special_courses_coding_lesson = await new Coding_lesson({
          user: req.user,
          course_price: 75000,
          presence: "Online Class",
          development_category: "Special Course",
          special_courses: req.special_courses,
          coding_experience: req.coding_experience,
        });
        await special_courses_coding_lesson.save();
        return { error: false, message: special_courses_coding_lesson };

        break;

      default:
        const default_coding_lesson = await new Coding_lesson({
          user: req.user,
          course_price: 40000,
          presence: "Online Class",
          development_category: req.development_category,
          // special_courses: req.special_courses,
          coding_experience: req.coding_experience,
        });
        await default_coding_lesson.save();
        return { error: false, message: default_coding_lesson };
        break;
    }
  } catch (error) {
    return { error: true, errMessage: error.message };
  }
};

const handle_online_courses = async (req) => {
  try {
    switch (req.development_category) {
      case "Frontend web Development(full course)":
        const frontend_coding_lesson = await new Coding_lesson({
          user: req.user,
          course_price: 45000,
          presence: "Online Class",
          development_category: req.development_category,
          // special_courses: req.special_courses,
          coding_experience: req.coding_experience,
        });
        await frontend_coding_lesson.save();
        return { error: false, message: frontend_coding_lesson };
        break;

      case "Backend Development(full course)":
        const backend_coding_lesson = await new Coding_lesson({
          user: req.user,
          course_price: 45000,
          presence: "Online Class",
          development_category: req.development_category,
          // special_courses: req.special_courses,
          coding_experience: req.coding_experience,
        });
        await backend_coding_lesson.save();
        return { error: false, message: backend_coding_lesson };
        break;

      case "Full Stack Web Development":
        const fullstack_coding_lesson = await new Coding_lesson({
          user: req.user,
          course_price: 60000,
          presence: "Online Class",
          development_category: req.development_category,
          //   special_courses: req.special_courses,
          coding_experience: req.coding_experience,
        });
        await fullstack_coding_lesson.save();
        return { error: false, message: fullstack_coding_lesson };

        break;

      case "Mobile App Development(IOS and android)":
        const mobileApp_coding_lesson = await new Coding_lesson({
          user: req.user,
          course_price: 60000,
          presence: "Online Class",
          development_category: req.development_category,
          // special_courses: req.special_courses,
          coding_experience: req.coding_experience,
        });
        await mobileApp_coding_lesson.save();
        return { error: false, message: mobileApp_coding_lesson };
        break;

      case "Special Courses":
        const special_courses_coding_lesson = await new Coding_lesson({
          user: req.user,
          course_price: 35000,
          presence: "Online Class",
          development_category: "Special Course",
          special_courses: req.special_courses,
          coding_experience: req.coding_experience,
        });
        await special_courses_coding_lesson.save();
        return { error: false, message: special_courses_coding_lesson };

        break;

      default:
        const default_coding_lesson = await new Coding_lesson({
          user: req.user,
          course_price: 45000,
          presence: "Online Class",
          development_category: req.development_category,
          // special_courses: req.special_courses,
          coding_experience: req.coding_experience,
        });
        await default_coding_lesson.save();
        return { error: false, message: default_coding_lesson };

        break;
    }
  } catch (error) {
    return { error: true, errMessage: error.message };
  }
};

module.exports = { handle_offline_courses, handle_online_courses };
