document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll for menu links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
            // 모바일 메뉴를 사용하지 않으므로 이 부분을 주석 처리 또는 제거합니다.
            // if (window.innerWidth <= 768 && mainMenu) {
            //     mainMenu.classList.remove('open');
            // }
        });
    });

    // 슬라이더 기능
    let slideIndex = 0;

    function showSlides() {
        const slidesToShow = getSlidesToShow();
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

        // 슬라이드 인덱스 범위 조정 (순환되도록 수정)
        if (slideIndex < 0) {
            slideIndex = maxSlideIndex; // 처음 이전으로 가면 마지막 슬라이드로 이동
        } else if (slideIndex > maxSlideIndex) {
            slideIndex = 0; // 마지막 슬라이드 이후에는 처음으로 돌아감
        }

        // 슬라이드를 왼쪽으로 이동시키는 계산 (translateX)
        slider.style.transform = `translateX(-${slideIndex * slideWidth}px)`;
    }

    // 슬라이더 초기화 함수 호출
    showSlides();

    // 자동으로 슬라이드를 이동
    let slideInterval = setInterval(() => {
        const slidesToShow = getSlidesToShow();
        slideIndex++;
        moveSlides(slidesToShow);
    }, 3000);

    // 이전 및 다음 버튼 이벤트
    document.querySelector('.prev').addEventListener('click', () => {
        // 버튼 클릭 시 자동 슬라이드가 멈추지 않도록 clearInterval을 주석 처리합니다.
        // clearInterval(slideInterval);
        slideIndex--;
        const slidesToShow = getSlidesToShow();
        moveSlides(slidesToShow);
    });

    document.querySelector('.next').addEventListener('click', () => {
        // clearInterval(slideInterval);
        slideIndex++;
        const slidesToShow = getSlidesToShow();
        moveSlides(slidesToShow);
    });

    // 화면 크기 변경 시 슬라이드 업데이트
    window.addEventListener('resize', () => {
        const slidesToShow = getSlidesToShow();
        moveSlides(slidesToShow);
    });
});
