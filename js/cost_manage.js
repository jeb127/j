// ===== DOM =====
const tBody = document.getElementById("cost_table");
const cavTotalEl = document.getElementById("cav_total");
const jhTotalEl = document.getElementById("jh_total");
const mjTotalEl = document.getElementById("mj_total");

const radios = document.querySelectorAll('input[name="filter"]');

// ===== 데이터 =====
let costlist = JSON.parse(localStorage.getItem("costlist")) || [];

// ===== 비밀번호 관련 =====
let currentUser = null;

// ===== 초기: 공동 =====
render("공동");
document.querySelector('input[value="공동"]').checked = true;

// ===== 필터 이벤트 =====
radios.forEach(radio => {
  radio.addEventListener("change", () => {
    const user = radio.value;

    if (user === "공동") {
      render("공동");
      return;
    }

    currentUser = user;

    if (!hasPassword(user)) {
      openModal("set");
    } else {
      openModal("check");
    }
  });
});

// ===== 메인 렌더 =====
function render(filter) {
  const visibleList = getVisibleList(filter);
  renderTable(visibleList);
  renderTotals(filter, visibleList);
}

// ===== 테이블에 보여줄 목록 =====
function getVisibleList(filter) {
  if (filter === "공동") {
    return costlist.filter(item => item.who === "공동");
  }
  return costlist.filter(
    item => item.who === "공동" || item.who === filter
  );
}

// ===== 테이블 렌더 =====
function renderTable(list) {
  tBody.innerHTML = "";

  if (list.length === 0) {
    tBody.innerHTML = `<tr><td colspan="4" style="text-align:center;">내역 없음</td></tr>`;
    return;
  }

  list.forEach(item => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${item.date}</td>
      <td>${item.spendby}</td>
      <td>${item.who}</td>
      <td>${Number(item.cost).toLocaleString()}원</td>
    `;
    tBody.appendChild(tr);
  });
}

// ===== 합계 =====
function renderTotals(filter, list) {
  let total = 0;
  let personal = 0;

  list.forEach(item => {
    const cost = Number(item.cost) || 0;

    if (item.who === "공동") {
      total += cost;
      if (filter !== "공동") personal += cost / 2;
    } else {
      total += cost;
      personal += cost;
    }
  });

  cavTotalEl.textContent = Math.round(total).toLocaleString();
  jhTotalEl.textContent = Math.round(personal).toLocaleString();
  mjTotalEl.textContent = Math.round(personal).toLocaleString();

  cavTotalEl.parentElement.style.display = "none";
  jhTotalEl.parentElement.style.display = "none";
  mjTotalEl.parentElement.style.display = "none";

  if (filter === "공동") cavTotalEl.parentElement.style.display = "";
  if (filter === "지현") jhTotalEl.parentElement.style.display = "";
  if (filter === "민지") mjTotalEl.parentElement.style.display = "";
}

// ===== 비밀번호 존재 여부 =====
function hasPassword(user) {
  const pw = JSON.parse(localStorage.getItem("cost_passwords")) || {};
  return !!pw[user];
}

// ===== 모달 열기 =====
function openModal(mode) {
  const modal = document.getElementById("pw-modal");
  const title = document.getElementById("pw-title");
  const input = document.getElementById("pw-input");

  title.textContent =
    mode === "set"
      ? `${currentUser} 비밀번호 설정`
      : `${currentUser} 비밀번호 입력`;

  input.value = "";
  modal.dataset.mode = mode;
  modal.classList.remove("hidden");
  input.focus();
}

// ===== 확인 버튼 =====
document.getElementById("pw-confirm").addEventListener("click", () => {
  const input = document.getElementById("pw-input").value;
  const modal = document.getElementById("pw-modal");

  if (!/^\d{4}$/.test(input)) {
    alert("숫자 4자리만 가능");
    return;
  }

  const pw = JSON.parse(localStorage.getItem("cost_passwords")) || {};

  if (modal.dataset.mode === "set") {
    pw[currentUser] = input;
    localStorage.setItem("cost_passwords", JSON.stringify(pw));
    modal.classList.add("hidden");
    render(currentUser);
    return;
  }

  if (pw[currentUser] === input) {
    modal.classList.add("hidden");
    render(currentUser);
  } else {
    alert("비밀번호 틀림");
    modal.classList.add("hidden");
    resetFilter();
  }
});

// ===== 취소 버튼 =====
document.getElementById("pw-cancel").addEventListener("click", () => {
  document.getElementById("pw-modal").classList.add("hidden");
  resetFilter();
});

// ===== 필터 원복 =====
function resetFilter() {
  document.querySelector('input[value="공동"]').checked = true;
  render("공동");
}
