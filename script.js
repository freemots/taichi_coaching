document.addEventListener('DOMContentLoaded', () => {
    // --- 1. スライドショーの設定 ---
    const slides = document.querySelectorAll('.slide');
    const phrases = document.querySelectorAll('.phrase');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentIndex = 0;

    function showSlide(index) {
        // 現在のアクティブ要素を判定して一括でクラスを外す（安全策）
        const activeSlide = document.querySelector('.slide.is-active');
        const activePhrase = document.querySelector('.phrase.is-active');
        if (activeSlide) activeSlide.classList.remove('is-active');
        if (activePhrase) activePhrase.classList.remove('is-active');

        // 次のインデックス計算
        currentIndex = (index + slides.length) % slides.length;

        // 新しい要素にクラスを付ける
        if (slides[currentIndex]) slides[currentIndex].classList.add('is-active');
        if (phrases[currentIndex]) phrases[currentIndex].classList.add('is-active');
    }

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => showSlide(currentIndex - 1));
        nextBtn.addEventListener('click', () => showSlide(currentIndex + 1));
    }

    // --- 2. ナビゲーションの設定 ---
    const nav = document.querySelector('nav');
    if (nav) {
        nav.addEventListener('click', (e) => {
console.log("クリックされました！ターゲット:", e.target);
            const anchor = e.target.closest('a');
            
            // JSのナビゲーション部分をこれだけに差し替えてテスト
if (anchor) {
    const href = anchor.getAttribute('href');
    if (href.startsWith('http')) return;

    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start' // 「要素の先頭」を画面の頭に合わせる命令
        });
    }
}
            // Aタグ以外（隙間）をクリックした場合は最上部へ
            else {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-links a:not(.nav-reserve)');
    const sections = document.querySelectorAll('section[id], #about, #contact');

    // --- スクロール監視の設定 ---
    const options = {
        root: null,
        rootMargin: '-50% 0px -50% 0px', // 画面の中央にセクションが来たら反応させる
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // セクションが画面中央に入ったら、対応するリンクをアクティブにする
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('is-active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('is-active');
                    }
                });
            }
        });
    }, options);

    // 各セクションを監視対象に登録
    sections.forEach(section => observer.observe(section));

    // --- クリック時のスムーズスクロール（既存の微調整） ---
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
});