// 로고 클릭 시 home.html로 애니메이션 후 페이지 이동
document.getElementById("logo").addEventListener("click", function() {
    // 현재 페이지의 색상 정보를 읽어옴
    const pageColor = document.body.getAttribute('data-color') || '#FFFFFF';
    localStorage.setItem('previousPageColor', pageColor);
    // 새로운 div 요소를 생성하여 페이지 전환 애니메이션에 사용
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '50%';
    overlay.style.left = '50%';
    overlay.style.width = '0px'; // 매우 작은 초기 크기 설정
    overlay.style.height = '0px'; // 매우 작은 초기 크기 설정
    overlay.style.backgroundColor = pageColor; // 현재 페이지의 색상 사용
    overlay.style.borderRadius = '50%';
    overlay.style.transform = 'translate(-50%, -50%)';
    overlay.style.zIndex = '1000';
    document.body.appendChild(overlay);

    // GSAP Timeline을 사용하여 전환 애니메이션 실행
    gsap.timeline()
        .to(overlay, {
            duration: 1.2,
            width: '200vw',
            height: '200vw',
            ease: "power4.inOut",
            onComplete: function() {
                // 애니메이션 완료 후 페이지 이동
                window.location.href = "home.html";
            }
        });
});

window.addEventListener('load', function() {
    // 현재 페이지의 색상 정보를 읽어옴
    const pageColor = document.body.getAttribute('data-color') || '#FFC0CB';

    // 새로운 div 요소를 생성하여 원형 애니메이션을 적용
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '50%';
    overlay.style.left = '50%';
    overlay.style.width = '200vw'; // 페이지 전체를 덮는 초기 크기 설정
    overlay.style.height = '200vw'; // 페이지 전체를 덮는 초기 크기 설정
    overlay.style.backgroundColor = pageColor; // 이전 페이지와 일관된 색상 사용
    overlay.style.borderRadius = '50%';
    overlay.style.transform = 'translate(-50%, -50%)';
    overlay.style.zIndex = '1000';
    document.body.appendChild(overlay);

    // GSAP을 사용하여 축소 애니메이션 적용
    gsap.timeline()
        .to(overlay, {
            duration: 1.2,
            width: '0px',  // 매우 작은 크기로 줄어듦
            height: '0px',
            ease: "power4.inOut",
            onComplete: function() {
                // 애니메이션 완료 후에 overlay 요소 제거
                document.body.removeChild(overlay);
            }
        });
});










