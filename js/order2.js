



let orderId = 0; 
let extraInfoBlock = document.getElementById("extraInfoBlock");
let networkBlock = document.getElementById("networkBlock");

$( document ).ready(function() {
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
      });
      
    orderId = params.id; 
    loadOrderInfo();
});

function loadOrderInfo(){
    ///load with jquery ajax
    $.ajax({
        url: apiUrl + "Site/LoadOrder?viewId=" + orderId,
        type: 'get',
    }).done(function (result) {
        if (result.success) {
            setPageData(result.result);
        }
        else {
            if(alert(result.errorMessage)) window.href = "../";
        }
    });
}

function setPageData(order){

    setInnerByClass("fromName", order.from.name);
    setInnerByClass("fromSign", order.from.sign);
    setInnerByClass("fromNetwork", order.from.network);
    setInnerByClass("fromMin", order.from.min);
    setValueByClass("fromAmountInput", order.amount);
    setInnerByClass("fromAmount", order.amount);
    setSrcByClass("fromIcon", getCurIconUrl(order.from.id, 200, 200));

    setInnerByClass("toName", order.to.name);
    setInnerByClass("toSign", order.to.sign);
    setInnerByClass("toNetwork", order.to.network);
    setInnerByClass("toMin", order.to.min);
    setValueByClass("toAmountInput", order.amountResult);
    setInnerByClass("toAmount", order.amountResult);
    setSrcByClass("toIcon", getCurIconUrl(order.to.id));

    setInnerByClass("clientWallet", order.clientWallet);
    setInnerByClass("fromWallet", order.from.wallet);
    setValueByClass("fromWalletInput", order.from.wallet);
    setInnerByClass("orderId", order.viewId);
    setInnerByClass("clientEmail", order.email);

    // if(order.from.extraInfoName !== "" && order.from.extraInfoName !== null){
    //     extraInfoBlock.classList.remove("d-none");
    //     setInnerByClass("extraInfoName", order.from.extraInfoName + ":");
    //     setInnerByClass("extraInfoValue", order.from.extraInfoValue);
    // }
    // else{
    //     extraInfoBlock.classList.add("d-none");
    // }

    // if(order.from.network !== "N/A" && order.from.network !== null){
    //     networkBlock.classList.remove("d-none");
    //     setInnerByClass("fromNetwork", order.from.network);
    // }
    // else{
    //     networkBlock.classList.add("d-none");
    // }


    generateQrCode(order.from.wallet)
    initConnection(order.id);
}


// generate qr-code by value and write in comments link to used library


function generateQrCode(value){
    let qrCode = new QRCode("qrcode", {
        text: value,
        width: 128,
        height: 128,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.Q
    });
}

function copy(objectToCopy){
    /* Get the text field */
    var copyText = document.getElementById(objectToCopy);
    
    const elem = document.createElement('textarea');
      elem.value = copyText.value;
      document.body.appendChild(elem);
      elem.select();
      document.execCommand('copy');
      document.body.removeChild(elem);
       /* Alert the copied text */
    //    document.getElementById(objectToCopy + "_copied").style.display = "block";
       
  }
  function iPaid(){	

	window.location.href = "https://moxeen.com/success.html?&paymentId=" + orderId;
}



function confirm(){
    // document.getElementById("main").style.display = "none";
    document.getElementById("confirm").style.display = "block";
}
function back(){
    // document.getElementById("main").style.display = "block";
    document.getElementById("confirm").style.display = "none";
}