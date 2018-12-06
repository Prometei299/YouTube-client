const hideNotificationCenter = () => {
  document.getElementById('nc').style.display = "none";
}

document.getElementById('close-button').onclick = function() {
  hideNotificationCenter();
}

window.onkeyup = key => {
  switch (key.keyCode) {
    case 37: {
      plusIndex(-1);
      break;
    }
    case 39: {
      plusIndex(1);
      break;
    }
    case 27: {
      hideNotificationCenter();
    }
  }
}

function plusIndex(n){
  currentSlide(slideIndex += n);
}
function currentSlide(n){
  showContent(slideIndex = n);
  document.getElementById(`button${slideIndex}`).checked = true;
}

let slideIndex = 1;

currentSlide(slideIndex);

function showContent(n) {
  const tips = [
    'Ничто так не истощает человека, как продолжительное физическое бездействие!',
    'Если вы хотите изменить что-то малое в своей жизни - измените отношение!',
    'Если вам нужны большие перемены - меняйте мышление!',
    'Труд избавляет человека от трёх главных зол - скуки, порока и нужды!',
    'А бывает проснёшься, и все идеально!:)',
    'Вами упрвляет тот, кто вас злит.'
  ]
  
  var dots = document.getElementsByClassName("dots");
  
  if (n > tips.length){
    slideIndex = 1;
  };
  if (n < 1){
    slideIndex = tips.length;
  };

  document.getElementById("tip").innerHTML = tips[slideIndex - 1];

  for (var i = 0; i < tips.length; i++){
    dots[i].className = dots[i].className.replace(" active","");
  }
  dots[slideIndex - 1].className += " active";
}

