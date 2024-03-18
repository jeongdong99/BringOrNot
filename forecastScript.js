FirstRendering();
async function FirstRendering() {
  const vilage_information = JSON.parse(
    sessionStorage.getItem("Vilage_information")
  ); // json parsing
  const key = `9TOfeqm4r9z9sjTq0BwGWGGXY9R3bXcKPzSi%2FN7eelmU0Qp37HxmsDioUD41mH4km%2FUm8SMB9jYqWO0fu0UMWw%3D%3D`;
  const dateAndTime = getDateAndTime();
  console.log(
    dateAndTime[0],
    dateAndTime[1],
    vilage_information[0].grid_X,
    vilage_information[0].grid_Y
  );
  const Url = `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst?serviceKey=${key}&numOfRows=50&pageNo=1&dataType=JSON&base_date=${dateAndTime[0]}&base_time=${dateAndTime[1]}&nx=${vilage_information[0].grid_X}&ny=${vilage_information[0].grid_Y}`;
  await getDataByUseAPI(Url);
}
// getDate && getTime
function getDateAndTime() {
  // 현재 시간을 Date 객체로 변환
  var now = new Date();
  var year = now.getFullYear();
  var month = ("0" + (now.getMonth() + 1)).slice(-2);
  var day = ("0" + now.getDate()).slice(-2);

  /*
  1. getMonth() : 현재 날짜의 월을 0부터 시작하는 숫자로 반환. 따라서 1을 더하여 1부터 12까지의 범위로.
  2. ("0" + (now.getMonth() + 1)): 앞에 0을 붙이는 것은 단순히 숫자를 두 자리로 만들어주기 위한 것.
  3. slice(-2): 만약 두 자리 이상의 숫자라면 그대로 반환하고, 한 자리 숫자라면 뒤에서 두 번째부터 끝까지의 문자열을 잘라낸다.
  */

  // 현재 시간의 시와 분
  var hours = now.getHours();
  var minutes = now.getMinutes();

  // 조건에 따라 시간과 날짜를 조정
  if (hours === 0 && minutes < 45) {
    // 시간이 00:45 이전이면 이전 날짜로 조정
    now.setDate(now.getDate() - 1);
    year = now.getFullYear();
    month = ("0" + (now.getMonth() + 1)).slice(-2);
    day = ("0" + now.getDate()).slice(-2);
    hours = 23;
  } else if (minutes < 45) {
    // 45분 이전이면 시간을 이전 시간으로 변경
    hours -= 1;
  }

  // 시간이 한 자리 수일 경우 앞에 0을 추가
  var adjustedHoursString = ("0" + hours).slice(-2);
  var dateString = year + month + day;

  // 변경된 시간을 문자열로 반환
  var dateArray = [];
  dateArray.push(dateString);
  dateArray.push(adjustedHoursString + "30");
  console.log(dateArray);
  return dateArray;
}

// api로 날씨 데이터 가져오기
async function getDataByUseAPI(Url) {
  try {
    const result = await fetch(Url);
    if (result.ok) {
      const resultJson = await result.json();
      console.log(resultJson);
      await rainyRendering(resultJson);
    } else {
      throw new Error("Request faild");
    }
  } catch (error) {
    window.alert(error);
  } finally {
    console.log("--작업 완료--");
  }
}

// 날씨 화면에 렌더링
function rainyRendering(resultJson) {
  var fcstTime = [];
  var rainy = [];
  var rainyForm = [];

  const items = resultJson.response.body.items.item;
  items.forEach((element) => {
    if (element.category == "RN1") {
      fcstTime.push(element.fcstTime);
      rainy.push(element.fcstValue);
    }
    if (element.category == "PTY") {
      rainyForm.push(element.fcstValue);
    }
  });

  var h1Element = document.querySelector("h1.font_highlight");
  // 텍스트 업데이트
  h1Element.innerHTML = checkRainy(rainy);
  backgroundImageRender(rainy);

  for (var i = 0; i < fcstTime.length; i++) {
    var obj = {
      fcstTime: fcstTime[i],
      rainy: rainy[i],
      rainyForm: rainyForm[i],
    };
    document.getElementsByClassName("flexbox")[0].append(makeCard(obj));
  }
}

function backgroundImageRender(arr) {
  var backgroundImageUrl;
  if (arr.some((num) => num > 5)) {
    backgroundImageUrl = "./assets/img/rainy.jpg"; // 이미지 경로
  } else if (arr.some((num) => num > 1)) {
    backgroundImageUrl = "./assets/img/cloud.jpg"; // 이미지 경로
  } else {
    backgroundImageUrl = "./assets/img/good-weather.jpg"; // 이미지 경로
  }
  // .main_bg 클래스를 가진 요소에 배경 이미지 설정
  var mainBgElement = document.querySelector(".main_bg");
  mainBgElement.style.backgroundImage = "url('" + backgroundImageUrl + "')";
}

// 챙길지 말지 표시
function checkRainy(arr) {
  if (arr.some((num) => num > 5)) {
    backgroundImageRender();
    return "우산 꼭 챙겨!!";
  } else if (arr.some((num) => num > 1)) {
    return "귀찮으면 맞지 모~ ";
  } else {
    return "우산따위 필요없따!!";
  }
}
function makeCard(obj) {
  // 새로운 div 요소 생성
  var cardDiv = document.createElement("div");
  cardDiv.setAttribute("class", "card text-center");
  cardDiv.setAttribute("style", "width: 18rem");

  // div 안에 card-body 클래스의 div 요소 생성
  var cardBodyDiv = document.createElement("div");
  cardBodyDiv.setAttribute("class", "card-body");

  // card-body 안에 h5 요소 생성
  var cardTitle = document.createElement("h5");
  cardTitle.setAttribute("class", "card-title");
  cardTitle.textContent = parseInt(obj.fcstTime.slice(0, 2)) + "시";

  // card-body에 h5 요소 추가
  cardBodyDiv.appendChild(cardTitle);

  // div에 card-body 추가
  cardDiv.appendChild(cardBodyDiv);

  // div 안에 list-group과 list-group-flush 클래스의 ul 요소 생성
  var ul = document.createElement("ul");
  ul.setAttribute("class", "list-group list-group-flush");

  // ul에 li 요소 두 개 생성
  var li1 = document.createElement("li");
  li1.setAttribute("class", "list-group-item");

  li1.textContent = obj.rainy;

  var li2 = document.createElement("li");
  li2.setAttribute("class", "list-group-item");
  li2.textContent = convertPTYCodeToKorean(obj.rainyForm);

  // li 요소들을 ul에 추가
  ul.appendChild(li1);
  ul.appendChild(li2);

  // div에 ul 추가
  cardDiv.appendChild(ul);

  return cardDiv;
}

var ptyKoreanArray = [
  "없음",
  "비",
  "비/눈",
  "눈",
  "빗방울",
  "빗방울/눈날림",
  "눈날림",
];

function convertPTYCodeToKorean(ptyCode) {
  // PTY 코드가 배열의 인덱스와 일치하므로 해당 인덱스에 해당하는 값을 반환합니다.
  return ptyKoreanArray[ptyCode];
}

/* PTY : 강수형태
- 강수형태(PTY) 코드 : (초단기) 없음(0), 비(1), 비/눈(2), 눈(3), 빗방울(5), 빗방울눈날림(6), 눈날림(7) 
*/
// RN1 : 1시간 강수량
