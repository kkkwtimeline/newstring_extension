// 2021-01-01 형식으로 날짜를 반환하는 함수
function today() {
  const d = new Date();
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const date = d.getDate();
  const today = `${year}-${month >= 10 ? month : "0" + month}-${
    date >= 10 ? date : "0" + date
  }`;
  return today;
}

// addEventListener 의 콜백함수로 " " 영역을 content.js 로 전달할 수 있으며 requestApi 콜백함수를 실행
function onclick() {
  chrome.tabs.query({currentWindow: true, active: true}, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, " ", requestApi);
  });
}

// content.js 로 부터 기사의 링크와 헤드라인을 res 객체로 받아온다
// 받아온 헤드라인을 빅카인즈 뉴스검색api 쿼리로 전달
// 응답을 바탕으로 showArticleInfoFromApi 함수 실행
function requestApi(res) {
  const datas = {
    access_key: "9af2f705-2974-4340-8b55-d69040b944ab",

    argument: {
      query: res.articleHeadline,
      published_at: {
        from: "2018-01-01",
        until: today(),
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
    .then((data) => showArticleInfoFromApi(data));

  document.getElementById("subscribe").style.display = "none";
  document.getElementById("unsubscribe").style.display = "";
}

// extention팝업창에 본 기사의 id를 생성
function createIdDiv(data) {
  const idDiv = document.createElement("div");
  idDiv.textContent = data["return_object"]["documents"][0]["title"];
  document.body.appendChild(idDiv);
}

// extention팝업창에 본 기사의 headline을 생성
function createHeadlineDiv(data) {
  const titleDiv = document.createElement("div");
  titleDiv.textContent = data["return_object"]["documents"][0]["news_id"];
  document.body.appendChild(titleDiv);
}

// function showArticleInfoFromApi(data) {
//   createIdDiv(data);
//   createHeadlineDiv(data);
// }

// 익스텐션 켜지자마자 페이지의 url, title, 기사작성 시간 획득
function naver_title_extraction(results) {
  document.querySelector("#url").value = results.articleUrl;
  document.querySelector("#title").value = results.articleHeadline;
  let x = document.getElementsByClassName("title_text")[0];
  x.innerText = results.articleHeadline;
  document.querySelector("#time").value = results.articleTime;
}

// 구독 버튼 클릭시 서버로 정보 전달
function api_server_send(e) {
  document.getElementById("subscribe").style.display = "none";
  document.getElementById("view_check_b").style.display = "";

  const params = {
    article_url: document.querySelector("#url").value,
    title: document.querySelector("#title").value,
    time: document.querySelector("#time").value,
  };

  const url = "https://kkkwtimeline.github.io/newstring_web/items/";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  };

  fetch(url, options)
    .then((response) => response.json())
    .then((data) => showArticleInfoFromApi(data));

  setTimeout(function () {
    document.querySelector("#subscribe_people").innerText = "구독자 : 4,561 명";
    document.getElementById("view_check_b").style.display = "none";
    document.getElementById("unsubscribe").style.display = "";
    document.getElementById("subscribe_name").style.display = "";
    document.getElementById("footer_btn_div").style.display = "";
    chrome.notifications.create("add_subscribe", {
      type: "basic",
      iconUrl: "./icon/logo_48_icon.png",
      title: "구독 알림",
      message: "오징어게임 타임라인을 구독하셨습니다.",
      priority: 2,
    });
  }, 1000);
  // var extraction_btn = document.querySelector('#extraction')

  // extraction_btn.value="✔"
}

function unsubscribe_click() {
  setTimeout(function () {
    document.querySelector("#subscribe_people").innerText = "구독자 : 4,560 명";
    document.getElementById("unsubscribe").style.display = "none";
    document.getElementById("time_lines_div").style.display = "none";
    document.getElementById("similar_items_div").style.display = "none";
    document.getElementById("footer_btn_div").style.display = "none";
    document.getElementById("subscribe").style.display = "";
    document.getElementById("page_1_item_01").style.display = "";
    document.getElementById("page_1_item_02").style.display = "";
  }, 1000);
}

function similar_newspage() {
  document.getElementById("unsubscribe").style.display = "";
  document.getElementById("subscribe").style.display = "none";
  document.getElementById("page_1_item_01").style.display = "none";
  document.getElementById("page_1_item_02").style.display = "none";
  document.getElementById("time_lines_div").style.display = "none";
  document.getElementById("similar_items_div").style.display = "";
}

function timeline_newspage() {
  document.getElementById("unsubscribe").style.display = "";
  document.getElementById("subscribe").style.display = "none";
  document.getElementById("page_1_item_01").style.display = "none";
  document.getElementById("page_1_item_02").style.display = "none";
  document.getElementById("similar_items_div").style.display = "none";
  document.getElementById("time_lines_div").style.display = "";
  // chrome.tabs.create({
  //   url: 'https://www.hani.co.kr/arti/international/international_general/855582.html'
  // });
}

function open_similar() {
  chrome.tabs.create({
    url: "https://kkkwtimeline.github.io/newstring_web/timeline",
  });
}

function open_time_list() {
  chrome.tabs.create({
    url: "https://kkkwtimeline.github.io/newstring_web/timeline",
  });
}

function load_subscribe() {
  setTimeout(function () {
    document.getElementById("subscribe_start").style.display = "None";
    document.getElementById("subscribe_name").style.display = "";
  }, 1000);
}

function open_detail_list() {
  setTimeout(function () {
    document.getElementById("close_detail").style.display = "";
    document.getElementById("open_detail").style.display = "none";
    document.getElementById("detail_page").style.display = "";
  }, 1000);
}

function close_detail_list() {
  document.getElementById("close_detail").style.display = "none";
  document.getElementById("open_detail").style.display = "";
  document.getElementById("detail_page").style.display = "none";
}

function change_title_1() {
  var temp = document.querySelector("#subscribe_title").innerText;
  var temp_2 = document.querySelector("#subscribe_people").innerText;

  document.querySelector("#subscribe_title").innerText =
    document.querySelector("#open_detail_1").innerText;
  document.querySelector("#subscribe_people").innerText =
    document.querySelector("#open_detail_1").value;

  document.querySelector("#open_detail_1").value = temp_2;
  document.querySelector("#open_detail_1").innerText = temp;
}

function change_title_2() {
  var temp = document.querySelector("#subscribe_title").innerText;
  var temp_2 = document.querySelector("#subscribe_people").innerText;

  document.querySelector("#subscribe_title").innerText =
    document.querySelector("#open_detail_2").innerText;
  document.querySelector("#subscribe_people").innerText =
    document.querySelector("#open_detail_2").value;

  document.querySelector("#open_detail_2").value = temp_2;
  document.querySelector("#open_detail_2").innerText = temp;
}

function change_title_3() {
  var temp = document.querySelector("#subscribe_title").innerText;
  var temp_2 = document.querySelector("#subscribe_people").innerText;

  document.querySelector("#subscribe_title").innerText =
    document.querySelector("#open_detail_3").innerText;
  document.querySelector("#subscribe_people").innerText =
    document.querySelector("#open_detail_3").value;

  document.querySelector("#open_detail_3").value = temp_2;
  document.querySelector("#open_detail_3").innerText = temp;
}

function change_title_4() {
  var temp = document.querySelector("#subscribe_title").innerText;
  var temp_2 = document.querySelector("#subscribe_people").innerText;

  document.querySelector("#subscribe_title").innerText =
    document.querySelector("#open_detail_4").innerText;
  document.querySelector("#subscribe_people").innerText =
    document.querySelector("#open_detail_4").value;

  document.querySelector("#open_detail_4").value = temp_2;
  document.querySelector("#open_detail_4").innerText = temp;
}

// popup.html button EventListener
function listener() {
  document.addEventListener(
    "DOMContentLoaded",
    function () {
      chrome.tabs.query({currentWindow: true, active: true}, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, " ", naver_title_extraction);
        load_subscribe();
      });

      var unsubscribe_01 = document.querySelector("#unsubscribe");
      var similar_articles_01 = document.querySelector("#similar_articles");
      var time_line_01 = document.querySelector("#time_line");
      var subscribe_01 = document.querySelector("#subscribe");
      var open_web_similar_01 = document.querySelector("#open_web_similar");
      var open_web_time_line_01 = document.querySelector("#open_web_time_line");
      var open_detail_01 = document.querySelector("#open_detail");
      var close_detail_01 = document.querySelector("#close_detail");

      var open_detail_1_01 = document.querySelector("#open_detail_1");
      var open_detail_2_01 = document.querySelector("#open_detail_2");
      var open_detail_3_01 = document.querySelector("#open_detail_3");
      var open_detail_4_01 = document.querySelector("#open_detail_4");

      subscribe_01.addEventListener("click", api_server_send, false); // 기사획득 버튼 누르면 실행.addEventListener("click",api_server_send); // 기사획득 버튼 누르면 실행
      unsubscribe_01.addEventListener("click", unsubscribe_click); // 구독버튼 비활성화 구독취소 활성화("✔")
      similar_articles_01.addEventListener("click", similar_newspage); // 나머지 페이지에서 사용하는 div를 전부 숨김 유사기사 페이지에서 사용하는 div만 표출
      time_line_01.addEventListener("click", timeline_newspage); // 나머지 페이지에서 사용하는 div를 전부 숨김 타임라인 페이지에서 사용하는 div만 표출
      open_web_similar_01.addEventListener("click", open_similar);
      open_web_time_line_01.addEventListener("click", open_time_list);
      open_detail_01.addEventListener("click", open_detail_list);
      close_detail_01.addEventListener("click", close_detail_list);

      open_detail_1_01.addEventListener("click", change_title_1);
      open_detail_2_01.addEventListener("click", change_title_2);
      open_detail_3_01.addEventListener("click", change_title_3);
      open_detail_4_01.addEventListener("click", change_title_4);
    },
    false
  );
}

// execute script
listener();
