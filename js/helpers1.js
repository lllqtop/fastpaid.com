
function setInnerByClass(className, value){
    Array.from(document.getElementsByClassName(className)).forEach(element => {
        element.innerHTML = value;
    });
}

function setValueByClass(className, value){
    Array.from(document.getElementsByClassName(className)).forEach(element => {
        element.value = value;
    });
}

function setSrcByClass(className, value){
    Array.from(document.getElementsByClassName(className)).forEach(element => {
        element.src = value;
    });
}

function getCurIconUrl(id, w = 40, h = 40 ){
    return apiUrl + `CryptoCurrenciesData/LoadCryptoIcon?id=${id}&w=${w}&h=${h}`;
}

function changeCommaToDot(element){
    return;
    element.value = element.value.replace(",", ".");
}