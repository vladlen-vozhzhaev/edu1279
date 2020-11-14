// ==UserScript==
// @name         Google bot
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.google.ru/*
// @match        https://xn----7sbab5aqcbiddtdj1e1g.xn--p1ai/*
// @match        https://crushdrummers.ru/*
// @grant        none
// ==/UserScript==

function getRandom(min,max){
    return Math.floor(Math.random()*(max-min)+min);
}

function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

let sites = {
    "xn----7sbab5aqcbiddtdj1e1g.xn--p1ai":["Гобой","Саксофон","Валторна","Фагот","Флейта","Как звучит флейта","Скрипка"],
    "crushdrummers.ru":["Барабанное шоу","Шоу барабанщиков в Москве","Заказать барабанщиков в Москве"]
}
let site = Object.keys(sites)[getRandom(0,Object.keys(sites).length)];
let keywords = sites[site];
let keyword = keywords[getRandom(0, keywords.length)];
let googleInput = document.getElementsByName("q")[0];
let btnK = document.getElementsByName("btnK")[0];
let links = document.links;
if (btnK != undefined){ // Находимся на главной странице поисковика
    let i = 0;
    document.cookie = "site="+site;
    let timerId = setInterval(()=>{
        googleInput.value += keyword[i++];
        if(i == keyword.length){
            clearInterval(timerId);
            btnK.click();
        }
    },500);
}else if(location.hostname == "www.google.ru"){ // Страница поисковой выдачи
    let flag = true;
    let numPage = document.getElementsByClassName("YyVfkd")[0].innerText;
    site = getCookie("site");
    for(let i=0; i<links.length; i++){
        let link = links[i];
        if(link.href.indexOf(site) != -1){
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
