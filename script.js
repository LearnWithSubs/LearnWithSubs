
function setPageLang(lang) {
    document.querySelectorAll('.line').forEach(line => {
        const jp = line.querySelector('.jp');
        const cn = line.querySelector('.cn');
        const en = line.querySelector('.en');

        jp.classList.add('hidden');
        cn.classList.add('hidden');
        en.classList.add('hidden');

        if (lang === 'jp') jp.classList.remove('hidden');
        if (lang === 'cn') cn.classList.remove('hidden');
        if (lang === 'en') en.classList.remove('hidden');
    });
}
