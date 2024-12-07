// variables

let selectedFromId;
let selectedToId;

let selectedFromInfo;
let selectedToInfo;

let bundleId;

let ip="";

// elements variables

// document.getElementById("continueBtn").addEventListener("click", function () {
//    window.location.href = "../крипта2/index.html";
// });

// Событие - Отправка формы
$('#mainForm').submit(function(){
	var send_value = $('#fromAmountInput').val();
	if (send_value == '') {
		alert('Не указана сумма. Заполните поле.');
		return false;
	}
	// Запомним значение в сессиях браузера
	sessionStorage.setItem('send_value', send_value);
});


let fromSelect = document.getElementById("fromSelect");
let toSelect =  document.getElementById("toSelect");
let fromAmountInput = document.getElementById("fromAmountInput");
let toAmountInput = document.getElementById("toAmountInput");

let fromError = document.getElementById("fromError");
let toError = document.getElementById("toError");

// contact elements variables

let emailInput = document.getElementById("emailInput");
let emailError = document.getElementById("emailError");
let phoneInput = document.getElementById("phoneInput");
let phoneError = document.getElementById("phoneError");
let fioInput = document.getElementById("fioInput");
let fioError = document.getElementById("fioError");

let walletInput = document.getElementById("walletInput");
let walletError = document.getElementById("walletError");

let extraInfoInput = document.getElementById("extraInfoInput");
let extraInfoError = document.getElementById("extraInfoError");
let extraInfoBlock = document.getElementById("extraInfoBlock");

let agreeError = document.getElementById("agreeError");

// var loaderElement = document.getElementsByClassName("loaderBg")[0];


// jquery on document load  
$( document ).ready(function() {
    loadAllCurs();

    getClietIp();
});

// api loadings

function loadAllCurs(){
    ///load with jquery ajax
    $.ajax({
        url: apiUrl + "Site/LoadCurrencies?siteId=" + siteId,
        type: 'get',
    }).done(function (result) {
        if (result.success) {
            setFromCurs(result.result);
            setToCurs(result.result);

            loadBundleInfo();
        }
    });

        
}

function loadBundleInfo(){
    changeCommaToDot(fromAmountInput);

    // loaderElement.style.display="flex";
    $.ajax({
        url: apiUrl + `Site/LoadBundleFull?siteId=${siteId}&fromId=${selectedFromId}&toId=${selectedToId}&amount=${fromAmountInput.value}`,
        type: 'get',
    }).done(function (result) {
        // loaderElement.style.display="none";


        if (result.success) {
            toAmountInput.value = result.result.convertResult;

            selectedFromInfo = result.result.from;
            selectedToInfo = result.result.to;

            bundleId = result.result.bundleId;
            // fromError.innerHTML = "";
            // result.result.errors.forEach(error => {
            //     document.getElementById(error.key).innerHTML = error.value;
            // });

            updateSelectedCurrencies();
        }
        else{
            // loaderElement.style.display="none";
            fireError(fromError, result.errorMessage);
        }
    });

}

function loadCur(id){
    ///load with jquery ajax
    $.ajax({
        url: apiUrl + "Site/LoadCurrency?siteId=" + siteId, id,
        type: 'get',
    }).done(function (result) {
        if (result.success) {
            setFromCurs(result.result);
            setToCurs(result.result);
        }
    });

        
}



// set to views

function setFromCurs(allCurs){
    fromSelect.innerHTML = "";
    allCurs.forEach(cur => {

        if(cur.sign === "BTC"){
            selectedFromId = cur.id;
        }

       
        
        //  var res = `
        // <div class="js_item_left js_item_left_crypt" onclick="onFromSelected('${cur.id}')" data-pay-id="${cur.id}">
        //     <div class="xtt_one_line_left">
        //         <div class="xtt_one_line_abs"></div>
        //         <div class="xtt_one_line_abs2"></div>
        //         <div class="xtt_one_line_ico_left">
        //         <div class="xtt_change_ico currency_logo"
        //             style="background-image: url(${getCurIconUrl(cur.id)});"></div>
        //         </div>
        //         <div class="xtt_one_line_name_left">
        //         <div class="xtt_one_line_name">
        //             ${cur.name} - ${cur.sign}
        //         </div>
        //         </div>
        //         <div class="clear"></div>
        //     </div>
        // </div>`;
        var res = `<div class="pointer" onclick="onFromSelected('${cur.id}')">
                <img class="h-30 me-2" src="${getCurIconUrl(cur.id)}">
                ${cur.name} - ${cur.sign}
            </div>`;
        
        var placeholder = document.createElement("div");
        placeholder.innerHTML = res;


        fromSelect.appendChild(placeholder.firstElementChild);
    });

}



