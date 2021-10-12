// const req = new XMLHttpRequest();
// const baseUrl = "http://tools.kinds.or.kr:8888/search/news";
// const datas = {
//   access_key: "9af2f705-2974-4340-8b55-d69040b944ab",

//   argument: {
//     query: "오징어게임",
//     published_at: {
//       from: "2021-09-28",
//       until: "2021-09-29",
//     },
//     provider: ["중앙일보", "조선일보", "동아일보", "한겨레", "경향신문"],
//     category: [""],
//     category_incident: [""],
//     byline: "",
//     provider_subject: [""],
//     subject_info: [""],
//     subject_info1: [""],
//     subject_info2: [""],
//     subject_info3: [""],
//     subject_info4: [""],
//     sort: {date: "asc"},
//     hilight: 1000,
//     return_from: 0,
//     return_size: 1,
//     fields: [
//       "byline",
//       "category",
//       "category_incident",
//       "provider_news_id",
//       "hilight",
//     ],
//   },
// };

// req.open("POST", baseUrl, true);
// req.setRequestHeader("Content-type", "application/json");
// req.send(datas);

// req.onreadystatechange = function () {
//   // Call a function when the state changes.
//   if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
//     console.log("Got response 200!");
//   }
// };
