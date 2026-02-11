/* ================================
   🧊 IT Park Header Interaction
================================ */
document.addEventListener("DOMContentLoaded", () => {

  const navItems = document.querySelectorAll('.itp-nav-item.has-megamenu');
  const overlay = document.querySelector('.itp-overlay');
  const toggle = document.getElementById("menu-toggle");
  const nav = document.querySelector(".itp-mainnav");
  const icon = toggle ? toggle.querySelector("i") : null;

  // ================================
  // 🧱 1. Mega Menu Hover (Desktop)
  // ================================
  navItems.forEach(item => {
    const menu = item.querySelector('.itp-megamenu.apple-style');
    if (!menu) return;

    // Hover (Desktop)
    item.addEventListener('mouseenter', () => {
      if (window.innerWidth > 1024) {
        menu.classList.add('active');
        overlay?.classList.add('active');
      }
    });

    item.addEventListener('mouseleave', () => {
      if (window.innerWidth > 1024) {
        setTimeout(() => {
          if (!menu.matches(':hover')) {
            menu.classList.remove('active');
            overlay?.classList.remove('active');
          }
        }, 150);
      }
    });
  });

  // ================================
  // 🪄 2. Overlay click → бүхнийг хаах
  // ================================
  if (overlay) {
    overlay.addEventListener('click', () => {
      document.querySelectorAll('.itp-megamenu.apple-style').forEach(m => m.classList.remove('active'));
      overlay.classList.remove('active');
    });
  }

  // ================================
  // 🍔 3. Burger Toggle
  // ================================
  if (toggle && nav && icon) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("active");
      icon.classList.toggle("fa-times");
      icon.classList.toggle("fa-bars");
    });
  }

const dropdownParents = document.querySelectorAll(".itp-nav-item.has-megamenu");

