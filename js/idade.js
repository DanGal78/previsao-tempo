function verificar() {

    const nome = document.getElementById("nome").value;
    const anoNascimento = document.getElementById("nascimento").value;
    const genero = document.querySelector("input[name=genero]:checked").value;
    const texto = document.getElementById("resultado-text");
    const imagem = document.getElementById("resultado-img");
    const resultado = document.getElementById("resultado");

    const data = new Date();
    const idade = data.getFullYear() - anoNascimento;
    const imageUrl = "imgs/" + classificaIdade(idade, genero);

    imagem.setAttribute("src", imageUrl);

    texto.innerText = `Olá ${nome}, Identificamos
     ${(genero == "M" ? "Homem" : "Mulher")} de ${idade} anos`;

    resultado.classList.remove("hidden");
}
function classificaIdade(idade, genero) {

    if (idade >= 1 && idade <= 4){
        if (genero == "M"){
            return "bebe-M.webp";
        }
        return "bebe-F.webp";
    }
    if (idade >= 5 && idade <= 15){
        if (genero == "M"){
            return "crianca-M.webp";
        }
        return "crianca-F.webp";
    }
    if (idade >= 16 && idade <= 55){
        if (genero == "M"){
            return "adulto-M.jpg";
        }
        return "adulto-F.webp";
    }
    if (genero == "M"){
        return "idoso-M.jpg";
    }
    return "idoso-F.jpg";
}
