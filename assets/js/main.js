/**
 * Template Name: iPortfolio - v3.10.0
 * Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */

(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };
  // 대상이 여러개(true)면 쿼리셀렉터all로 배열만들어 or false면 그냥 쿼리셀렉터로 하나만

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);
    if (selectEl) {
      if (all) {
        selectEl.forEach((e) => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };

  const images = [
    `<a
  href="assets/img/study.png"
  class="portfolio-lightbox"
  ><img src="./assets/img/study.png" width="300" height="200"/></a>
  <a
  href="assets/img/study.png"
  class="portfolio-lightbox"
  ><img src="./assets/img/studyMemo.png" width="300" height="200"/></a>`,
    `<a
  href="assets/img/grass.png"
  class="portfolio-lightbox"
  ><img src="./assets/img/grass.png" width="300" height="200"/></a>
  <a
  href="assets/img/bodyProfile.jpeg"
  class="portfolio-lightbox"
  ><img src="./assets/img/bodyProfile.jpeg" width="300" height="200"/></a>`,
    `<a
  href="assets/img/kakaotalk.webp"
  class="portfolio-lightbox"
  ><img src="./assets/img/kakaotalk.webp" width="150" height="150" class="messenger" id="kakao"/></a>
  <a
  href="assets/img/discord.png"
  class="portfolio-lightbox"
  ><img src="./assets/img/discord.png" width="150" height="150" class="messenger" id="dis"/></a>
  <a
  href="assets/img/slack.png"
  class="portfolio-lightbox"
  ><img src="./assets/img/slack.png" width="150" height="150" class="messenger" id="slack"/></a>`,
  ];

  const contents = [
    `<h3>항상 더 배우려는 자세</h3><br>
  <p>부족한 html,css 지식과 여러 프레임워크들을 강의를 보고,직접 사용해보며 친구들과 함께
    스터디를 하여 서로 부족한 부분을 채워주며 공부했습니다.
  </p>`,
    `<h3>꾸준한 노력과 자기개발</h3><br>
  <p>
    매일 공부하며 1커밋 이상하기 위해 노력하며 취미 생활로 운동또한 병행하며 결과물을 남겼습니다
  </p>`,
    `<h3>커뮤니케이션</h3><br>
  <p>
    혼자서 궁금해하기보단 여러 메신저를 통해 친구나 다른 직업 종사자 분들과 소통하며 개발을 하는편입니다. 
  </p>`,
  ];

  console.log(document.querySelectorAll(".paging"));

  var pageNum = 0;
  const pageFunction = (num) => {
    console.log(num);
    document.querySelectorAll(".paging").forEach((value) => {
      value.style.backgroundColor = "white";
    });
    select(".paging", true)[num].style.backgroundColor = "orange";
    select(".content", false).innerHTML = contents[num];
    select(".imageBox", false).innerHTML = images[num];
    GLightbox({
      selector: ".portfolio-lightbox",
    });
  };

  pageFunction(pageNum);

  console.log(contents.length);

  console.log(select(".arrow", true)[0].getAttribute("value"));
  const arrowFunction = (e) => {
    const oper = e.target.getAttribute("value");
    if (oper == "+") {
      if (pageNum == contents.length - 1) {
        pageNum = 0;
      } else pageNum += 1;
    } else {
      if (pageNum == 0) pageNum = contents.length - 1;
      else pageNum -= 1;
    }
    pageFunction(pageNum);
  };
  on("click", ".arrow", arrowFunction, true);
  on(
    "click",
    ".paging",
    function (e) {
      pageNum = e.target.value;
      pageFunction(pageNum);
    },
    true
  );

  /**
   * Easy on scroll event listener
   */
  const onscroll = (el, listener) => {
    el.addEventListener("scroll", listener);
  };

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select("#navbar .scrollto", true);
  const navbarlinksActive = () => {
    let position = window.scrollY + 200;
    navbarlinks.forEach((navbarlink) => {
      if (!navbarlink.hash) return;
      let section = select(navbarlink.hash);
      if (!section) return;
      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        navbarlink.classList.add("active");
      } else {
        navbarlink.classList.remove("active");
      }
    });
  };
  window.addEventListener("load", navbarlinksActive);
  onscroll(document, navbarlinksActive);

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop;
    window.scrollTo({
      top: elementPos,
      behavior: "smooth",
    });
  };

  /**
   * Back to top button
   */
  let backtotop = select(".back-to-top");
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add("active");
      } else {
        backtotop.classList.remove("active");
      }
    };
    window.addEventListener("load", toggleBacktotop);
    onscroll(document, toggleBacktotop);
  }

  /**
   * Mobile nav toggle
   */
  on("click", ".mobile-nav-toggle", function (e) {
    select("body").classList.toggle("mobile-nav-active");
    this.classList.toggle("bi-list");
    this.classList.toggle("bi-x");
  });

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on(
    "click",
    ".scrollto",
    function (e) {
      if (select(this.hash)) {
        e.preventDefault();

        let body = select("body");
        if (body.classList.contains("mobile-nav-active")) {
          body.classList.remove("mobile-nav-active");
          let navbarToggle = select(".mobile-nav-toggle");
          navbarToggle.classList.toggle("bi-list");
          navbarToggle.classList.toggle("bi-x");
        }
        scrollto(this.hash);
      }
    },
    true
  );

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener("load", () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash);
      }
    }
  });

  /**
   * Hero type effect
   */
  const typed = select(".typed");
  if (typed) {
    let typed_strings = typed.getAttribute("data-typed-items");
    typed_strings = typed_strings.split(",");
    new Typed(".typed", {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000,
    });
  }

  /**
   * Skills animation
   */
  let skilsContent = select(".skills-content");
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: "80%",
      handler: function (direction) {
        let progress = select(".progress .progress-bar", true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute("aria-valuenow") + "%";
        });
      },
    });
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener("load", () => {
    let portfolioContainer = select(".portfolio-container");
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: ".portfolio-item",
      });

      let portfolioFilters = select("#portfolio-flters li", true);

      on(
        "click",
        "#portfolio-flters li",
        function (e) {
          e.preventDefault();
          portfolioFilters.forEach(function (el) {
            el.classList.remove("filter-active");
          });
          this.classList.add("filter-active");

          portfolioIsotope.arrange({
            filter: this.getAttribute("data-filter"),
          });
          portfolioIsotope.on("arrangeComplete", function () {
            AOS.refresh();
          });
        },
        true
      );
    }
  });

  /**
   * Initiate portfolio lightbox
   */
  const portfolioLightbox = GLightbox({
    selector: ".portfolio-lightbox",
  });

  /**
   * Portfolio details slider
   */
  new Swiper(".portfolio-details-slider", {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
  });

  /**
   * Testimonials slider
   */
  new Swiper(".testimonials-slider", {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    slidesPerView: "auto",
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20,
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
    },
  });

  /**
   * Animation on scroll
   */
  window.addEventListener("load", () => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();
})();
