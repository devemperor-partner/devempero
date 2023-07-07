const express = require("express");
const app = express();
app.use(express.json());
require("dotenv").config();
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const winston = require("winston");
app.use(helmet());
// app.use(express.json())
var corsOptions = {
  origin: [
    "http://localhost:3000",
    // "https://bristolenergy.info",
    // "http://bristolenergy.info",
  ],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 1000, // limit each IP to 60 requests per windowMs
  message: "Too many requests from this IP, please try again later",
});
app.use(limiter);

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "your-service-name" },
  transports: [
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
    new winston.transports.File({ filename: "logs/combined.log" }),
  ],
});

app.use((req, res, next) => {
  logger.info(`Endpoint ${req.method} ${req.originalUrl} was accessed`, {
    req: req.body,
  });
  next();
});

app.use("/", express.static("devemperor-frontend"));

const register_user = require("./api/register");
app.use("/api/user/register", register_user);

const user_login = require("./api/login");
app.use("/api/user/login", user_login);

const fetch_user = require("./api/fetch_user");
app.use("/api/users/myaccount", fetch_user);

const resend_link = require("./api/resend_link");
app.use("/api/user/resendlink", resend_link);

const change_signupmail = require("./api/change_signupmail");
app.use("/api/user/change_signupmail", change_signupmail);

const verify_account = require("./api/verify_account");
app.use("/api/user/verify_account", verify_account);

const withdrawal_request = require("./api/withdrawal_request");
app.use("/api/user/withdraw_fund", withdrawal_request);

const deposit_request = require("./api/deposit_request");
app.use("/api/user/deposit_fund", deposit_request);

const fetch_deposit_request = require("./api/fetch_deposit_request");
app.use("/api/user/deposit_request/fetch", fetch_deposit_request);

const complete_deposit_request = require("./api/complete_deposit_request");
app.use("/api/user/complete_deposit_request", complete_deposit_request);

const create_mobile_app = require("./api/create_mobile_app");
app.use("/api/user/create_app", create_mobile_app);

const update_mobile_app_information = require("./api/update_mobile_app_information");
app.use(
  "/api/user/update_mobile_app_information",
  update_mobile_app_information,
);

const create_website = require("./api/create_website");
app.use("/api/user/create_website", create_website);

const update_website_information = require("./api/update_website_informations");
app.use("/api/user/update_website_information", update_website_information);

const fetch_softwares = require("./api/fetch_softwares");
app.use("/api/user/softwares", fetch_softwares);
// const withdrawal_request=require("./api/withdrawal_request")
// app.use("/api/user/withdraw_fund",withdrawal_request)

const fetch_transactions = require("./api/fetch_transactions");
app.use("`/api/user/transactions/fetch`", fetch_transactions);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`app listening on port ${port}`));