function setToCurs(allCurs){
    toSelect.innerHTML = "";
    allCurs.forEach(cur => {

      
        
        var res = ` 
        <div class="js_exchange_link js_item_right"  onclick="onToSelected('${cur.id}')" data-pay-id="${cur.id}">
            <div class="xtt_one_line_right">
                <div class="xtt_one_line_abs"></div>
                <div class="xtt_one_line_abs2"></div>
                <div class="xtt_one_line_ico_right">
                    <div class="xtt_change_ico currency_logo"
                        style="background-image: url(${getCurIconUrl(cur.id)});">
                    </div>
                </div>
                <div class="xtt_one_line_name_right">
                    <div class="xtt_one_line_name">
                        ${cur.name} - ${cur.sign}
                    </div>
                </div>
                <div class="xtt_one_line_reserv_right">
                    <div class="xtt_one_line_reserv">
                        <span class="js_check_reserve" data-reserve=""
                        data-rate=""></span>
                    </div>
                </div>
                <div class="clear"></div>
            </div>
        </div>`;

        var res = `<div class="pointer" onclick="onToSelected('${cur.id}')">
                        <img class="h-30 me-2" src="${getCurIconUrl(cur.id)}">
                        ${cur.name} - ${cur.sign}
                    </div>`;

        if(cur.sign === "ETH"){
            selectedToId = cur.id;

        }
        var placeholder = document.createElement("div");
        placeholder.innerHTML = res;

        toSelect.appendChild(placeholder.firstElementChild);

    });

}

function updateSelectedCurrencies(){

    setInnerByClass("fromName", selectedFromInfo.name);
    setInnerByClass("fromSign", selectedFromInfo.sign);
    setInnerByClass("fromNetwork", selectedFromInfo.network);
    setInnerByClass("fromMin", selectedFromInfo.min);
    setInnerByClass("fromAmount", fromAmountInput.value);
    // setValueByClass("fromAmount", fromAmountInput.value);
    setSrcByClass("fromIcon", getCurIconUrl(selectedFromId));

    setInnerByClass("toName", selectedToInfo.name);
    setInnerByClass("toSign", selectedToInfo.sign);
    setInnerByClass("toNetwork", selectedToInfo.network);
    setInnerByClass("toMin", selectedToInfo.min);
    setInnerByClass("toAmount", toAmountInput.value);
    // setValueByClass("toAmount", toAmountInput.value);
    setSrcByClass("toIcon", getCurIconUrl(selectedToId));

    walletInput.placeholder = `Ваш адресс ${selectedToInfo.name}`;


    var rateRes = 1 * selectedFromInfo.originRate / selectedToInfo.originRate;
    setInnerByClass("rate", rateRes.toFixed(5));


    if(selectedToInfo.extraInfoName !== "" && selectedToInfo.extraInfoName !== null){
        // extraInfoBlock.style.display = "block";
        extraInfoInput.style.display = "block";
         extraInfoInput.placeholder = `${selectedToInfo.extraInfoName}`;
        // setInnerByClass("extraInfoName", selectedToInfo.extraInfoName);

    }
    else{
        
        // extraInfoBlock.style.display = "none";
        extraInfoInput.style.display = "none";

    }


    validateCurs();
}



// events



function onFromSelected(id){
    selectedFromId = id;

    Array.from(document.getElementsByClassName("js_item_left_crypt")).forEach(li => {
        
       
        if(li.dataset.payId != id){
            li.classList.remove("active");
        }
        else{
            li.classList.add("active");
        }
        
        
    });

    loadBundleInfo();
}
function onToSelected(id){
    selectedToId = id;

    Array.from(document.getElementsByClassName("js_item_right")).forEach(li => {
        
        if(li.dataset.payId != id){
            li.classList.remove("active");
        }
        else{
            li.classList.add("active");
        }
        
    });

    loadBundleInfo();
}



fromAmountInput.addEventListener("input", function(){
    loadBundleInfo();
});

