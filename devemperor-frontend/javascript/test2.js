// const payWithMonnify = () => {
//   MonnifySDK.initialize({
//     amount: 100,
//     currency: "NGN",
//     reference: new String(new Date().getTime()),
//     customerFullName: "Damilare Ogunnaike",
//     customerEmail: "ogunnaike.damilare@gmail.com",
//     apiKey: "MK_PROD_FLX4P92EDF",
//     contractCode: "626609763141",
//     paymentDescription: "Lahray World",
//     metadata: {
//       name: "Damilare",
//       age: 45,
//     },
//     incomeSplitConfig: [
//       {
//         subAccountCode: "MFY_SUB_342113621921",
//         feePercentage: 50,
//         splitAmount: 1900,
//         feeBearer: true,
//       },
//       {
//         subAccountCode: "MFY_SUB_342113621922",
//         feePercentage: 50,
//         splitAmount: 2100,
//         feeBearer: true,
//       },
//     ],

//     onLoadStart: () => {
//       console.log("loading has started");
//     },
//     onLoadComplete: () => {
//       console.log("SDK is UP");
//     },

//     onComplete: function (response) {
//       //Implement what happens when the transaction is completed.
//       console.log(response);
//     },
//     onClose: function (data) {
//       //Implement what should happen when the modal is closed here
//       console.log(data);
//     },
//   });
// };

// document.querySelector("#pay").onclick = () => {
//   alert("hey");

//   payWithMonnify();
// };

const register_user = async (form) => {
  try {
    const response = await fetch(
      "https://sandbox.monnify.com/api/v1/merchant/transactions/init-transaction",
      {
        method: "POST",

        headers: { "content-type": "application/json" },
        body: JSON.stringify(form),
      },
    );
    const result = await response.json();
    console.log(result);
  } catch (error) {
    // display_given_error(error.message);
  }
};

register_user();
