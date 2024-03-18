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

const form = document.getElementById("form");
const secondDiv = form.firstElementChild.nextElementSibling;
const thirdDiv = secondDiv.nextElementSibling;

// 시 / 도 선택 시 이벤트
let firstSelectedOption;
let secondSelectedOption;
let thirdSelectedOption;

firstStep.addEventListener("change", function () {
  firstSelectedOption = this.value; // select값 가져오기
  secondSelectedOption = "*옵션";
  thirdSelectedOption = "*옵션";
  if (firstSelectedOption === "undefined") {
    secondDiv.classList.add("hidden");
    thirdDiv.classList.add("hidden");
    document.getElementById("submitBtn").disabled = true;
  } else {
    document.getElementById("submitBtn").disabled = false;
    secondDiv.classList.remove("hidden");
    thirdDiv.classList.add("hidden");
  }
  secondSelectRender(firstSelectedOption);
});

// firstStep.onchange = () => {
//   firstSelectedOption = firstStep.options[firstStep.selectedIndex].value;
//   if (firstSelectedOption === "undefined") {
//     secondDiv.classList.add("hidden");
//     thirdDiv.classList.add("hidden");
//     document.getElementById("submitBtn").disabled = true;
//   } else {
//     document.getElementById("submitBtn").disabled = false;
//     secondDiv.classList.remove("hidden");
//   }
// };

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
  secondStep.replaceChildren(option); // 새로 갈아치우기
  for (var i = 0; i < secondStepArray.length; i++) {
    var option = document.createElement(`option`);
    option.value = secondStepArray[i];
    option.innerText = secondStepArray[i];
    secondStep.append(option);
  }
}
// 시 / 군 / 구 선택 시 이벤트
secondStep.addEventListener("change", function () {
  secondSelectedOption = this.value;
  thirdSelectedOption = "*옵션";
  if (secondSelectedOption === "*옵션") {
    thirdDiv.classList.add("hidden");
  } else {
    thirdDiv.classList.remove("hidden");
  }
  thirdSelectRender(secondSelectedOption);
});

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

thirdStep.addEventListener("change", function () {
  thirdSelectedOption = this.value;
});

// 지역 정보 submit 버튼
const btn = document.getElementById("submitBtn");
btn.addEventListener("click", submit);

function submit() {
  //print console
  console.log(firstSelectedOption, secondSelectedOption, thirdSelectedOption);
  // getdxdy
  const vilage_information = data
    .filter((element) => element.firstStep === firstSelectedOption)
    .filter((element) => element.secondStep === secondSelectedOption)
    .filter((element) => element.thirdStep === thirdSelectedOption);
  // session에 저장하고 화면 바꾸기
  sessionSaveAndHref(vilage_information);

  function sessionSaveAndHref(vilage_information) {
    //  sessionStorage, string to Json
    sessionStorage.setItem(
      "Vilage_information",
      JSON.stringify(vilage_information)
    );
    location.href = `http://127.0.0.1:5500/forecastView.html`;
  }
}

