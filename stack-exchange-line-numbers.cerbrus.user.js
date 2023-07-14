// ==UserScript==
// @name         SE add line numbers
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Add line numbers to SE code blocks
// @author       Cebrus
//
// @match        https://*.stackoverflow.com/*
// @match        https://*.serverfault.com/*
// @match        https://*.superuser.com/*
// @match        https://*.askubuntu.com/*
// @match        https://*.mathoverflow.net/*
// @match        https://*.stackapps.com/*
// @match        https://*.stackexchange.com/*
// @match        https://stackoverflowteams.com/*
//
// @exclude      https://stackoverflow.com/admin/dashboard
// @exclude      https://api.stackexchange.com/*
// @exclude      https://data.stackexchange.com/*
// @exclude      https://contests.stackoverflow.com/*
// @exclude      https://winterbash*.stackexchange.com/*
// @exclude      *chat.*
// @exclude      *blog.*
// @exclude      */tour

// @require      https://cdn.jsdelivr.net/gh/CoeJoder/waitForKeyElements.js@v1.2/waitForKeyElements.js
// @updateURL    https://rawgit.com/Cerbrus/userscripts/raw/master/stack-exchange-line-numbers.cerbrus.user.js

// @icon         https://www.google.com/s2/favicons?sz=64&domain=stackoverflow.com
// @grant        none
// ==/UserScript==

/* globals waitForKeyElements */

function addLineNumbers() {
    [...document.querySelectorAll('pre')].forEach(c => {
        if(c.querySelectorAll('.cerbrus-line-numbers').length) return;

        const length = Math.max(1, c.querySelector('code').innerText.split(/\r\n|\r|\n/).length - 1);

        if(length <= 1) return;

        const lineNumbers = document.createElement('div');
        lineNumbers.classList.add('cerbrus-line-numbers');
        lineNumbers.innerText = Array.from({ length }, (_, i)=> i + 1).join('\n');
        c.appendChild(lineNumbers);

        c.style.paddingLeft = `${24 + Math.ceil(Math.log10(length)) * 6}px`;
    });
}

function addGlobalStyle(css) {
    const head = document.getElementsByTagName('head')[0];
    if (!head) return;

    const style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

waitForKeyElements('pre', addLineNumbers, false);
addGlobalStyle(`
pre {
    position: relative;
}
.cerbrus-line-numbers {
    display: block;
    position: absolute;
    top:var(--su12);
    left: var(--su12);
    font-family: ui-monospace, "Cascadia Mono", "Segoe UI Mono", "Liberation Mono", Menlo, Monaco, Consolas, monospace;
    font-size: 13px;
    text-align: right;
    opacity: 0.5;
    pointer-events: none;
    user-select: none;
}`);