dropdownParents.forEach(item => {
  const mainLink = item.children[0]; // ✅ эхний <a> линк
  const megaMenu = item.querySelector(".itp-megamenu");

  mainLink.addEventListener("click", e => {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      console.log("All items:", dropdownParents.length);
dropdownParents.forEach(item => {
  const mainLink = item.querySelector("a");
  console.log("Found link:", mainLink?.textContent.trim());
});

      // өмнө нь үүссэн dropdown байвал toggle хийх
      let dropdown = item.querySelector(".mobile-dropdown");

      if (!dropdown) {
        dropdown = document.createElement("div");
        dropdown.classList.add("mobile-dropdown");

        if (megaMenu) {
          megaMenu.querySelectorAll("a").forEach(a => {
            const text = a.querySelector("h4") ? a.querySelector("h4").textContent.trim() : a.textContent.trim();
            const href = a.getAttribute("href") || "#";
            const simpleLink = document.createElement("a");
            simpleLink.textContent = text;
            simpleLink.href = href;
            dropdown.appendChild(simpleLink);
          });
        }
        item.appendChild(dropdown);
      }

      // 🧩 зөвхөн тухайн dropdown-оо toggle хийж ажиллуулна
      dropdown.classList.toggle("active");

      // бусад dropdown-уудыг хаах
      document.querySelectorAll(".itp-nav-item.has-megamenu").forEach(other => {
        if (other !== item) {
          other.querySelector(".mobile-dropdown")?.classList.remove("active");
          const otherArrow = other.querySelector("i.fa-chevron-up");
          if (otherArrow) {
            otherArrow.classList.replace("fa-chevron-up", "fa-chevron-down");
          }
        }
      });

      // иконыг toggle хийх
      const arrow = mainLink.querySelector("i");
      if (arrow) {
        arrow.classList.toggle("fa-chevron-down");
        arrow.classList.toggle("fa-chevron-up");
      }
    }
  });
});

  // ================================
  // 🎢 5. Scroll → Header gradient
  // ================================
  window.addEventListener('scroll', () => {
    const header = document.querySelector('.itp-header');
    if (window.scrollY > 50) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  });

  // ================================
  // 🧹 6. Resize reset
  // ================================
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1024) {
      document.querySelectorAll('.mobile-dropdown').forEach(d => d.remove());
      document.querySelectorAll('.itp-megamenu.apple-style').forEach(menu => menu.classList.remove('active'));
    }
    if (nav?.classList.contains('active')) {
      nav.classList.remove('active');
      icon?.classList.replace('fa-times', 'fa-bars');
    }
  });

  // ================================
  // 👥 7. Profile Popup Modal
  // ================================
  const profiles = [
    {
      name: "Намсрай Авирмэд",
      title: "Албан тушаал:Захирлын албыг түр хавсран гүйцэтгэгч",
      img: "images/director/z1.png",
      desc: "Товч намтар:\n1967-1972 онд Сайд нарын Зөвлөлийн Улсын төлөвлөгөөний комисст орлогч дарга,\n1972-1977 онд Шинжлэх ухаан, техникийн Улсын хорооны орлогч дарга, ШУТИС-ны захирлын үүрэг гүйцэтгэгч,\n1977-1983 онд Москвад Удирлагын асуудал судлах олон улсын эрдэм шинжилгээний ахлах ажилтан,\n1983-1990 онд Шинжлэх ухаан, дээд боловсролын Улсын хороонд хэлтсийн дарга тус тус хийж байв"
    },
    {
      name: "Насантогтох Хүүхэнжимээ",
      title: "Албан тушаал: ШУТМТ-н Захирал",
      img: "images/director/z2.png",
      desc: "Товч намтар:\n1973-1975, 1976-1980 онуудад ШУТМ-н Олон улсын төвийн гишүүн орнуудын Бүрэн эрхт төлөөлөгч,\n1973-1980 онуудад ШУТИС-ны захирал"
    },
    {
      name: "Бат Амгалан",
      title: "Албан тушаал: Захирлын үүрэг гүйцэтгэгч",
      img: "images/director/z3.png",
      desc: "Товч намтар:\n1972-1980 онд ШУТУХ-нд мэргэжилтэн\n1980-1982 онд ШУТИС-ийн орлогч дарга,Захирлын үүрэг гүйцэтгэгч \n1982-1996 онд ШУТИС-ны эрдэм шинжилгээний ажилтнаар ажиллаж байв."
     },
    {
      name: "Түдэв Доржбал",
      title: "Албан тушаал: Захирал",
      img: "images/director/z4.png",
      desc: "Товч намтар:\n1974 оноос Тэр үеийн Аж үйлдвэрийн яамны харьяа Нүүрсний үйлдвэрлэлийн нэгдэлд инженер-эдийн засагч\n1978 оноос Шинжлэх ухаан, техникийн мэдээллийн төвд эрдэм шинжилгээний ажилтан \n1981 оноос Шинжлэх ухаан, техникийн мэдээллийн төвийн захирал \n2000 оноос Үйлдвэр худалдааны сайдын зөвлөх \n2005 оноос Орос-Монголын Монросцветмет нэгдлийн Техникийн захирлаар ажилласан байна\nЭдийн засгийн ухааны доктор, \nМонгол Улсын гавьяат эдийн засагч."
     },
    {
      name: "Гэндэн Алтан-Оч",
      title: "Албан тушаал: Гүйцэтгэх захирал",
      img: "images/director/z5.png",
      desc: "Товч намтар:\nТехникийн кибернетикийн мэргэжлийн диплом-инженерийн цол\nЭдийн засгийн бизнесийн удирдлага-ын ухааны доктор\nМонголын Шинжлэх ухааны Үндэсний академийн академич\n Шатрын олон улсын шүүгч\nОлон улсын зохион байгуулагч\nОУШХ-ны мастер." 
    },
    {
      name: "Аюуш Батжаргал",
      title: "Албан тушаал: Гүйцэтгэх захирал",
      img: "images/director/z6.png",
      desc: "Товч намтар:\n1982-1987 онд Архангай аймгийн Багшийн сургуульд багш,хичээлийн эрхлэгч\n1987-1991 онд Сурган хүмүүжүүлэх ухааны хүрээлэн, Боловсролын асуудал судлах төвд эрдэм шинжилгээний ажилтан\n1991-2002 онд Боловсролын яаманд мэргэжилтэн, ахлах мэргэжилтэн, хэлтсийн дарга,газрын орлогч дарга\n2002-2008 онд МТҮП-ын Гүйцэтгэх захирал "
    },
    {
      name: "Батсүрэн Амгаланбат",
      title: "Албан тушаал: Гүйцэтгэх захирал",
      img: "images/director/z7.png",
      desc: "Товч намтар:\n2000-2004 онд Дэд бүтцийн яаманд мэргэжилтэн\n2004-2006 онд МТХХГ-т ахлах мэргэжилтэн\n2006-2008 онд БНХАУ-ын Бэйхан их сургуульд магистрын зэрэг хамгаалсан\n2008-2009 онд МТҮП-н захирал\n2011 оноос Япон Улсад Сансарын технологийн чиглэлээр докторантурт суралцаж байна."
    },
    {
      name: "Ёндон Сүхбаатар",
      title: "Албан тушаал: Гүйцэтгэх захирал",
      img: "images/director/z8.png",
      desc: "Товч намтар:\n1988-1993 онд ОХУ-н Санкт-Петербург хотын ХУИС-ийг Эдийн засагч, зохион байгуулагч мэргэжлээр\n1993-1994 онд МҮЭХТЗ-ийн ҮҮХ-т менежер\n1994-2000 онд Цагаан шөнө ХЭАА-н эзэн, Мандахууд ХХК-ийн гүйцэтгэх захирал\n1998-1999 онд ТЗУХИ-ыг Төрийн удирдлагын менежерээр\n2002-2003 онд Удирдлагын академид төрийн удирдлагын магистр\n2000-2009 онд БЗД-ийн ЗДТГ-т хэлтсийн дарга, Тамгын газрын дарга, Засаг даргын орлогч\n2009-2012 онд МТҮП-н гүйцэтгэх захирал" 
    },
    {
      name: "Цэрэндорж Түвшинтөр",
      title: "Албан тушаал: Ерөнхий захирал",
      img: "images/director/z9.png",
      desc: "Товч намтар:\n2003-2006 онд Ц.Түвшинтөр нь Берлиний Техникийн их сургуулийн харьяа, тархалттай хиймэл оюун ухааны лабораторит ахлах програм хангамжийн архитекторч, төслийн удирдагч, эрдэм шинжилгээний ажилтнаар тус тус ажилласан\n2006-2010 онд ХБНГУ-ын Карлсруэ хотын SEMANTIC WEB болон CLOUD COMPUTING –ийн чиглэлээр судалгаа шинжилгээ явуулдаг AIFB, компьютерийн ухааны судалгааны институт FZI зэрэг олон улсын тэргүүлэх судалгааны байгууллагуудад ажиллаж докторын зэрэг хамгаалсан\n2010 оны 1-р сараас 8 сар хүртэл FZI институтэд пост доктороор ажилласан\n2010-2011 онд Мобиком корпорацид Судалгаа, хөгжил хариуцсан захирал\n2011-2012 онд ”Скайтел” ХХК компанид Мэдээллийн технологийн газрын захирал\n2010 оноос Монгол улсын их сургуульд дэд профессор\n2012-2014 онд МТҮП-ын Ерөнхий захирлаар ажиллаж энэ хугацаанд “Монгол толгой– Силикон Хаус” төслийг зохиож, удирдсан "
    },
    {
      name: "Бавуужавын Мягмарнаран",
      title: "Захирал.",
      img: "images/director/z10.png",
      desc: "Товч намтар:\n1983 онд Улаанбаатар хотод төрсөн\n1990-2000 онд 10 жилийн дунд сургууль\n2000-2004 онд МУИС-ийн харъяа Мэдээллийн Технологийн сургуулийг Электроникийн инженер мэргэжлээр төгссөн\n2010-2012 онд Австрали Улсын Сидней хотын University of New South Wales их сургуульд Innovation management чиглэлээр мастерийн зэрэг хамгаалсан\n2004-2006 онд Эм Си Эс Электроникс ХХК-нд инженер\n2007-2010 онд Харилцаа холбооны зохицуулах хорооны Зохицуулалтын албанд Мэдээллийн технологийн зохицуулалт хариуцсан мэргэжилтэн\n2012-2014 оны 5-р сар хүртэл Мэдээллийн технологи, шуудан, харилцаа холбооны газарт Шинэчлэлийн бодлого, төлөвлөлтийн газрын дарга\n2014-оны 5-р сараас МТУП-ын Еренхий захирал "
    },
    {
      name: "Б.Буян-өлзий",
      title: "",
      img: "images/director/z11.png",
      desc: ""
    },
    {
      name: "Ц.Содномдамба",
      title: "",
      img: "images/director/z12.png",
      desc: "" 
    },
    {
      name: "Э.Цогтгэрэл",
      title: "",
      img: "images/director/z13.png",
      desc: "" 
    }
  ];

  const cards = document.querySelectorAll(".profile-card");
  cards.forEach((card, i) => {
    card.addEventListener("click", () => {
      const data = profiles[i];
      document.getElementById("profileModalLabel").textContent = data.name;
      document.getElementById("profilePhoto").src = data.img;
      document.getElementById("profileTitle").textContent = data.title;
      document.getElementById("profileDesc").innerHTML = data.desc.replace(/\n/g, "<br>");


      const modal = new bootstrap.Modal(document.getElementById("profileModal"));
      modal.show();
    });
  });

  // Popup гадна дархад хаах
  const modalEl = document.getElementById("profileModal");
  if (modalEl) {
    document.addEventListener("click", e => {
      const backdrop = document.querySelector(".modal-backdrop");
      if (backdrop && e.target === backdrop) {
        const instance = bootstrap.Modal.getInstance(modalEl);
        instance?.hide();
      }
    });

    modalEl.addEventListener("shown.bs.modal", () => {
      const backdrop = document.querySelector(".modal-backdrop");
      if (backdrop) backdrop.style.cursor = "pointer";
    });
  }
}); // ✅ нэг л DOMContentLoaded хаалт
// FOLLOW SVG CURVE
window.addEventListener("load", () => {
    const path = document.getElementById("roadmap-path");
    const items = document.querySelectorAll(".rm-item");

    // Хэрвээ path байхгүй бол энэ animation-г алгасаад буцаана
    if (!path) return;

    const length = path.getTotalLength();

    items.forEach(item => {
        const pos = parseFloat(item.dataset.pos);  // percent position
        const point = path.getPointAtLength((pos / 100) * length);

        item.style.left = point.x + "px";
        item.style.top = (point.y + 30) + "px";
    });
});

const items = document.querySelectorAll(".rm-item");

items.forEach(item => {
    // Create info popup
    const infoBox = document.createElement("div");
    infoBox.classList.add("info-box");
    infoBox.innerText = item.dataset.info;
    item.appendChild(infoBox);

    // Click event
    item.addEventListener("click", () => {
        // Close all others
        items.forEach(i => i.classList.remove("active"));

        // Open this one
        item.classList.add("active");
    });
});

