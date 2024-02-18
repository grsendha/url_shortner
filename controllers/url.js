const shortid = require("shortid");
const URL = require("../models/url");

async function handleGenerateShortURL(req, res) {
  const body = req.body;
  if (!body.url) {
    return res.status(400).json({
      error: "url is required",
    });
  }

  const shortId = shortid();
  await URL.create({
    shortId: shortId,
    redirectURL: body.url,
    visitHistory: [],
  });

  return res.render("home", {
    id: shortId,
  });
}

async function handleAnalytics(req, res) {
  console.log(`short id is ${req.params.shortId}`);
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  console.log(result);
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

module.exports = {
  handleGenerateShortURL,
  handleAnalytics,
};
