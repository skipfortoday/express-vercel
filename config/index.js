const apiShortener = {
  url: "https://pub-metranet-api.thebigbox.id/URL-Shortener/1.0.0/shortener",
  config: {
    headers: {
      "x-api-key": "80dtGYZNg6mptdx98jsjIfcVBd4O3vfc",
      "Content-Type": "application/x-www-form-urlencoded",
    },
  },
};

const apiSMS = {
  url: "https://api.thebigbox.id/sms-notification/2.0.0/messages",
  config: {
    headers: {
      "x-api-key": "80dtGYZNg6mptdx98jsjIfcVBd4O3vfc",
      "Content-Type": "application/x-www-form-urlencoded",
    },
  },
};

module.exports = { apiShortener, apiSMS };
