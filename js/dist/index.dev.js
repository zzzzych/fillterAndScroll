"use strict";

window.addEventListener("DOMContentLoaded", function () {
  var header = document.querySelector(".wrap > .header");
  var filterContent = document.querySelector(".container .content");
  var filterItem = document.querySelectorAll(".container .filter-item");
  var filterImg = document.querySelectorAll(".container .filter-item img");
  var filterItemHeight = filterItem[0].clientWidth;
  var popup = document.querySelector(".popup");
  var popupImg = document.querySelector(".popup .content img");
  var btnPopupClose = document.querySelector(".popup .btn-close");
  var filter = document.querySelector(".wrap > .header .filter");
  var filterLi = filter.children; //이미지 로딩 시 완료 되기 전 로딩 스피너

  filterImg.forEach(function (images) {
    if (images.complete == false && images.naturalHeight == 0) {
      //이미지가 로딩 중일 때
      images.style.opacity = 0;
      images.parentElement.classList.add("loading-spinner");
      window.addEventListener("load", function () {
        // 이미지가 로딩이 완료 되었을 때
        images.parentElement.classList.remove("loading-spinner");
        images.style.opacity = 1;
      });
    } else if (images.complete == true && images.naturalHeight !== 0) {
      return;
    } else {
      return;
    }
  });
  setLayout();

  var animateScroll = function animateScroll() {
    filterItem.forEach(function (items) {
      var filterOffset = items.offsetTop;

      if (window.innerHeight < filterOffset) {
        items.classList.add("hidden");
      } else {
        items.classList.remove("hidden");
      }
    });
    window.addEventListener("scroll", function () {
      filterItem.forEach(function (items) {
        var filterOffset = items.offsetTop;

        if (window.innerHeight + scrollY - 30 < filterOffset) {
          items.classList.add("hidden");
        } else {
          items.classList.remove("hidden");
        }
      });
    });
  };

  animateScroll();

  function setLayout() {
    filterItem.forEach(function (item) {
      item.style.height = filterItemHeight + "px";
    });
    filterContent.style.gridTemplateRows = filterItemHeight + "px"; // AOS.init({
    //     startEvent: "DOMContentLoaded",
    //     duration: 300,
    //     delay:0,
    //     once:false,
    //     anchorPlacement: "bottom-bottom",
    //     easing: 'ease'
    // });
  }

  window.addEventListener("resize", function () {
    filterImg = document.querySelectorAll(".container .filter-item img");
    filterItemHeight = filterItem[0].clientWidth;
    setLayout();
  });
  filter.addEventListener("click", function (e) {
    var clickFilter = e.target;

    if (clickFilter.tagName === "LI") {
      var filterName = clickFilter.getAttribute("data-filter");

      for (var i = 0; i < filterLi.length; i++) {
        filterLi[i].classList.remove("active");
      }

      clickFilter.classList.add("active");
      filterItem.forEach(function (items) {
        if (filterName === "all") {
          // AOS.refreshHard();
          animateScroll();
          items.style.display = "block";
        } else if (filterName === "animal") {
          animateScroll(); // AOS.refreshHard();

          if (items.dataset.name == "animal") {
            items.style.display = "block";
          } else {
            items.style.display = "none";
          }
        } else if (filterName === "human") {
          animateScroll(); // AOS.refreshHard();

          if (items.dataset.name == "human") {
            items.style.display = "block";
          } else {
            items.style.display = "none";
          }
        } else if (filterName === "product") {
          animateScroll(); // AOS.refreshHard();

          if (items.dataset.name == "product") {
            items.style.display = "block";
          } else {
            items.style.display = "none";
          }
        } else {
          return;
        }
      });
    } else {
      return;
    }
  });
  filterItem.forEach(function (items) {
    items.addEventListener("click", function () {
      var imgSrc = items.children[0].getAttribute("src");
      popupImg.src = "".concat(imgSrc);
      document.body.classList.add("open");
      popup.style.display = "block";
    });
  });
  btnPopupClose.addEventListener("click", function () {
    document.body.classList.remove("open");
    popup.style.display = "none";
  });
  window.addEventListener("scroll", function () {
    if (scrollY > 1) {
      header.classList.add("scroll");
    } else {
      header.classList.remove("scroll");
    }
  });
});