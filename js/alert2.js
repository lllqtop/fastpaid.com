const alertFunc = (text,params={}) => {
  params.bg         ||= '#333'
  params.color      ||= '#fff'
  params.speed      ||= 300 
  params.time       ||= 5
  params.mobile     ||= false
  params.pos        ||= "left"
  params.top        ||= "10vh"
  params.round      ||= 5 
  params.offset     ||= 0
  params.width      ||= ""
  params.align      ||= "left"
  params.padding    ||= "20px"
  params.border     ||= ""
  params.class      ||= ""
  params.fontSize   ||= ""
  params.fontWeight ||= 700

  let alert  = document.createElement('div')

  alert.className = params.class
  
  alert.style.padding    = params.padding
  alert.style.color      = params.color
  alert.style.fontWeight = params.fontWeight
  alert.style.textAlign  = params.align
  alert.style.fontSize   = params.fontSize

  alert.innerHTML = text || "lorem ipsum dolor"

  document.body.append(alert)

  let alertWidth  =  alert.offsetWidth || 0

  const roundPos = (ps, rd) => {
    if (ps === "left") {
      return `0 ${rd}px ${rd}px 0`
    }
    else if(ps === "right") {
      return `${rd}px 0 0 ${rd}px`
    }
    else return `${rd}px`
  }

  alert.style.position = "fixed"
  alert.style.borderRadius = roundPos(params.pos, params.round)
  alert.style.background = params.bg 
  alert.style.top = params.top
  alert.style[params.pos] = `-${alertWidth}px`
  alert.style.width = params.width ? `calc(${params.width} - ${params.offset} * 2)` : ""
  alert.style.zIndex = 999999
  alert.style.transition = `${params.pos} ${params.speed}ms ease-in-out 0s`
  alert.style.margin = params.offset
  alert.style.border = params.border

  setTimeout(() => { alert.style[params.pos] = 0 }, 10);  
  setTimeout(() => { alert.style[params.pos] = `-${alertWidth}px`},params.time*1000-10)
  setTimeout(() => { alert.remove() }, params.time * 1000 + params.speed - 10) 
}

// export const showAlert = alertFunc
window.showAlert = alertFunc

