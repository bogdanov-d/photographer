const iconMenu = document.querySelector(".menu__icon");
const menuBody = document.querySelector(".menu__body");
const menuLinks = document.querySelectorAll(".menu__link[data-goto]");

if (iconMenu) {
  iconMenu.addEventListener("click", function (e) {
    document.body.classList.toggle("lock");
    iconMenu.classList.toggle("menu-open");
    menuBody.classList.toggle("menu-open");
  });
};


if (menuLinks.length > 0) {
  menuLinks.forEach((menuLink) => {
    menuLink.addEventListener("click", onMenuLinkClick);
  });

  function onMenuLinkClick(e) {
    const menuLink = e.target;
    if (
      menuLink.dataset.goto &&
      document.querySelector(menuLink.dataset.goto)
    ) {
      const gotoBlock = document.querySelector(menuLink.dataset.goto);
      const gotoBlockValue =
        gotoBlock.getBoundingClientRect().top + pageYOffset -
        document.querySelector("header").offsetHeight;

      if (iconMenu.classList.contains("menu-open")) {
        document.body.classList.remove("lock");
        iconMenu.classList.remove("menu-open");
        menuBody.classList.remove("menu-open");
      }

      window.scrollTo({
        top: gotoBlockValue,
        behavior: "smooth",
      });
      e.preventDefault();
    }
  }
};

const swiper = new Swiper(".swiper", {
  loop: true,
  pagination: {
    el: ".swiper-pagination",
  },
  navigation: {
    nextEl: ".carousel__button--next",
    prevEl: ".carousel__button--prev",
  },
});



let center = [55.74669833459595, 37.64925701849364];

function init() {
  let map = new ymaps.Map("map", {
    center: center,
    zoom: 15,
  });
	let placemark = new ymaps.Placemark(center, {}, {
		iconLayout: 'default#image',
		iconImageHref: '../img/map-icon.svg',
		iconImageSize: [24, 24],
		iconImageOffset: [0, 0]
	});

  map.controls.remove("geolocationControl"); 
  map.controls.remove("searchControl"); 
  map.controls.remove("trafficControl"); 
  map.controls.remove("typeSelector"); 
  map.controls.remove("fullscreenControl"); 
  map.controls.remove("zoomControl"); 
  map.controls.remove("rulerControl"); 
  map.behaviors.disable(["scrollZoom"]); 
	map.geoObjects.add(placemark);
}

ymaps.ready(init);