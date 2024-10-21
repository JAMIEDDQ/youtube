// Smooth scroll for menu links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
        // 모바일 메뉴에서 클릭 시 메뉴 닫기
        if (window.innerWidth <= 768) {
            mainMenu.classList.remove('open');
        }
    });
});

// 모바일 메뉴 토글
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const mainMenu = document.querySelector('.main-menu');

mobileMenuToggle.addEventListener('click', () => {
    mainMenu.classList.toggle('open');
});

// 슬라이더 기능
let slideIndex = 0;

function showSlides() {
    const slides = document.querySelectorAll(".slider img");
    const slidesToShow = getSlidesToShow();
    const totalSlides = slides.length - slidesToShow;
    moveSlides(slidesToShow);
}

// 한 번에 보여줄 슬라이드 개수 계산 (모바일은 1개, 데스크탑은 여러 개)
function getSlidesToShow() {
    const screenWidth = window.innerWidth;
    if (screenWidth <= 768) {
        return 1;  // 모바일에서는 1개의 슬라이드만 보이도록 설정
    } else {
        return 5;  // 데스크탑에서는 5개의 슬라이드를 보여줌
    }
}

// 슬라이드를 이동시키는 함수
function moveSlides(slidesToShow) {
    const slider = document.querySelector(".slider");
    const slides = document.querySelectorAll(".slider img");
    const slideWidth = slides[0].clientWidth + 10; // 이미지 간 여백 포함 너비 계산
    const maxSlideIndex = slides.length - slidesToShow; // 마지막 슬라이드 인덱스 계산

    // 슬라이드가 마지막을 넘어서면 더 이상 이동하지 않도록 설정
    if (slideIndex > maxSlideIndex) {
        slideIndex = maxSlideIndex;
    }

    // 슬라이드를 왼쪽으로 이동시키는 계산 (translateX)
    slider.style.transform = `translateX(-${slideIndex * slideWidth}px)`;
}

// 자동으로 슬라이드를 이동
let slideInterval = setInterval(() => {
    const slides = document.querySelectorAll(".slider img");
    const slidesToShow = getSlidesToShow();
    const totalSlides = slides.length - slidesToShow;

    slideIndex = (slideIndex + 1) % (totalSlides + 1); // 마지막 슬라이드까지 이동 후 다시 처음으로
    moveSlides(slidesToShow);
}, 3000);

// 이전 및 다음 버튼 이벤트
document.querySelector('.prev').addEventListener('click', () => {
    const slidesToShow = getSlidesToShow();
    slideIndex = Math.max(0, slideIndex - 1); // 첫 번째 슬라이드에서는 더 이상 이동하지 않도록
    moveSlides(slidesToShow);
});

document.querySelector('.next').addEventListener('click', () => {
    const slides = document.querySelectorAll(".slider img");
    const slidesToShow = getSlidesToShow();
    const totalSlides = slides.length - slidesToShow;

    slideIndex = Math.min(totalSlides, slideIndex + 1); // 마지막 슬라이드를 넘지 않도록
    moveSlides(slidesToShow);
});

// 화면 크기 변경 시 슬라이드 업데이트
window.addEventListener('resize', () => {
    const slidesToShow = getSlidesToShow();
    moveSlides(slidesToShow);
});
