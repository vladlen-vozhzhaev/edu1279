// ==UserScript==
// @name         Google bot
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.google.ru/*
// @grant        none
// ==/UserScript==

document.getElementsByName("q")[0].value = "Гобой";
let btnK = document.getElementsByName("btnK")[0];
if (btnK != undefined){
   btnK.click();
}else{
    let links = document.links;
    for(let i=0; i<links.length; i++){
        let link = links[i];
        if(link.href.indexOf("xn----7sbab5aqcbiddtdj1e1g.xn--p1ai") != -1){
            link.removeAttribute('target');
            link.click();
            break;
        }
    }
}
