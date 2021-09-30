chrome.runtime.onMessage.addListener(function (request) {
  alert(request);
});

// chrome.runtime.sendMessage({data: datas});

// const req = new XMLHttpRequest();
// const baseUrl = "http://tools.kinds.or.kr:8888/search/news";

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
