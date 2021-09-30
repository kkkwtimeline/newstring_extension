// const saveExtractedText = (data) => {
//   $.post("http://tools.kinds.or.kr:8888/search/news", data);
// };

// chrome.runtime.onMessage.addListener((request, sender, senderResponse) => {
//   switch (request.message) {
//     case "save_text": {
//       saveExtractedText(request.data);
//       break;
//     }
//     default:
//   }
// });

// const req = new XMLHttpRequest();
// const baseUrl = "http://tools.kinds.or.kr:8888/search/news";

// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//   req.open("POST", baseUrl, true);
//   req.setRequestHeader("Content-type", "application/json");
//   req.send(request.data);
//   req.onreadystatechange = function () {
//     // Call a function when the state changes.
//     if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
//       alert("Got response 200!");
//     } else {
//       alert("Got response 400!");
//     }
//   };
// });

// chrome.browserAction.onClicked.addListener(function (tab) {
//   chrome.tabs.create({url: "popup.html"});
// });

// const req = new XMLHttpRequest();
// const baseUrl = "http://tools.kinds.or.kr:8888/search/news";
// const datas = {};

// req.open("POST", baseUrl, true);
// req.setRequestHeader("Content-type", "application/json");
// req.send(datas);

// req.onreadystatechange = function () {
//   // Call a function when the state changes.
//   if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
//     alert("Got response 200!");
//   } else {
//     alert("Got response 400!");
//   }
// };
