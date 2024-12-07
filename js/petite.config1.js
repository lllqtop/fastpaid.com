function $dataVue(o = {}) {
  const { reactive, createApp } = PetiteVue
  const r = reactive(o)
  // r.$delimiters = ['{', '}']
  createApp(r).mount("body") 
  return r
}