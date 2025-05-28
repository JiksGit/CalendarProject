function printIcon(cell, year, month, date) {
  for (let j = 0; j < diaryArray.length; j++) {
    let diary = diaryArray[j];
    if (diary.year == year && diary.month == month && diary.date == date) {
      cell.renderIcon(diary.icon, 35); //공휴일은 스티커 제거
    }
  }
}

function printNum() {
  let index = 0; // index는 42개의 셀에 대한 인덱스
  let date = 1; // date는 현재 달의 날짜 인덱스
  let nextDate = 1;
  for (let i = 0; i < cellArray.length; i++) {
    for (let j = 0; j < cellArray[0].length; j++) {
      // 이전 달의 마지막 날들 회색으로 추가
      if(index < getStartDay(currentYear, currentMonth)){
        // 이전 달의 현재 cell의 날짜 = 이전 달의 마지막 날짜 - ( 현재 달의 시작 요일 - 현재 cell의 인덱스) + 1 
        cellArray[i][j].setDate(currentYear, currentMonth-1, getLastDate(currentYear, currentMonth-1) - (getStartDay(currentYear, currentMonth) - index) +  1);
        cellArray[i][j].setDateColor("gray");
        // cellArray[i][j].cleardiaryCells();
      }
      else if (
        // index가 해당 시작 요일보다 같거나 크고, 해당 달의 날짜는 그 달의 마지막 날짜보다 같거나 작아야함
        index >= getStartDay(currentYear, currentMonth) &&
        date <= getLastDate(currentYear, currentMonth)
      ) {
        cellArray[i][j].setDate(currentYear, currentMonth, date);
        cellArray[i][j].setDateColor("black"); // 공휴일 setRed 초기화
        checkData(cellArray[i][j], "restDiv", currentYear, currentMonth, date);
        printIcon(cellArray[i][j], currentYear, currentMonth, date);
        date++;
        if (j % 6 == 0) cellArray[i][j].setDateColor("blue");
        if (j % 7 == 0) cellArray[i][j].setDateColor("red");
      }
      // 다음 달의 이전 날들 회색으로 추가
      else { 
        cellArray[i][j].setDate(currentYear, currentMonth+1, nextDate++);
        cellArray[i][j].setDateColor("gray");
      }
      index++;
    }
  }
}
function printMiniNum() {
  let index = 0;
  let date = 1;
  let nextDate = 1;
  for (let i = 0; i < minicellArray.length; i++) {
    for (let j = 0; j < minicellArray[0].length; j++) {
      if(index < getStartDay(miniCurrentYear, miniCurrentMonth)){
        // 이전 달의 현재 minicell의 날짜 = 이전 달의 마지막 날짜 - ( 현재 달의 시작 요일 - 현재 minicell의 인덱스) + 1 
        minicellArray[i][j].setDate(miniCurrentYear, miniCurrentMonth-1, getLastDate(miniCurrentYear, miniCurrentMonth-1) - (getStartDay(miniCurrentYear, miniCurrentMonth) - index) +  1);
        minicellArray[i][j].setDateColor("gray");
      }
      else if (
        index >= getStartDay(miniCurrentYear, miniCurrentMonth) &&
        date <= getLastDate(miniCurrentYear, miniCurrentMonth)
      ) {
        minicellArray[i][j].setDate(miniCurrentYear, miniCurrentMonth, date);
        minicellArray[i][j].setDateColor("black"); // 공휴일 setRed 초기화
        checkData(
          minicellArray[i][j],
          "div",
          miniCurrentYear,
          miniCurrentMonth,
          date
        );
        if (j % 6 == 0) minicellArray[i][j].setDateColor("blue");
        if (j % 7 == 0) minicellArray[i][j].setDateColor("red");
        date++;
      }
      else { 
        minicellArray[i][j].setDate(miniCurrentYear, miniCurrentMonth+1, nextDate++);
        minicellArray[i][j].setDateColor("gray");
      }
      index++;
    }
  }
}

function clearCell() {
  for (let i = 0; i < cellArray.length; i++) {
    for (let j = 0; j < cellArray[0].length; j++) {
      cellArray[i][j].numDiv.innerText = "";
      cellArray[i][j].titleDiv.innerText = "";
      cellArray[i][j].restDiv.innerText = "";
      if (cellArray[i][j].iconDiv.children.length > 0) {
        cellArray[i][j].iconDiv.removeChild(cellArray[i][j].icon);
      }
    }
  }
  document.getElementById("dialog").style.zIndex = -9999;
}

function clearMiniCell() {
  for (let i = 0; i < minicellArray.length; i++) {
    for (let j = 0; j < minicellArray[0].length; j++) {
      minicellArray[i][j].div.innerText = "";
    }
  }
}

