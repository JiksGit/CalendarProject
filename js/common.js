/* 계산 함수나 단순 기능 함수 집합 */

// 현재 메인 달력 시간 계산
function getCurrentTime(year, month) {
  let d = new Date(year, month);
  currentYear = d.getFullYear();
  currentMonth = d.getMonth();
}

// 현재 미니 달력 시간 계산
function getMiniCurrentTime(year, month) {
  let d = new Date(year, month);
  miniCurrentYear = d.getFullYear();
  miniCurrentMonth = d.getMonth();
}

// 현재 달의 첫번째 날짜 구하기
function getStartDay(year, month) {
  let d = new Date(year, month, 1);
  return d.getDay();
}

// 현재 달의 첫번째 요일 구하기
function getLastDate(year, month) {
  let d = new Date(year, month + 1, 0);
  return d.getDate();
}

// 이전 버튼 누를 시 현재 메인 달력 날짜 갱신
function prev() {
  getCurrentTime(currentYear, currentMonth - 1);
  printTitle();
  clearCell();
  printNum();
  diaryCellPrint();
}

// 오늘 버튼 누를 시 현재 메인 달력 날짜 갱신
function now() {
  let d = new Date();
  getCurrentTime(d.getFullYear(), d.getMonth());
  printTitle();
  clearCell();
  printNum();
  diaryCellPrint();
}

// 다음 버튼 누를 시 현재 메인 달력 날짜 갱신
function next() {
  getCurrentTime(currentYear, currentMonth + 1);
  printTitle();
  clearCell();
  printNum();
  diaryCellPrint();
}

// 이전 버튼 누를 시 현재 미니 달력 날짜 갱신
function miniPrev() {
  getMiniCurrentTime(miniCurrentYear, miniCurrentMonth - 1);
  clearMiniCell();
  printMiniTitle();
  printMiniNum();
}

// 다음 버튼 누를 시 현재 미니 달력 날짜 갱신
function miniNext() {
  getMiniCurrentTime(miniCurrentYear, miniCurrentMonth + 1);
  clearMiniCell();
  printMiniTitle();
  printMiniNum();
}

// 공휴일 json data와 cell의 날짜가 일치할 시 공휴일 지정
function checkData(cell, divName, year, month, date) {
  let div_name = divName;
  for (let k = 0; k < restArray.length; k++) {
    let rest = restArray[k];

    if (rest.year == year && rest.month == month && rest.date == date) {
      if (div_name == "restDiv") {
        cell[div_name].innerText = rest.title;
        cell[div_name].style.textAlign = "right";
      }
      cell[div_name].style.color = "red";
      cell.setDateColor("red");
    }
  }
}