function onSelect(){
    selectedFromId = fromSelect.value;
    selectedToId = toSelect.value;
    loadBundleInfo();
}





function validateAll(){
    var isValid = false;

    isValid = validateCurs();
    isValid = validateContacts();

    return isValid;
}

function validateCurs(){
    var isError = false;

    if(selectedFromId == selectedToId){
        
        fireError(fromError, "Выберите разные валюты");
        isError = true;
    }

    if(fromAmountInput.value < selectedFromInfo.min){
       
        fireError(fromError, "Минимальная сумма: " + selectedFromInfo.min + " " + selectedFromInfo.sign)
        isError = true;
    }

    if(!isError){
        hideError(fromError);
    }

    return !isError;
}

let isAgreeInput = document.getElementById("isAgreeInput");
var isAgreeBox = document.getElementById("isAgreeBox");

function validateContacts(){
    var isError = false;
    hideError(emailError);
    hideError(phoneError);
    hideError(walletError);
    hideError(extraInfoError);
    hideError(fioError);
    
    if(!validateEmail(emailInput.value)){
        fireError(emailError, "Неверный email");
        isError = true;
    }

    if(!validatePhone(phoneInput.value)){
        fireError(phoneError, "Неверный формат телефона")
        isError = true;
    }

    isAgreeBox.style.borderColor = "#00C26F";

    if(!isAgreeInput.checked){
        agreeError.innerHTML = "Необходимо согласие";
        isError = true;
        isAgreeBox.style.borderColor = "#FF0000";
    }


    if(!validateWallet(walletInput.value)){
        fireError(walletError, "Неверный адрес кошелька");
        isError = true;
    }

    if(selectedToInfo.extraInfoName !== "" && selectedToInfo.extraInfoName !== null){
       
        if(extraInfoInput.value.length < 3){
            fireError(extraInfoError, "Неверный " + selectedToInfo.extraInfoName);
            isError = true;
        }
    }

    if(fioInput === null || fioInput.value.length < 3){
        fireError(fioError, "Имя должно быть больше 3 символов");
        isError = true;
    }

    if(!isError){
        hideError(emailError);
        hideError(phoneError);
        hideError(walletError);
        hideError(extraInfoError);
        hideError(fioError);
    }
    

    return !isError;
}


function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function validatePhone(phone) {
    var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    return re.test(phone);
}

function validateWallet(wallet) {
    var re = /^[0-9a-zA-Z]+$/;
    return re.test(wallet);
}



// create order

function createOrder(){
    if(!validateAll()){
        return;
    }

    
    $(".preloader").fadeIn(1000);

    var order = {
        fromId: selectedFromId,
        toId: selectedToId,
        siteId: siteId,
        bundleId: bundleId,
        onWallet: selectedFromInfo.wallet,
        clientWallet: walletInput.value,
        name: fioInput.value,
        email: emailInput.value,
        phone: phoneInput.value,
        amount: fromAmountInput.value,
        clientExtraInfoName: selectedToInfo.extraInfoName,
        clientExtraInfoValue: extraInfoInput.value,
        ip: ip,
        
    }
    $.ajax({
        url: apiUrl + "Site/NewOrder",
        type: 'post', 
        data: JSON.stringify(order),
        headers: 
        { 
            'Accept': 'application/json', 
            'Content-Type': 'application/json',
        }, 
        contentType: "application/json; charset=utf-8", 
        dataType: "json"
    }).done(function (result) {

        $(".preloader").fadeOut(1000);

        if (result.success) {
           window.location.href = "/order/?id=" + result.viewId;
        } else {
            if(result.errors !== null && result.errors.length > 0){
                result.errors.forEach(element => {
                    document.getElementById(element.key).innerHTML = element.value;
                });
            }
            else{
                alert(result.errorMessage);
            }
        }

    });
    
}

// get client's ip address
function getClietIp(){

    $.getJSON("https://ipgeolocation.abstractapi.com/v1/?api_key=cafb952e13d1416cac43e9249f8c1c23", function(data) {
    
        ip = "IP: "+ data.ip_address + " | " + data.country;
    });
}





function fireError(element, value){
    element.style.display = "block";
    element.innerHTML = value;

    // toastr.error(value);
}
function hideError(element){
    element.style.display = "none";
    element.innerHTML = "";

}
