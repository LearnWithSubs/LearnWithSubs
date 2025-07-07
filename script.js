/* =============================== main.js =============================== */
/* 语言切换脚本（2025-07-07）                                             */
/* ---------------------------------------------------------------------- */

/* ----------- 全局状态（挂到 window，便于 inline onclick 调用） ----------- */
window.selectedLang    = 'jp';   // 顶部按钮当前语言：'jp' / 'cn' / 'en'
window.globalConverted = true;   // 是否已经整页切换过
window.lastNonJpLang   = null;   // 最近一次点击的非日语按钮
const TOAST_DURATION   = 2000;   // Toast 显示 2 秒

/* ---------------- 工具：让某一句（.text）只显示指定语言 ---------------- */
function setTextLang(textEl, lang) {
    textEl.querySelectorAll('.jp, .cn, .en').forEach(span => {
        span.classList.toggle('hidden', !span.classList.contains(lang));
    });
    /* 记录当前句子的语言状态，供点击时判断 */
    textEl.dataset.langState = lang;
}

/* ------------------------ 整页切换到指定语言 --------------------------- */
function convertAllTexts(lang) {
    document.querySelectorAll('.text').forEach(t => setTextLang(t, lang));
    window.globalConverted = true;
}

/* ------------------------------- Toast -------------------------------- */
function showToast() {
    const toast = document.getElementById('toast');
    if (!toast) return;

    toast.textContent =
        '下の内容をクリックすると個別に切り替えられます。もう一度ボタンを押すと全体を切り替えられます。';
    toast.classList.remove('hidden');
    setTimeout(() => toast.classList.add('hidden'), TOAST_DURATION);
}

/* ------------------------ 顶部语言按钮点击 ----------------------------- */
/* 由于按钮写了 inline onclick="setPageLang('cn')"，必须显式挂到 window   */
window.setPageLang = function (lang) {
    /* ① 点击“日本語”按钮 —— 立即整页日语 */
    if (lang === 'jp') {
        window.selectedLang = 'jp';
        convertAllTexts('jp');
        return;
    }

    /* ② 之前在日语模式下第一次点非日语按钮 —— 只提示，不全局切换 */
    if (window.selectedLang === 'jp') {
        window.selectedLang  = lang;
        window.lastNonJpLang = lang;
        window.globalConverted = false;
        showToast();
        return;
    }

    /* ③ 再次点同一个非日语按钮 —— 第二下才整页切换 */
    if (window.selectedLang === lang) {
        if (!window.globalConverted) convertAllTexts(lang);
        return;
    }

    /* ④ 在两种非日语按钮之间切换 —— 直接整页切换 */
    window.selectedLang  = lang;
    window.lastNonJpLang = lang;
    convertAllTexts(lang);
};

/* --------------------- 事件委托：点击某一句字幕 ------------------------ */
document.addEventListener('click', e => {
    const textEl = e.target.closest('.text');
    if (!textEl) return;                       // 没点在句子块上

    const current = textEl.dataset.langState || 'jp';

    /* 当前句子是日语 → 切到目标语言 */
    if (current === 'jp') {
        const target = (window.selectedLang === 'jp')
            ? window.lastNonJpLang
            : window.selectedLang;
        if (target) setTextLang(textEl, target);
    } else {
        /* 当前句子是非日语 → 切回日语 */
        setTextLang(textEl, 'jp');
    }
});

/* ------------------- 初始：页面加载即是全日语 --------------------------- */
/* .cn .en 默认带 .hidden，故无需额外处理；此段代码仅留作占位 */
document.addEventListener('DOMContentLoaded', () => {
    /* 若想页面一进来就高亮“日本語”按钮，可在此处加 active 状态逻辑 */
});
/* ============================ end of main.js =========================== */
