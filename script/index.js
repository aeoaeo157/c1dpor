// index.js


// index.js

const header = document.querySelector('header');
const topBtn = document.querySelector('.top-btn'); // top 버튼 선택

window.addEventListener('scroll', () => {
    // 1. 헤더 배경 변경 (기존 코드)
    if (window.scrollY > 50) {
        header.classList.add('on');
    } else {
        header.classList.remove('on');
    }

    // 2. TOP 버튼 표시/숨김 (추가 코드)
    if (window.scrollY > 300) { // 300px 이상 스크롤 시 등장
        topBtn.classList.add('show');
    } else {
        topBtn.classList.remove('show');
    }
});

// TOP 버튼 클릭 시 부드럽게 위로 (이미 CSS에 scroll-behavior: smooth가 있어서 a태그로 작동하지만 확인용)
topBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});



window.addEventListener('scroll', () => {
    const pTags = document.querySelectorAll('.slogun p');
    const section = document.querySelector('.slogun');
    
    if (!section) return;

    const sectionTop = section.offsetTop;
    const viewportHeight = window.innerHeight;
    const scrollY = window.scrollY;

    // 핵심 수정: 글자가 화면 중앙(viewportHeight / 2)에 왔을 때 진행률이 1이 되도록 계산
    // 0.3을 곱해주는 이유는 색이 변하는 속도를 더 민감하게 만들기 위함입니다.
    let targetFraction = (scrollY - sectionTop + (viewportHeight / 0.83)) / (viewportHeight / 0.5);
    
    pTags.forEach((p, index) => {
        // 줄바꿈 시간차(delay)를 고려한 개별 진행률
        let delay = index * 0.1; 
        let individualFraction = (targetFraction - delay) * 2; 
        
        individualFraction = Math.max(0, Math.min(1, individualFraction));
        
        // 100%에서 0%로 갈수록 색이 왼쪽에서 오른쪽으로 채워짐
        const pos = 100 - (individualFraction * 100);
        p.style.backgroundPosition = `${pos}% 0`;
    });
});





const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('expandedImg');
const closeBtn = document.querySelector('.close-btn');
const openModalBtns = document.querySelectorAll('.open-modal');

// 모든 모달 오픈 버튼에 이벤트 연결
openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault(); // 페이지 이동 방지
        modal.style.display = "block";
        modalImg.src = btn.getAttribute('href'); // a태그의 경로를 모달 이미지로
        document.body.style.overflow = 'hidden'; // 스크롤 방지
    });
});

// 닫기 버튼 클릭 시
closeBtn.addEventListener('click', () => {
    modal.style.display = "none";
    document.body.style.overflow = 'auto';
});

// 배경 클릭 시 닫기
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
        document.body.style.overflow = 'auto';
    }
});



// index.js의 openModalBtns 반복문 부분 수정
openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        modal.style.display = "block";
        modalImg.src = btn.getAttribute('href');
        document.body.style.overflow = 'hidden';

        // 추가: 클릭한 버튼이 가이드 버튼(?)이면 클래스 추가, 아니면 제거
        if (btn.id === 'guide-btn') {
            modal.classList.add('guide-mode');
        } else {
            modal.classList.remove('guide-mode');
        }
    });
});