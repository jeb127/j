// form 가져오기
const form = document.getElementById("cost_form");

// submit 이벤트 처리
form.addEventListener("submit", function (e) {
  e.preventDefault(); // 페이지 새로고침 방지

  // 입력값 가져오기
  const date = document.querySelector('input[name="date"]:checked');
  const who = document.querySelector('input[name="who"]:checked');
  const spendby = document.getElementById("spendby").value;
  const cost = document.getElementById("cost").value;

  // 유효성 검사
  if (!date || !who || !spendby || !cost) {
    alert("모든 항목 입력")
    return;
  }

  // 객체로 정리
  const costData = {
    date: date.value,
    who: who.value,
    spendby: spendby,
    cost: Number(cost)
  };

  // localStorage에 저장
  saveCost(costData);

  // 관리 페이지로 이동
  window.location.href = "/j/cost_manage.html"
});

function saveCost(data) {
  // 기존 데이터 불러오기
  let costlist = localStorage.getItem("costlist");

  if (costlist == null)
    costlist = [];
  else
    costlist = JSON.parse(costlist);

  // 새 데이터 추가
  costlist.push(data);

  // 다시 저장
  localStorage.setItem("costlist", JSON.stringify(costlist));
}

const cancelBtn = document.getElementById("cancel");
cancelBtn.addEventListener("click", () => {
  window.location.href = "./cost_manage.html";

});
