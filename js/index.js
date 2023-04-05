async function pesquisar() {
    limpaCard() 
    const cidade = document.getElementById("cidade-input").value;
    const imagem = document.getElementById("img-previsao");
    const previsaoDiv = document.querySelector(".previsao");
    const mainElement = document.querySelector("main")
    
    const temperatura = document.getElementById("temperatura");
    const descricao = document.getElementById("descricao");    
    const detalhesPrevisaoDiv = document.querySelector(".detalhes-previsao");
    const umidade = document.getElementById("umidade-valor");
    const vento = document.getElementById("vento-velocidade");
    const sensacaoTermica = document.getElementById("sensacao-termica-temp");



    const previsao = await obterDados(cidade);

    if (previsao.cod == 404) {
        imagem.src = "imgs/error.png";
        previsaoDiv.classList.remove("hidden");
        mainElement.classList.add("opened-main")
    }

    if (previsao.cod !== 200) return;

    

    const { main, weather, wind: { speed } } = previsao;

    previsaoDiv.classList.remove("hidden");
    detalhesPrevisaoDiv.classList.remove("hidden");

    imagem.src = classificaImagem(weather[0].main);
    temperatura.innerText = `${main.temp}  ºC`;
    descricao.innerText = `${weather[0].description}`;
    umidade.innerText = `${main.humidity} %`;
    vento.innerText = `${speed} KM/H`;
    sensacaoTermica.innerText = `${main.feels_like} ºC`;

}

function limpaCard(){

    const imagem = document.getElementById("img-previsao");
    const previsaoDiv = document.querySelector(".previsao");       
    const temperatura = document.getElementById("temperatura");
    const descricao = document.getElementById("descricao");    
    const detalhesPrevisaoDiv = document.querySelector(".detalhes-previsao");
    const umidade = document.getElementById("umidade-valor");
    const vento = document.getElementById("vento-velocidade");
    const sensacaoTermica = document.getElementById("sensacao-termica-temp");

    previsaoDiv.classList.add("hidden");
    detalhesPrevisaoDiv.classList.add("hidden");

    temperatura.innerHTML ="";
    descricao.innerHTML ="";
    umidade.innerHTML ="";
    vento.innerHTML ="";
    sensacaoTermica.innerHTML ="";

}

async function obterDados(cidade) {
    try {
        const respose = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&appid=02d484f8c36c50fc74d9e6131549ff5e&lang=pt_br`);
        const data = respose.json();

        return data;
    } catch (exception) {
        console.log(exception.messagem)

    }

}

function classificaImagem(previsaoAPI) {
    const imagens = {
        "Clear": "imgs/clear.png",
        "Clouds": "imgs/cloud.png",
        "Mist": "imgs/mist.png",
        "Rain": "imgs/rain.png",
        "Snow": "imgs/snow.png",
        get: function (previsao) {
            const previsoes = Object.keys(imagens);

            if (previsoes.includes(previsao) && previsao !== "get") {
                return imagens[previsao];
            }
            return imagens.Clouds;
        },

    };
    return imagens.get(previsaoAPI);
};
function main() {
    document.getElementById("cidade-input").addEventListener("keypress", function ({ key }) {
        if (key === "Enter") {
            pesquisar();
        }
    });
}