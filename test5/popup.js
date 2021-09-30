document.addEventListener(
  "DOMContentLoaded",
  function () {
    document.querySelector("button").addEventListener("click", onclick, false);

    function onclick() {
      chrome.tabs.query({currentWindow: true, active: true}, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, "hi", requestApi);
      });
    }

    function showUrl(res) {
      const urlDiv = document.createElement("div");
      urlDiv.textContent = `${res.articleUrl}`;
      document.body.appendChild(urlDiv);

      const headlineDiv = document.createElement("div");
      headlineDiv.textContent = `${res.articleHeadline}`;
      document.body.appendChild(headlineDiv);
    }

    function requestApi(res) {
      const datas = {
        access_key: "9af2f705-2974-4340-8b55-d69040b944ab",

        argument: {
          query: "말레이 항공기 실종, 영구 미제로…사고 원인 규명 못해",
          published_at: {
            from: "2021-01-01",
            until: "2021-09-30",
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
        .then((data) =>
          showApi(`${data["return_object"]["documents"][0]["hilight"]}`)
        );
    }

    function showApi(data) {
      const apiDiv = document.createElement("div");
      apiDiv.textContent = `${data}`;
      document.body.appendChild(apiDiv);
    }
  },
  false
);
