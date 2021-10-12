const d = new Date();
const year = d.getFullYear();
const month = d.getMonth() + 1;
const date = d.getDate();
const today = `${year}-${month >= 10 ? month : "0" + month}-${
  date >= 10 ? date : "0" + date
}`;

document.addEventListener(
  "DOMContentLoaded",
  function () {
    document.querySelector("button").addEventListener("click", onclick, false);

    function onclick() {
      chrome.tabs.query({currentWindow: true, active: true}, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, " ", requestApi);
      });
    }

    function requestApi(res) {
      const datas = {
        access_key: "9af2f705-2974-4340-8b55-d69040b944ab",

        argument: {
          query: res.articleHeadline,
          published_at: {
            from: "2018-01-01",
            until: today,
          },
          provider: ["한겨레"],
          category: [""],
          category_incident: [""],
          byline: "",
          provider_subject: [""],
          subject_info: [""],
          subject_info1: [""],
          subject_info2: [""],
          subject_info3: [""],
          subject_info4: [""],
          sort: {date: "asc"},
          hilight: 200,
          return_from: 0,
          return_size: 2,
          fields: [
            "byline",
            "category",
            "category_incident",
            "provider_news_id",
            "hilight",
          ],
        },
      };
      const url = "http://tools.kinds.or.kr:8888/search/news";
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datas),
      };

      fetch(url, options)
        .then((response) => response.json())
        .then((data) => showArticleIdFromApi(data));
    }

    function showArticleIdFromApi(data) {
      const idDiv = document.createElement("div");
      idDiv.textContent = data["return_object"]["documents"][0]["title"];
      document.body.appendChild(idDiv);

      const titleDiv = document.createElement("div");
      titleDiv.textContent = data["return_object"]["documents"][0]["news_id"];
      document.body.appendChild(titleDiv);
    }
  },
  false
);
