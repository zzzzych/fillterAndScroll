window.addEventListener("DOMContentLoaded", () => {
    let header = document.querySelector(".wrap > .header");
    let filterContent = document.querySelector(".container .content");
    let filterItem = document.querySelectorAll(".container .filter-item");
    let filterImg = document.querySelectorAll(".container .filter-item img");
    let filterItemHeight = filterItem[0].clientWidth;
    let popup = document.querySelector(".popup");
    let popupImg = document.querySelector(".popup .content img");
    let btnPopupClose = document.querySelector(".popup .btn-close");
    let filter = document.querySelector(".wrap > .header .filter");
    let filterLi = filter.children;

    //이미지 로딩 시 완료 되기 전 로딩 스피너
    filterImg.forEach((images) => {
        if (images.complete == false && images.naturalHeight == 0) {
            //이미지가 로딩 중일 때
            images.style.opacity = 0;
            images.parentElement.classList.add("loading-spinner");
            window.addEventListener("load", () => {
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
    let animateScroll = () => {
        filterItem.forEach((items) => {
            let filterOffset = items.offsetTop;
            if (window.innerHeight < filterOffset) {
                items.classList.add("hidden");
            } else {
                items.classList.remove("hidden");
            }
        });
        window.addEventListener("scroll", () => {
            filterItem.forEach((items) => {
                let filterOffset = items.offsetTop;
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
        filterItem.forEach((item) => {
            item.style.height = filterItemHeight + "px";
        });
        filterContent.style.gridTemplateRows = filterItemHeight + "px";
        // AOS.init({
        //     startEvent: "DOMContentLoaded",
        //     duration: 300,
        //     delay:0,
        //     once:false,
        //     anchorPlacement: "bottom-bottom",
        //     easing: 'ease'
        // });
    }
    window.addEventListener("resize", () => {
        filterImg = document.querySelectorAll(".container .filter-item img");
        filterItemHeight = filterItem[0].clientWidth;
        setLayout();
    });

    filter.addEventListener("click", (e) => {
        let clickFilter = e.target;
        if (clickFilter.tagName === "LI") {
            let filterName = clickFilter.getAttribute("data-filter");
            for (let i = 0; i < filterLi.length; i++) {
                filterLi[i].classList.remove("active");
            }
            clickFilter.classList.add("active");
            filterItem.forEach((items) => {
                if (filterName === "all") {
                    // AOS.refreshHard();
                    animateScroll();
                    items.style.display = "block";
                } else if (filterName === "animal") {
                    animateScroll();
                    // AOS.refreshHard();
                    if (items.dataset.name == "animal") {
                        items.style.display = "block";
                    } else {
                        items.style.display = "none";
                    }
                } else if (filterName === "human") {
                    animateScroll();
                    // AOS.refreshHard();
                    if (items.dataset.name == "human") {
                        items.style.display = "block";
                    } else {
                        items.style.display = "none";
                    }
                } else if (filterName === "product") {
                    animateScroll();
                    // AOS.refreshHard();
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

    filterItem.forEach((items) => {
        items.addEventListener("click", () => {
            let imgSrc = items.children[0].getAttribute("src");
            popupImg.src = `${imgSrc}`;
            document.body.classList.add("open");
            popup.style.display = "block";
        });
    });
    btnPopupClose.addEventListener("click", () => {
        document.body.classList.remove("open");
        popup.style.display = "none";
    });
    window.addEventListener("scroll", () => {
        if (scrollY > 1) {
            header.classList.add("scroll");
        } else {
            header.classList.remove("scroll");
        }
    });
});
