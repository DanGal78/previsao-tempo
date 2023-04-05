function calc() {

    var valor1 = Number(document.getElementById("valor1").value);
    var valor2 = Number(document.getElementById("valor2").value);
    var operacao = document.getElementById("operacao").value;
    var resultado = document.getElementById("resultado");

    if (operacao === "soma") {
      resultado = valor1 + valor2;
    } else {
      resultado = valor1 - valor2;
    }
    document.getElementById("resultado").value = resultado;
  }