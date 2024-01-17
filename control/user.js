const { userschema } = require("../model/index"),
  jwt = require("jsonwebtoken"),
  nodemailer = require("nodemailer"),
  { google } = require("googleapis"),
  OAuth2 = google.auth.OAuth2,
  oauth2Client = new OAuth2(
    "54483711494-n1o0gbouug9qqtectts3u4tmkb865osk.apps.googleusercontent.com",
    "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",
    "https://developers.google.com/oauthplayground"
  );
oauth2Client.setCredentials({
  refresh_token:
    "1//04QV3zkUuyFyrCgYIARAAGAQSNwF-L9IrLcGzgfXW3ARQcW-NOMMaF3oCsI5pEr7acA5VgBWH9S13acXNRgQY5X91QXuZ8rNnBuo",
});
const cyptoJS = require("crypto-js");

const accessToken = oauth2Client.getAccessToken(),
  transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: "quantumgoods.shopping@gmail.com",
      clientId:
        "576279600249-a59lck3322shafgj5eum33ota326lkkd.apps.googleusercontent.com",
      clientSecret: "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",
      refreshToken:
        "1//04HvdFt8PfcEsCgYIARAAGAQSNwF-L9IrcBMZLYcyV96ISUR0G1_8x7wy92QNUkIZghQ7aGTD5yUCn2Bl02MoCB0feonKeIyuI38",
      accessToken: accessToken,
    },
    tls: {
      rejectUnauthorized: false,
    },
  }),
  mailOptions = {
    from: "quantumgoods.shopping@gmail.com",
    to: "",
    subject: "OTP from QuntumGoods",
    text: "",
  };

const send = () => {
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
const generateToken = (data) => jwt.sign(data, process.env.JWT_SECRET_KEY, { expiresIn: '24h'});
const encypt = (pass) => cyptoJS.SHA256(pass);

exports.sendMail = async (req, res) => {
  try {
    const find = await userschema.findOne({ email: req.body.email });
    if (find) {
      const OTP = Math.floor(Math.random() * 10000);
      mailOptions.to = await req.body.email;
      mailOptions.text = `Your OTP is ${OTP}`;
      send();
      res.json({ OTP: OTP }).status(200);
    } else {
      res.json({ error: "this email doesn't exist." }).status(404);
    }
  } catch (e) {
    res.json(e);
  }
};

exports.changePassword = async (req, res) => {
  try {
    const pass = encypt(req.body.password);
    const user = await userschema.updateOne(
      { email: req.body.email },
      { $set: { password: pass.toString() } }
    );
    res.json(user).status(200);
  } catch (e) {
    console.log(e);
    res.json(e);
  }
};

exports.singin = async (req, res) => {
  try {
    req.body.password = encypt(req.body.password);
    const user = await userschema.findOne(req.body);
    if (user) {
      const Token = generateToken(req.body);
      res.json({ found: 1, token: Token, user: user._id }).status(200);
    } else res.json(null).status(404);
  } catch (e) {
    res.json(e);
  }
};

exports.singup = async (req, res) => {
  try {
    req.body.password = encypt(req.body.password);
    const find = await userschema.findOne({ email: req.body.email });
    if (!find) {
      const user = new userschema(req.body);
      await user.save();
      res.json(user).status(200);
    } else res.json(null);
  } catch (e) {
    res.json(e);
  }
};
