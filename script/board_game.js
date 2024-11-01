// 팀 정보 (조 이름 및 색상)
const teamInfo = [
    { name: "조 이름 1", color: "#FFC0CB" }, // 핑크
    { name: "조 이름 2", color: "#93BBFF" }, // 블루
    { name: "조 이름 3", color: "#96FF9F" }, // 그린
    { name: "조 이름 4", color: "#FFD186" }, // 옐로우
    { name: "조 이름 5", color: "#FF8686" }  // 레드
];

// HTML 요소 생성 및 추가
function displayTeams() {
    const board = document.querySelector('.Desktop9');
    teamInfo.forEach((team, index) => {
        const pawn = document.createElement('div');
        pawn.classList.add('pawn');
        pawn.style.backgroundColor = team.color;
        pawn.textContent = team.name;
        pawn.style.left = `${480 + index * 100}px`;
        pawn.style.top = '465px';
        board.appendChild(pawn);

        pawn.addEventListener('mousedown', onDragStart);
    });
}

// 오프셋 값을 저장할 변수
let currentPawn = null;
let offsetX = 0;
let offsetY = 0;

function onDragStart(event) {
    currentPawn = event.target;
    const rect = currentPawn.getBoundingClientRect();
    offsetX = event.clientX - rect.left;
    offsetY = event.clientY - rect.top;

    document.addEventListener('mousemove', onDrag);
    document.addEventListener('mouseup', onDragEnd);
}

function onDrag(event) {
    if (!currentPawn) return;
    const boardRect = document.querySelector('.Desktop9').getBoundingClientRect();
    const newX = event.clientX - boardRect.left - offsetX;
    const newY = event.clientY - boardRect.top - offsetY;

    currentPawn.style.left = `${newX}px`;
    currentPawn.style.top = `${newY}px`;
}

function onDragEnd() {
    currentPawn = null;
    document.removeEventListener('mousemove', onDrag);
    document.removeEventListener('mouseup', onDragEnd);
}

// GSAP 가져오기
const { gsap } = window;

// 페이드 인 애니메이션
function fadeIn(element) {
    gsap.to(element, { opacity: 1, display: 'block', duration: 0.5 });
}

// 페이드 아웃 애니메이션
function fadeOut(element) {
    gsap.to(element, { opacity: 0, display: 'none', duration: 0.5 });
}

// 박스와 코너 요소에 이벤트 리스너 추가
const elementsMapping = [
    { boxClass: '.Box1', gameId: '1' },
    { boxClass: '.Box2', gameId: '2' },
    { boxClass: '.Box3', gameId: '3' },
    { boxClass: '.Box4', gameId: '4' },
    { boxClass: '.Corner1', gameId: '5' },
    { boxClass: '.Box5', gameId: '6' },
    { boxClass: '.Box6', gameId: '7' },
    { boxClass: '.Box7', gameId: '8' },
    { boxClass: '.Corner2', gameId: '9' },
    { boxClass: '.Box8', gameId: '10' },
    { boxClass: '.Box9', gameId: '11' },
    { boxClass: '.Box10', gameId: '12' },
    { boxClass: '.Box11', gameId: '13' },
    { boxClass: '.Corner3', gameId: '14' },
    { boxClass: '.Box12', gameId: '15' },
    { boxClass: '.Box13', gameId: '16' },
    { boxClass: '.Box14', gameId: '17' }
];

elementsMapping.forEach(mapping => {
    const boxElement = document.querySelector(mapping.boxClass);
    const gameElement = document.getElementById(mapping.gameId);

    if (boxElement && gameElement) {
        boxElement.addEventListener('mousedown', () => {
            fadeIn(gameElement);
        });
        boxElement.addEventListener('mouseup', () => {
            fadeOut(gameElement);
        });
        boxElement.addEventListener('mouseleave', () => {
            fadeOut(gameElement);
        });
    }
});

// key 요소들에 대해 이벤트 리스너 추가
const keyElements = document.querySelectorAll('.Key1, .Key2, .Key3, .Key4');
const goldenElements = ['g1', 'g2', 'g3', 'g4'].map(id => document.getElementById(id));

keyElements.forEach(keyElement => {
    keyElement.addEventListener('mousedown', () => {
        goldenElements.forEach(golden => {
            fadeOut(golden);
        });

        const randomIndex = Math.floor(Math.random() * goldenElements.length);
        const randomGolden = goldenElements[randomIndex];

        fadeIn(randomGolden);

        keyElement.addEventListener('mouseup', () => {
            fadeOut(randomGolden);
        });
        keyElement.addEventListener('mouseleave', () => {
            fadeOut(randomGolden);
        });
    });
});

// 페이지 로드 시 실행
window.onload = displayTeams;
