// ==UserScript==
// @name         Google bot
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.google.ru/*
// @match        https://xn----7sbab5aqcbiddtdj1e1g.xn--p1ai/*
// @grant        none
// ==/UserScript==

function getRandom(min,max){
    return Math.floor(Math.random()*(max-min)+min);
}

let keywords = ["Гобой","Саксофон","Валторна","Фагот","Флейта","Как звучит флейта","Скрипка"];
let keyword = keywords[getRandom(0, keywords.length)];
let googleInput = document.getElementsByName("q")[0];
let btnK = document.getElementsByName("btnK")[0];
let links = document.links;
if (btnK != undefined){
    let i = 0;
    let timerId = setInterval(()=>{
        googleInput.value += keyword[i++];
        if(i == keyword.length){
            clearInterval(timerId);
            btnK.click();
        }
    },500);
}else if(location.hostname == "www.google.ru"){
    let flag = true;
    let numPage = document.getElementsByClassName("YyVfkd")[0].innerText;
    for(let i=0; i<links.length; i++){
        let link = links[i];
        if(link.href.indexOf("xn----7sbab5aqcbiddtdj1e1g.xn--p1ai") != -1){
            flag = false;
            link.removeAttribute('target');
            setTimeout(()=>link.click(), 2000);
            break;
        }
    }
    if (numPage == "10") location.href = "https://www.google.ru/";
    if(flag) setTimeout(()=>pnnext.click(),2000);
}else{
    if(getRandom(0,100)>=80) location.href = "https://www.google.ru/";
    else
        setInterval(()=>{
            let link = links[getRandom(0,links.length)];
            if(link.href.indexOf(location.hostname) != -1)
                link.click();
        },5000);
}
