//alert("Grrr.");

// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//   const re = new RegExp("bear", "gi");
//   const matches = document.documentElement.innerHTML.match(re);
//   sendResponse({count: matches.length});
// });

const re = new RegExp("bear", "gi");
const matches = document.documentElement.innerHTML.match(re);
chrome.runtime.sendMessage({
  url: window.location.href,
  count: matches.length,
});

// article info 받아옴 -> 받아온걸 바탕으로 api 요청 -> 응답받은걸로 보여줌
