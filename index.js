const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const port = 3000;
const path = require("path");

const URL = require("./models/url");

const staticRouter = require("./routes/staticRouter");
const urlRoute = require("./routes/url");
const userRoute = require("./routes/user");
const { restrictToLoggedInUserOnly, checkAuth } = require("./middleware/auth");

const { connectToMongoDB } = require("./connect");
connectToMongoDB("mongodb://localhost:27017/short-url");

app.use(express.static(path.join(path.resolve(), "public")));
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/user", userRoute);
app.use("/url", restrictToLoggedInUserOnly, urlRoute);
app.use("/", checkAuth, staticRouter);

app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectURL);
});

app.listen(port, () => console.log(`Server listening on port ${port}!`));
