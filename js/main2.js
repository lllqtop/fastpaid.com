window.dt = $dataVue({
  currency,
  captcha: [
    randInRange(5,10),
    randInRange(5,10)
  ],
  captchaVal:"",

  choosed: {
    send: "bitcoin",
    receive: "ethereum",
  },
  inp1:"",
  inp2:"",

  formAdrss:"",
  formEmail:"",
  formRefer:"",

  transactions:[]
})




cfg.plusPercent = Number(`1.0${cfg.plusPercent}`)


function randInRange(min, max, fix = 0) {
  return parseFloat((Math.random() * (max - min) + min).toFixed(fix));
}


async function convertCurrency(from, to) {
  const valuta = "rub"

  const json = await (await fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=${from},${to}&vs_currencies=${valuta}`
  )).json();

  return [
    json?.[from.toLowerCase()]?.[valuta] || cfg.plusPercent,
    json?.[  to.toLowerCase()]?.[valuta] || cfg.plusPercent
  ]
}



function captchaInp(event) {
  let inp = event.target
  if (inp.value.length > 3) inp.value = inp.value.slice(0,-1)
}

async function getCryptoPrice() {
  let [from, to] = await convertCurrency(
    currency[dt.choosed.send].short_name,
    currency[dt.choosed.receive].short_name
  )

  currency[dt.choosed.send].value = from
  currency[dt.choosed.receive].value = to

  if (dt.inp1) {
    dt.inp2 = from * dt.inp1 / to
  }
} getCryptoPrice()




function inputCalc(inp, isBlur) {
  const field = inp ? "receive" : "send"
  const sv = currency[dt.choosed.send].value
  const rv = currency[dt.choosed.receive].value
  const max = currency[dt.choosed[field]].max_limit
  const min = currency[dt.choosed[field]].min_limit
  const formatString = `0.${"0".repeat(cfg.aftComma)}`
  const i = `inp${inp + 1}`

  dt[i] = isBlur ? Math.min(Math.max(dt[i], min), max) : (dt[i] > max ? max : dt[i]);

  dt[inp ? "inp1" : "inp2"] = (
    +((!inp) ? (sv * dt[i] / rv) : ( rv * dt[i] / sv)) * cfg.plusPercent
  ).toFixed(cfg.aftComma)

  if (dt[i] == formatString) dt[i] = 0
}


// let min = 1
// let max = 5

// let num = 6





let send    = document.querySelector(".dropdown.send");
let receive = document.querySelector(".dropdown.receive");


function changeClass() {
  this.classList.toggle("active");
}

send.onclick = changeClass;
receive.onclick = changeClass;


function getTokenId(token, type) {
  let prevVal1 = dt.choosed.send;
  let prevVal2 = dt.choosed.receive;

  dt.choosed[type] = token;

  if (dt.choosed.send == dt.choosed.receive) {
    dt.choosed.send = prevVal1;
    dt.choosed.receive = prevVal2;

    showAlert("Select different currencies",{bg:'#e84142'})
  }
  else getCryptoPrice()
}



let mainForm  = document.querySelector("#mainForm")
let sumInput1 = document.querySelector('#sumInputs [name="send_value"]')
let sumInput2 = document.querySelector('#sumInputs [name="receive_value"]')
let inpAdrss  = document.querySelector("#inpAdrss")
let inpEmail  = document.querySelector("#inpEmail")
let captcha   = document.querySelector("#captcha") 


// sumInput1.onclick = function(){this.style.outline = ""}
// sumInput2.onclick = function(){this.style.outline = ""}
// inpAdrss.onclick  = function(){this.style.outline = ""}
// inpEmail.onclick  = function(){this.style.outline = ""}
// captcha.onclick   = function(){this.style.outline = ""} 

function sendMainForm(e) {
  // e.preventDefault()

  // const min_s = currency[dt.choosed.send].min_limit
  // const max_s = currency[dt.choosed.send].max_limit
  // const min_r = currency[dt.choosed.receive].min_limit
  // const max_r = currency[dt.choosed.receive].max_limit

  // let testEmpty = true

  // console.log(dt.inp2);
  
  // const setErrorOutline = (e) => (e.style.outline = "1px solid red", false)

  // if (!dt.inp1 || !(+(dt.inp1) >= min_s && +(dt.inp1) <= max_s)) testEmpty = setErrorOutline(sumInput1)
  // if (!dt.inp2 || !(+(dt.inp2) >= min_r && +(dt.inp2) <= max_r)) testEmpty = setErrorOutline(sumInput2)
  // if (!dt.formAdrss) testEmpty = setErrorOutline(inpAdrss)
  // if (!dt.formEmail) testEmpty = setErrorOutline(inpEmail)
  // if (!(dt.captchaVal && ((dt.captcha[0] + dt.captcha[1]) == dt.captchaVal))) testEmpty = setErrorOutline(captcha)

  // if (testEmpty) mainForm.submit()
}

function getBonus(e) {
  let btn = e.target
  let inp = document.getElementById("bunusInp")

  inp.onclick = () => inp.style = ""
  
  if (inp?.value) {
    btn.innerHTML = `<img width="20" src="assets/icon/load.gif">`
    setTimeout(() => {
      btn.innerHTML = `Check your wallet`
      showAlert("Wallet valid",{
        bg:"var(--green)"
      })
    }, 2000)
  }
  else {
    inp.style.outline = "1px solid red"
  }
}