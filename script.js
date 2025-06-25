
function setPageLang(lang) {
    currentLang = lang;
    document.querySelectorAll('.line').forEach(line => {
        const jp = line.querySelector('.jp');
        const cn = line.querySelector('.cn');
        const en = line.querySelector('.en');
        line.removeAttribute('data-lang-toggle');
        jp.classList.add('hidden');
        cn.classList.add('hidden');
        en.classList.add('hidden');

        if (lang === 'jp') jp.classList.remove('hidden');
        if (lang === 'cn') cn.classList.remove('hidden');
        if (lang === 'en') en.classList.remove('hidden');
    });
}
document.addEventListener('DOMContentLoaded', () => {
    // 每行字幕点击逻辑
    document.querySelectorAll('.line .text').forEach(textBlock => {
        textBlock.addEventListener('click', () => {
            if (currentLang === 'jp') return; // 日语状态不响应点击

            const line = textBlock.closest('.line');
            const toggled = line.getAttribute('data-lang-toggle') === 'true';

            const jp = textBlock.querySelector('.jp');
            const cn = textBlock.querySelector('.cn');
            const en = textBlock.querySelector('.en');

            // 清除全部
            jp.classList.add('hidden');
            cn.classList.add('hidden');
            en.classList.add('hidden');

            if (toggled) {
                // 切回当前语言
                line.setAttribute('data-lang-toggle', 'false');
                if (currentLang === 'cn') cn.classList.remove('hidden');
                else if (currentLang === 'en') en.classList.remove('hidden');
            } else {
                // 切成日语
                line.setAttribute('data-lang-toggle', 'true');
                jp.classList.remove('hidden');
            }
        });
    });
});