let currentImage = 0;
//elements:
const thumbnails = document.querySelectorAll(".thumb-area img");
const mainImg = document.getElementById("mainImg");
const imgTitle = document.getElementById("image-title");
const imgDesc = document.getElementById("image-description");
const nextBtn = document.getElementById("next-button");
const prevBtn = document.getElementById("prev-button");

const audioBtn = document.getElementById("audio-button");
//thumbnail selector:

for (let i = 0; i < thumbnails.length; i++) {
  thumbnails[i].addEventListener("click", function () {
    let splitURL = thumbnails[i].src.split("/");
    let title = splitURL[splitURL.length - 1];
    currentImage = i;
    splitURL[splitURL.length - 2] = "fullres";
    let newURL = splitURL.join("/");
    imgDesc.textContent = thumbnails[i].alt;
    mainImg.srcset = `assets/images/100/${title}   100w,
    assets/images/300/${title}   300w,
    assets/images/600/${title}   600w,
    assets/images/1050/${title} 1050w,
    assets/images/1600/${title} 1600w`;
    mainImg.src = newURL;
    imgTitle.textContent = title.split("-").join(" ").slice(0, -4);
  });
}

//next & prev buttons:
nextBtn.addEventListener("click", () => {
  let ci = 0;
  currentImage <= thumbnails.length - 2 ? (ci = currentImage) : (ci = -1);
  //   if (currentImage <= thumbnails.length) {
  //     ci = currentImage} else {ci = 0};
  thumbnails[ci + 1].click();
});

prevBtn.addEventListener("click", () => {
  let ci = 0;
  currentImage > 0 ? (ci = currentImage) : (ci = thumbnails.length);
  //   if (currentImage <= thumbnails.length) {
  //     ci = currentImage} else {ci = 0};
  //   debugger;
  thumbnails[ci - 1].click();
});

//audio button
audioBtn.addEventListener("click", () => {
  let msg = new SpeechSynthesisUtterance();
  msg.text = `${imgTitle.textContent}. ${imgDesc.textContent}`;
  window.speechSynthesis.speak(msg);
});
//keyboard nav
document.addEventListener(
  "keydown",
  (event) => {
    let name = event.key;
    let code = event.code;
    switch (code) {
      case "ArrowLeft":
        prevBtn.click();
        break;
      case "KeyP":
        prevBtn.click();
        break;
      case "ArrowRight":
        nextBtn.click();
        break;
      case "KeyN":
        prevBtn.click();
        break;
      case "Space":
        let msg = new SpeechSynthesisUtterance();
        msg.text = imgDesc.textContent;
        window.speechSynthesis.speak(msg);
        break;
      case "KeyA":
        let msgA = new SpeechSynthesisUtterance();
        msgA.text = imgDesc.textContent;
        window.speechSynthesis.speak(msgA);
        break;
    }
    // console.log(`Key pressed ${name} \r\n Key code value: ${code}`);
  },
  false
);
