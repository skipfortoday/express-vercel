const apiShortener = {
  url: "https://pub-metranet-api.thebigbox.id/URL-Shortener/1.0.0/shortener",
  config: {
    headers: {
      "x-api-key": "CBZ8H8Zfj4kVE4NMaF3WssKxIdvy4KGD",
      "Content-Type": "application/x-www-form-urlencoded",
    },
  },
};

const apiSMS = {
  url: "https://api.thebigbox.id/sms-notification/2.0.0/messages",
  config: {
    headers: {
      "x-api-key": "CBZ8H8Zfj4kVE4NMaF3WssKxIdvy4KGD",
      "Content-Type": "application/x-www-form-urlencoded",
    },
  },
};

module.exports = { apiShortener, apiSMS };
