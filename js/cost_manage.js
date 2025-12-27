// 테이블 tbody 가져오기
const tBody = document.getElementById("cost_table");

// localStorage에서 데이터 불러오기
let costlist = localStorage.getItem("costlist");
costlist = costlist ? JSON.parse(costlist) : [];

renderTable("공동");

const filters = document.querySelectorAll('input[name="filter"]');
filters.forEach(function (radio) {
  radio.addEventListener("change", function () {
    renderTable(this.value);
  });
});

function renderTable(filter) {
  tBody.innerHTML = "";

  let filteredList = costlist;

  if (filter !== "공동") {
    filteredList = costlist.filter(function (item) {
      return item.who === filter;
    });
  }

  //테이블에 데이터 추가
  filteredList.forEach(function (item) {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${item.date}</td>
      <td>${item.spendby}</td>
      <td>${item.who}</td>
      <td>$${item.cost}</td>`;

    tBody.appendChild(row);
  });
}