function createDayHeaders() {
  let days = ["일", "월", "화", "수", "목", "금", "토"];
  let container = document.getElementById("date_print");
  let headerHeight = 20;
  let c_width = 1680 / 7;

  for (let i = 0; i < days.length; i++) {
    let dayDiv = document.createElement("div");
    if (i == 0) dayDiv.style.color = "red";
    if (i == days.length - 1) dayDiv.style.color = "blue";
    dayDiv.innerText = days[i];
    dayDiv.style.position = "absolute";
    dayDiv.style.left = `${i * c_width}px`;
    dayDiv.style.top = "0px";
    dayDiv.style.textAlign = "right";
    dayDiv.style.padding = "0px 5px 0px 0px";
    dayDiv.style.width = `${c_width}px`;
    dayDiv.style.lineHeight = `${headerHeight}px`;
    dayDiv.style.height = `${headerHeight}px`;
    dayDiv.style.backgroundColor = "white";
    dayDiv.style.borderTop = "1px solid lightgray";
    dayDiv.style.borderLeft = "1px solid lightgray";
    dayDiv.style.borderRight = "1px solid lightgray";
    dayDiv.style.boxSizing = "border-box";
    container.appendChild(dayDiv);
  }
}

function createCell() {
  for (let i = 0; i < cellArray.length; i++) {
    for (let j = 0; j < cellArray[0].length; j++) {
      let c_width = 1680 / 7;
      let c_height = 760 / 6;
      let cell = new Cell(
        document.getElementById("content_section"),
        j * c_width,
        i * c_height,
        c_width,
        c_height,
        "white",
        "lightgray",
        0
      );
      cellArray[i][j] = cell;
    }
  }
  for (let i = 0; i < minicellArray.length; i++) {
    for (let j = 0; j < minicellArray[0].length; j++) {
      let m_width = 185 / 7;
      let m_height = 180 / 6;
      let m_cell = new MiniCell(
        document.getElementById("mini_section"),
        j * m_width,
        i * m_height,
        m_width,
        m_height,
        "white",
        "lightgray",
        0
      );
      minicellArray[i][j] = m_cell;
    }
  }
}
function printTitle() {
  let inner = currentMonth < 9 ? ".0" : ".";
  document.querySelector(
    "#content_header h2"
  ).innerText = `${currentYear}${inner}${currentMonth + 1}`;
}
function printMiniTitle() {
  let inner = miniCurrentMonth < 9 ? ".0" : ".";
  document.querySelector(
    "#mini_calendar span"
  ).innerText = `${miniCurrentYear}${inner}${miniCurrentMonth + 1}`;
}

function findCellByDate(date) {
    for (let i = 0; i < cellArray.length; i++) {
      for (let j = 0; j < cellArray[0].length; j++) {
        if (cellArray[i][j].month == currentMonth && cellArray[i][j].date === parseInt(date)) {
          return cellArray[i][j];
        }
      }
    }
  return null;
}

// 다이어리 셀 보여주기
function diaryCellPrint() {
  // 먼저 전체 달력 초기화
  for (let i = 0; i < cellArray.length; i++) {
    for (let j = 0; j < cellArray[0].length; j++) {
      cellArray[i][j].cleardiaryCells(); // diary셀 초기화
    }
  }

  // 현재 달에 해당하는 일기만 다시 그리기
  for (let i = 0; i < diaryArray.length; i++) {
    const d = diaryArray[i];
    if (d.year === currentYear && d.month === currentMonth) {
      const cell = findCellByDate(d.date); // 해당 날짜의 셀 찾기

      if (cell) {
        let diaryCell = new DiaryCell(
          cell.titleDiv,
          cell.x + 50,
          cell.y + 68,
          d.bg,
          "white",
          d.title,
          d.place,
          d.description,
          d.date,
          cell
        );
      }
    }
  }

  // 등록 폼 숨기기
  document.getElementById("content_header").style.display = "block";
  document.getElementById("date_print").style.display = "block";
  document.getElementById("content_section").style.display = "block";
  document.getElementById("holder_header").style.display = "none";
  document.getElementById("holder").style.display = "none";
}

// 등록 폼 보여주기
function formPrint(obj) {
  document.getElementById("content_header").style.display = "none";
  document.getElementById("date_print").style.display = "none";
  document.getElementById("content_section").style.display = "none";
  document.getElementById("holder_header").style.display = "block";
  document.getElementById("holder").style.display = "block";

  currentCell = obj;
  setTimeout(() => {
    document.querySelector('input[name="title"]').focus();
  }, 0);
}
