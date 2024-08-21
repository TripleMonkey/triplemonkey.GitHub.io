/*
    TripleMonkey Studio 
    Javascript for html
*/

let CURRENT_PAGE = "home.html"
let htmlMain = document.getElementsByTagName("link")[0].import;

// window.onload = function () {
//     document.getElementById('html-main').innerHTML = htmlMain
// };

// window.addEventListener("load", function () {
//     document.getElementsByTagName("body")
//         .replaceChild(CURRENT_PAGE.getElementsByTagName("main")[0],
//             document.getElementsByTagName("main")[0]);
// }, false);

function updateMain(page = String) {
    CURRENT_PAGE = page;
    document.getElementsByTagName("body")
        .replaceChild(CURRENT_PAGE.getElementsByTagName("main")[0],
            document.getElementsByTagName("main")[0]);
}
