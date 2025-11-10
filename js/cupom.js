// Esse JS vai lidar com validação de cupons de desconto!

const okCupomButton = document.getElementById("ok-cupom");
const inputCupom = document.getElementById("cupom-desconto");
const feedbackPositivo = document.getElementById("feedback-positivo");
const feedbackNegativo = document.getElementById("feedback-negativo");

// Banco de cupons
const cupons = [
    { codigo: "BULBE10", valor: 0.1 },
    { codigo: "BULBE15", valor: 0.15 },
    { codigo: "BLACKFRIDAY", valor: 0.2 },
];

let desconto = 0;

okCupomButton.addEventListener("click", () => {
    const valorInputCupom = inputCupom.value.trim().toUpperCase();
    console.log(valorInputCupom);
});
