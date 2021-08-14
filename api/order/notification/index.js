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

function formatRupiah(angka, prefix) {
  var number_string = angka.replace(/[^,\d]/g, "").toString(),
    split = number_string.split(","),
    sisa = split[0].length % 3,
    rupiah = split[0].substr(0, sisa),
    ribuan = split[0].substr(sisa).match(/\d{3}/gi);

  // tambahkan titik jika yang di input sudah menjadi angka ribuan
  if (ribuan) {
    separator = sisa ? "." : "";
    rupiah += separator + ribuan.join(".");
  }

  rupiah = split[1] != undefined ? rupiah + "," + split[1] : rupiah;
  return prefix == undefined ? rupiah : rupiah ? "Rp. " + rupiah : "";
}

router.post("/", async function (req, res, next) {
  try {
    console.log(req.body);
    if (
      req.body.merchantName == undefined ||
      req.body.paymentURL == undefined ||
      req.body.number == undefined ||
      req.body.paymentAmount == undefined
    ) {
      res.status(400).send("Missing mandatory parameter");
    } else {
      let randomString = await makeid(5);
      let sourceURL = req.body.paymentURL;
      let paymentAmount = await formatRupiah(req.body.paymentAmount, "Rp.");
      let merchantName = req.body.merchantName;
      let expectURL = `${req.body.merchantName.replace(
        / /g,
        "-"
      )}-${randomString}`;
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
      let bodySMS = `Segera lakukan pembayaran anda di Toko ${merchantName} dengan total ${paymentAmount} di Link berikut ${shortLink}`;
      let dataSMS = qs.stringify({
        msisdn: number,
        content: bodySMS,
      });
      let resultSMS = await axios.post(
        apiSMS.url,
        dataSMS,
        apiShortener.config
      );
      res.json({
        "result-link": shortLink,
        "status-sms": resultSMS.data,
      });
    }
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
});

module.exports = router;
