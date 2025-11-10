// Esse JS vai lidar com validação de cupons de desconto!

const okCupomButton = document.getElementById("ok-cupom")
const inputCupom = document.getElementById("cupom-desconto")

okCupomButton.addEventListener("click",()=>{
   const valorInputCupom = inputCupom.value;
   console.log(valorInputCupom)
})
