// Esse JS vai lidar com validação de cupons de desconto!

const okCupomButton = document.getElementById("ok-cupom");
const inputCupom = document.getElementById("cupom-desconto");
const feedbackPositivo = document.getElementById("feedback-positivo");
const feedbackNegativo = document.getElementById("feedback-negativo")

okCupomButton.addEventListener("click", () => {
    const valorInputCupom = inputCupom.value;
    console.log(valorInputCupom);
});
