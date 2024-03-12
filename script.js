// 위치 정보 가져오기
import data from "./data.json" assert { type: "json" };

// 시 / 도 가져오기
const firstStep = document.getElementById("firstStep");
firstSelectRender();

function firstSelectRender() {
  document.getElementById("submitBtn").disabled = true;
  const firstStepArray = Array.from(
    new Set(data.map((element) => element.firstStep))
  ).sort();
  for (var i = 0; i < firstStepArray.length; i++) {
    var option = document.createElement(`option`);
    option.value = firstStepArray[i];
    option.innerText = firstStepArray[i];
    firstStep.append(option);
  }
}

const mother = document.getElementById("form");
const secondDiv = mother.firstElementChild.nextElementSibling;
const thirdDiv = secondDiv.nextElementSibling;
// 시 / 도 선택 시 이벤트
firstStep.onchange = () => {
  const firstSelectedOption = firstStep.options[firstStep.selectedIndex].value;
  if (firstSelectedOption === "undefined") {
    secondDiv.classList.add("hidden");
    thirdDiv.classList.add("hidden");
    document.getElementById("submitBtn").disabled = true;
  } else {
    document.getElementById("submitBtn").disabled = false;
    secondDiv.classList.remove("hidden");
  }
  secondSelectRender(firstSelectedOption);
};

// 시 / 군 / 구 가져오기

const secondStep = document.getElementById("secondStep");
function secondSelectRender(firstSelectedOption) {
  const secondStepArray = Array.from(
    new Set(
      data
        .filter((element) => element.firstStep === firstSelectedOption)
        .map((element) => element.secondStep)
    )
  ).sort();
  secondStep.replaceChildren(option);
  for (var i = 0; i < secondStepArray.length; i++) {
    var option = document.createElement(`option`);
    option.value = secondStepArray[i];
    option.innerText = secondStepArray[i];
    secondStep.append(option);
  }
}
// 시 / 군 / 구 선택 시 이벤트

secondStep.onchange = () => {
  const secondSelectedOption =
    secondStep.options[secondStep.selectedIndex].value;
  console.log(thirdDiv);
  if (secondSelectedOption === "*옵션") {
    thirdDiv.classList.add("hidden");
  } else {
    thirdDiv.classList.remove("hidden");
  }
  thirdSelectRender(secondSelectedOption);
};

const thirdStep = document.getElementById("thirdStep");
function thirdSelectRender(secondSelectedOption) {
  const thirsStepArray = Array.from(
    new Set(
      data
        .filter((element) => element.secondStep === secondSelectedOption)
        .map((element) => element.thirdStep)
    )
  ).sort();
  thirdStep.replaceChildren(option);
  for (var i = 0; i < thirsStepArray.length; i++) {
    var option = document.createElement(`option`);
    option.value = thirsStepArray[i];
    option.innerText = thirsStepArray[i];
    thirdStep.append(option);
  }
}

// submit 버튼

// // 날씨 정보 가져오기
// var today = new Date();
// var year = today.getFullYear();
// var month = ("0" + (today.getMonth() + 1)).slice(-2);
// var day = ("0" + today.getDate()).slice(-2);

// var dateString = year + month + day;
// const key = `9TOfeqm4r9z9sjTq0BwGWGGXY9R3bXcKPzSi%2FN7eelmU0Qp37HxmsDioUD41mH4km%2FUm8SMB9jYqWO0fu0UMWw%3D%3D`;

// const Url = `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=${key}&numOfRows=10&pageNo=1&dataType=JSON&base_date=${dateString}&base_time=1400&nx=88&ny=89`;

// const btn = document.getElementById("clicker");
// btn.addEventListener("click", getUserInfo);

// async function getUserInfo() {
//   try {
//     const result = await fetch(Url);
//     if (result.ok) {
//       const resultJson = await result.json();
//       console.log(resultJson);
//     } else {
//       throw new Error("Request faild");
//     }
//   } catch (error) {
//     window.alert("해당 ID를 가진 유저가 없습니다!");
//   } finally {
//     console.log("--작업 완료--");
//   }
// }
