// // var request = require("request");
// // var options = {
// //   method: "POST",
// //   url: "https://api.whoisfreaks.com/v1.0/bulkwhois?apiKey=API_KEY",
// //   headers: {
// //     "Content-Type": "application/json",
// //   },
// //   body: JSON.stringify({
// //     domainNames: ["google.com", "abc.com", "google.uk", "google.us"],
// //   }),
// // };
// // request(options, function (error, response) {
// //   if (error) throw new Error(error);
// //   console.log(response.body);
// // });

// var whois = require("whois");
// const fetch_domain = async () => {
//   try {
//     const response = await whois.lookup("google.com", {
// 	"server":  "",   // this can be a string ("host:port") or an object with host and port as its keys; leaving it empty makes lookup rely on servers.json
// 	"follow":  2,    // number of times to follow redirects
// 	"timeout": 0,    // socket timeout, excluding this doesn't override any default timeout value
// 	"verbose": false ,// setting this to true returns an array of responses from all servers
// 	"bind": null  ,   // bind the socket to a local IP address
// 	"proxy": {       // (optional) SOCKS Proxy
// 		"host": "",
// 		"port": 0,
// 		"type": 5    // or 4
// 	}
// });
//     const result = await response.text();
//     console.log(result);
//   } catch (error) {
//     console.log(`error was gotten:${error.message}`);
//   }
// };

// fetch_domain();

// var whois = require("whois");
// whois.lookup("google.com", function (err, data) {
//   console.log(data);
// });

const whoiser = require("whoiser");
const assert = require("assert");
(async () => {
try {
     const whois = await whoiser.domain("softjovial.biz");
     const firstWhois = whoiser.firstResult(whois);

     assert.equal(
       firstWhois["Domain Name"],
       "softjovial.biz",
       "Domain name doesn't match",
     );
     //  assert.equal(
     //    firstWhois["Registry Domain ID"],
     //    "27CAA9F68-GOOGLE",
     //    "Registry Domain ID doesn't match",
     //  );

     console.log(firstWhois);
} catch (error) {
    console.log(`big time mess error: ${error}`)
}
})();
