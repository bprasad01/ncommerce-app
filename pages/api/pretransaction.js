const https = require("https");
const PaytmChecksum = require("paytmchecksum");
export default function handler(req, res) {
  if (req.method == "POST") {

    /* initialize an object */
    var paytmParams = {};

    /* body parameters */
    paytmParams.body = {
      /* Find your MID in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys */
      mid: PROCESS.env.PAYTM_MID,

      /* Enter your order id which needs to be check status for */
      orderId: req.body.oid,
    };

    /**
     * Generate checksum by parameters we have in body
     * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys
     */
    PaytmChecksum.generateSignature(
      JSON.stringify(paytmParams.body),
      "YOUR_MERCHANT_KEY"
    ).then(function (checksum) {
      /* head parameters */
      paytmParams.head = {
        /* put generated checksum value here */
        signature: checksum,
      };

      /* prepare JSON string for request */
      var post_data = JSON.stringify(paytmParams);

      var options = {
        /* for Staging */
        hostname: "securegw-stage.paytm.in",

        /* for Production */
        // hostname: 'securegw.paytm.in',

        port: 443,
        path: "/v3/order/status",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": post_data.length,
        },
      };

      // Set up the request
      var response = "";
      var post_req = https.request(options, function (post_res) {
        post_res.on("data", function (chunk) {
          response += chunk;
        });

        post_res.on("end", function () {
          console.log("Response: ", response);
        });
      });

      // post the data
      post_req.write(post_data);
      post_req.end();
    });
  }
}
