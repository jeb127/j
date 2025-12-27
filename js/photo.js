// 요소 가져오기
const photoInput = document.getElementById("photo_input");
const addBtn = document.getElementById("add_photo");
const gallery = document.getElementById("gallery");
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal_img");
const downloadBtn = document.getElementById("select");

// 추가 버튼 클릭
addBtn.addEventListener("click", function () {
  const files = photoInput.files;

  if (!files || files.length === 0) {
    alert("사진을 선택해줘!");
    return;
  }

  Array.from(files).forEach(function (file) {
    if (!file.type.startsWith("image/")) return;

    const img = document.createElement("img");
    img.src = URL.createObjectURL(file);

    // 썸네일 기본 스타일
    img.style.width = "150px";
    img.style.margin = "10px";
    img.style.borderRadius = "12px";
    img.style.cursor = "pointer";

    // 선택 토글 (CTRL 개념)
    img.addEventListener("click", function (e) {
      e.stopPropagation(); // 모달 방지
      img.classList.toggle("selected");
    });

    // 더블 클릭하면 확대
    img.addEventListener("dblclick", function () {
      modalImg.src = img.src;
      modal.classList.remove("hidden");
    });

    gallery.appendChild(img);
  });

  photoInput.value = "";
});

// 모달 닫기
modal.addEventListener("click", function () {
  modal.classList.add("hidden");
});

// 선택한 사진 다운로드
downloadBtn.addEventListener("click", function () {
  const selectedImgs = document.querySelectorAll(".selected");

  if (selectedImgs.length === 0) {
    alert("저장할 사진을 선택해줘!");
    return;
  }

  selectedImgs.forEach(function (img, index) {
    const a = document.createElement("a");
    a.href = img.src;
    a.download = `kansai_${index + 1}.jpg`;
    a.click();
  });
});
