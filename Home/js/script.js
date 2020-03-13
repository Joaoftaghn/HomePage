// HomePage script V 0

// globalVars

const loader = `
        <div class="spinner-border text-secondary" role="status" id="loader">
            <span class="sr-only">Loading...</span>
        </div>`;

const imagens = {
    init: './img/init.jpg',
    congelando: './img/congelando.jpg',
    morna: './img/morna.jpg',
    quente: './img/quente.jpg'

}

const weatherUi = document.querySelector('#clima');
const backimg = document.getElementById('container');



// backimg.style.backgroundColor = 'hotpink'
// Gets data from metaWeather


function getWeather(woeid) {
    // envia uma pedido com as informações do clima do woeid escolhido
    weatherUi.insertAdjacentHTML('afterbegin', loader);
    fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${woeid}/`)
        .then(data => {

            data.json()
                .then(weatherData => {
                    dataTreatment(weatherData)
                    // console.log(weatherData);    

                })
        });
}


getWeather(455827);


// receives data and put it on screen
function updateUI(weatherData, status) {
    backimg.style.backgroundImage = `url("${imagens[status]}")`
    weatherUi.innerHTML = weatherData;
}



// recebe um objeto e transforma em dados HumanReadable
function dataTreatment(weatherData) {

    let todayTemps, status, conselho;
    // um array com temperaturas minima e maxima
    todayTemps = [Math.round(weatherData.consolidated_weather[0].min_temp), Math.round(weatherData.consolidated_weather[0].max_temp)];

    //  Verifica o status do dia com base na temperatura minima
    if (todayTemps[0] <= 14) {
        status = 'congelando'
    } else if (todayTemps[0] <= 18) {
        status = 'morna'
    } else if (todayTemps[0] >= 19) {
        status = 'quente'
    }
    // gera o conselho com base no status
    if (status === 'congelando') {
        conselho = 'Melhor se agasalhar bem!'
    } else if (status === 'morna') {
        conselho = 'O dia vai começar frio e esquentar depois, melhor levar um agasalho fino, melhor prevenir do que remediar!'
    } else if (status === 'quente') {
        conselho = 'Hoje vai ser um dia quente, melhor evitar roupas pretas e proteger a cabeça do sol!'
    }
    // cria uma estrutura html para passar pra função que joga na tela
    let paragrafo = `<h2>São paulo está ${status} hoje com temperaturas entre ${todayTemps[0]} e ${todayTemps[1]} Graus!</h2><h3>${conselho}</h3>`


    return updateUI(paragrafo, status);
}