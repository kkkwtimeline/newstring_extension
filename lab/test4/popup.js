function extraction(e) {
  chrome.tabs.executeScript({code: "document.location.href;"}, url_extraction); // 나중에 신문사별 다른 양식에 맞게 필드 지정하기 위해 url 획득.

  chrome.tabs.executeScript(
    {code: "document.querySelector('#articleTitle').innerText;"},
    naver_title_extraction
  );
  //   // 익스텐션 창이아닌 크롬 창의 필드에서 타이틀 획득 후 naver_title_extraction함수로 전달/호출
  //   chrome.tabs.executeScript(
  //     {code: "document.querySelector('#articleBodyContents').innerText;"},
  //     naver_contents_extraction
  //   );
  //   // 익스텐션 창이아닌 크롬 창의 필드에서 기사 획득 후 naver_contents_extraction 전달/호출
}

function url_extraction(results) {
  document.querySelector("#url").value = results;
}

function naver_title_extraction(results) {
  document.querySelector("#title").value = results;
}

const datas = {
  access_key: "9af2f705-2974-4340-8b55-d69040b944ab",

  argument: {
    query: "오징어게임",
    published_at: {
      from: "2021-09-28",
      until: "2021-09-29",
    },
    provider: ["중앙일보", "조선일보", "동아일보", "한겨레", "경향신문"],
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
    return_size: 1,
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

document.addEventListener(
  "DOMContentLoaded",
  function () {
    document
      .querySelector("#btn")
      .addEventListener("click", extractArticleInfo, false);

    ////
    function extractArticleInfo() {
      chrome.tabs.sendMessage(tab[0].id, "hi", setCount);
    }

    ////
    function bigkindsApiRequest() {
      chrome.tabs.query({currentWindow: true, active: true}, function (tabs) {
        fetch(url, options)
          .then((response) => response.json())
          .then((data) =>
            chrome.tabs.sendMessage(
              tabs[0].id,
              document.location.href
              //`${data["return_object"]["documents"][0]["hilight"]}`
            )
          );
      });
    }
    ////
  },
  false
);
