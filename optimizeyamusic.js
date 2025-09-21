// ==UserScript==
// @name         Удалить MP4 видео с Yandex Music
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Удаляет MP4 видео анимации и его контейнер с главной страницы
// @author       ПростоФункция
// @match        https://music.yandex.ru/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Ждем загрузки DOM и мутаций, если видео добавляется динамически
    const observer = new MutationObserver(() => {
        removeVideos();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Функция удаления
    function removeVideos() {
        const videos = document.querySelectorAll('video[src$=".mp4"][autoplay][loop]');

        videos.forEach(video => {
            // Ищем ближайший div с классом, содержащим "VibeAnimation_root"
            const parentDiv = video.closest('div[class*="VibeAnimation_root"]');
            if (parentDiv) {
                parentDiv.remove();
            } else {
                video.remove(); // На всякий, если контейнер не найден
            }
        });
    }

    // Вызываем сразу после загрузки
    window.addEventListener('load', removeVideos);
})();
