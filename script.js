/* main.js — bug-fix 2025-06-26 */

let selectedLang   = 'jp';   // 当前选中的按钮  jp / cn / en
let globalConverted = true;  // 页面是否已整体转换到 selectedLang
let lastNonJpLang  = null;   // 最近一次点击的非日语按钮
const TOAST_DURATION = 2000; // 2 秒

/* —— 工具：让某行只显示指定语言 —— */
function setLineLang(line, lang) {
    const jp = line.querySelector('.jp');
    const cn = line.querySelector('.cn');
    const en = line.querySelector('.en');

    jp.classList.add('hidden');
    cn.classList.add('hidden');
    en.classList.add('hidden');

    if (lang === 'jp')      jp.classList.remove('hidden');
    else if (lang === 'cn') cn.classList.remove('hidden');
    else if (lang === 'en') en.classList.remove('hidden');

    line.dataset.langState = lang; // 记录行状态
}

/* —— 整页切换 —— */
function convertAllLines(lang) {
    document.querySelectorAll('.line').forEach(line => setLineLang(line, lang));
    globalConverted = true;
}

/* —— Toast —— */
function showToast() {
    const toast = document.getElementById('toast');
    toast.textContent = '下の内容をクリックすると個別に切り替えられます。もう一度ボタンを押すと全体を切り替えられます。';
    toast.classList.remove('hidden');
    setTimeout(() => toast.classList.add('hidden'), TOAST_DURATION);
}

/* —— 顶部语言按钮点击 —— */
function setPageLang(lang) {

    /* ① 点击「日本語」按钮：永远整页日语 */
    if (lang === 'jp') {
        selectedLang = 'jp';
        convertAllLines('jp');
        return;
    }

    /* ② 之前在日语按钮状态（selectedLang==='jp'） */
    if (selectedLang === 'jp') {
        selectedLang    = lang;       // 记录当前目标
        lastNonJpLang   = lang;
        globalConverted = false;      // 尚未整页切换
        showToast();                  // 只弹一次提示
        return;
    }

    /* ③ 再次点同一个非日语按钮 */
    if (selectedLang === lang) {
        if (!globalConverted) convertAllLines(lang); // 第二次点击才整页转换
        return;
    }

    /* ④ 从一种非日语切到另一种非日语 —— 立即整页切换 */
    selectedLang  = lang;
    lastNonJpLang = lang;
    convertAllLines(lang);
}

/* —— 单行点击：jp ↔ 当前目标语言 —— */
function initLineClick() {
    document.querySelectorAll('.line .text').forEach(textBlock => {
        textBlock.addEventListener('click', () => {
            const line    = textBlock.closest('.line');
            const current = line.dataset.langState || 'jp';

            /* 当前行是日语 → 切到目标语言 */
            if (current === 'jp') {
                const target = (selectedLang === 'jp') ? lastNonJpLang : selectedLang;
                if (target) setLineLang(line, target);
            } else {
                /* 当前行是非日语 → 切回日语 */
                setLineLang(line, 'jp');
            }
        });
    });
}

/* —— 初始绑定 —— */
document.addEventListener('DOMContentLoaded', initLineClick);
