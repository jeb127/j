/* ===============================
   앱 있으면 앱 / 없으면 웹
================================ */

function openAppOrWeb(appUrl, webUrl) {
  const now = Date.now();

  // 앱 열기 시도
  window.location.href = appUrl;

  // 일정 시간 안에 페이지 이동이 안 됐으면 → 웹
  setTimeout(() => {
    if (Date.now() - now < 1500) {
      window.location.href = webUrl;
    }
  }, 1200);
}

/* ===============================
   구글맵
================================ */
function openGoogleMap() {
  const app = "googlemaps://";
  const web = "https://maps.google.com/";
  openAppOrWeb(app, web);
}

/* ===============================
   파파고
================================ */
function openPapago() {
  const app = "papago://translate";
  const web = "https://papago.naver.com/";
  openAppOrWeb(app, web);
}

/* ===============================
   USJ (공식 앱 딥링크 불안정 → 웹 권장)
================================ */
function openUSJ() {
  window.location.href = "https://www.usj.co.jp/web/ja/jp";
}

/* ===============================
   환율 계산기
   (엔 ↔ 원, 실시간)
================================ */

// 고정 환율 (나중에 바꿀 수 있음)
const RATE = 9.2; // 1엔 ≈ 9.2원

const yenInput = document.getElementById("yen");
const wonInput = document.getElementById("won");

// 엔 → 원
yenInput.addEventListener("input", () => {
  const yen = Number(yenInput.value);
  if (isNaN(yen)) return;

  wonInput.value = Math.round(yen * RATE);
});

// 원 → 엔
wonInput.addEventListener("input", () => {
  const won = Number(wonInput.value);
  if (isNaN(won)) return;

  yenInput.value = Math.round(won / RATE);
});
