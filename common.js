function getCurrentTime(year, month) {
  let d = new Date(year, month);
  currentYear = d.getFullYear();
  currentMonth = d.getMonth();
}

function getMiniCurrentTime(year, month) {
  let d = new Date(year, month);
  miniCurrentYear = d.getFullYear();
  miniCurrentMonth = d.getMonth();
}

function getStartDay(year, month) {
  let d = new Date(year, month, 1);
  return d.getDay();
}

function getLastDate(year, month) {
  let d = new Date(year, month + 1, 0);
  return d.getDate();
}

function prev() {
  getCurrentTime(currentYear, currentMonth - 1);
  printTitle();
  clearCell();
  printNum();
  diaryCellPrint();
}

function now() {
  let d = new Date();
  getCurrentTime(d.getFullYear(), d.getMonth());
  printTitle();
  clearCell();
  printNum();
  diaryCellPrint();
}

function next() {
  getCurrentTime(currentYear, currentMonth + 1);
  printTitle();
  clearCell();
  printNum();
  diaryCellPrint();
}

function miniPrev() {
  getMiniCurrentTime(miniCurrentYear, miniCurrentMonth - 1);
  clearMiniCell();
  printMiniTitle();
  printMiniNum();
}

function miniNext() {
  getMiniCurrentTime(miniCurrentYear, miniCurrentMonth + 1);
  clearMiniCell();
  printMiniTitle();
  printMiniNum();
}

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
