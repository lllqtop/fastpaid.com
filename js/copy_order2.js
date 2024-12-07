document.querySelectorAll('[data-copy]').forEach(elem=>{
  elem.addEventListener("click",()=>{
    navigator.clipboard.writeText(elem.dataset.copy)
    showAlert("Copied",{
      bg:'var(--green)'
    })
  })
})