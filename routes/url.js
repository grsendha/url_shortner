const express = require("express");
const router = express.Router();

const {
  handleGenerateShortURL,
  handleAnalytics,
} = require("../controllers/url");

router.post("/", handleGenerateShortURL);

router.get("/analytics/:shortId", handleAnalytics);

module.exports = router;
