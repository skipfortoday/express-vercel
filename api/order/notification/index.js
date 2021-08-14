const express = require("express");
const router = express.Router();
const axios = require("axios");
const { apiShortener, apiSMS } = require("../../../config");
const qs = require("qs");

function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

router.post("/", async function (req, res, next) {
  try {
    console.log(req.body);
    if (
      req.body.merchantName == undefined ||
      req.body.paymentURL == undefined ||
      req.body.number == undefined
    ) {
      res.status(400).send("Missing mandatory parameter");
    } else {
      let randomString = await makeid(5);
      let sourceURL = req.body.paymentURL;
      let expectURL = `${req.body.merchantName}-${randomString}`;
      let number = req.body.number;
      let dataShortener = qs.stringify({
        url: sourceURL,
        customAlias: expectURL,
      });
      let resultShortener = await axios.post(
        apiShortener.url,
        dataShortener,
        apiShortener.config
      );
      let shortLink = resultShortener.data.short;
      let bodySMS = `Segera lakukan pembayaran anda di link berikut ${shortLink}`;
      let dataSMS = qs.stringify({
        msisdn: number,
        content: bodySMS,
      });
      let resultSMS = await axios.post(
        apiSMS.url,
        dataSMS,
        apiShortener.config
      );
      res.json(resultSMS.data);
    }
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
});

module.exports = router;
