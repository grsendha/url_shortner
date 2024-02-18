const express = require("express");
const app = express();
const URL = require("./models/url");
const port = 3000;
const staticRouter = require("./routes/staticRouter");
const path = require("path");
const urlRoute = require("./routes/url");
const { connectToMongoDB } = require("./connect");

connectToMongoDB("mongodb://localhost:27017/short-url");

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.static(path.join(path.resolve(), "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/url", urlRoute);
app.use("/", staticRouter);

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
  console.log(entry);
  res.redirect(entry.redirectURL);
});

app.get("/test", async (req, res) => {
  const allUrls = await URL.find({});
  console.log(allUrls);
  res.render("home.ejs", {
    urls: allUrls,
  });
});
app.listen(port, () => console.log(`Server listening on port ${port}!`));
