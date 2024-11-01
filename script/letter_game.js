// 각 주제별 문제 수를 설정 (예시로 각 주제에 7개의 문제가 있다고 가정)
const problemCounts = [31, 25, 30, 38, 29, 33]; // 수

const imageFolder = '../src/letter/';
let currentTopic = 0;
let currentProblems = [];

// 초기화: 0_0.png 게임 시작 화면 불러오기
const rectangle1 = document.querySelector('.Rectangle2');
rectangle1.style.backgroundImage = `url(${imageFolder}0_0.png)`;

// 숫자 버튼 클릭 이벤트
document.querySelectorAll('.button').forEach((button) => {
    // highlight 버튼이 아닌 경우에만 실행
    if (!button.classList.contains('highlight')) {
        button.addEventListener('click', () => {
            const index = parseInt(button.id, 10);
            if (isNaN(index)) {
                console.error(`Invalid button id: ${button.id}`);
                return;
            }

            if (index === 0) {
                // 0 버튼: 게임 시작 화면으로 돌아가기
                rectangle1.style.backgroundImage = `url(${imageFolder}0_0.png)`;
                currentTopic = 0;
                currentProblems = [];
            } else {
                // 1~6 버튼: 주제 이미지 불러오기
                rectangle1.style.backgroundImage = `url(${imageFolder}0_${index}.png)`;
                currentTopic = index;

                // 문제 파일 이름 목록을 생성 (형식 수정)
                const problemCount = problemCounts[currentTopic - 1];
                currentProblems = Array.from(
                    { length: problemCount },
                    (_, i) => `${currentTopic}_${i}.png` // 파일 이름 형식 수정
                );
            }
        });
    }
});

// 동그라미 버튼 클릭 이벤트
document.querySelector('.highlight').addEventListener('click', () => {
    if (currentProblems.length > 0) {
        // 초성 문제 중 하나를 랜덤하게 선택
        const randomIndex = Math.floor(Math.random() * currentProblems.length);
        const problemImage = currentProblems[randomIndex]; // 문제 파일 이름 가져오기
        rectangle1.style.backgroundImage = `url(${imageFolder}${problemImage})`;

        // 문제를 제거하여 다시 나오지 않게 하기
        currentProblems.splice(randomIndex, 1);

        // 디버깅용 콘솔 출력 (필요에 따라 확인)
        console.log(`남은 문제 수: ${currentProblems.length}`);
    } else {
        console.error("모든 문제가 다 나왔습니다. 다른 주제를 선택해 주세요.");
    }
});


