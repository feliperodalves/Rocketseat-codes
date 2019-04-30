var listElement = document.querySelector('#app ul');
var inputElement = document.querySelector('#app input');
var buttonElement = document.querySelector('#app button');

function checaIdade(idade) {
    return new Promise(function(resolve, reject){
    setTimeout(function () {
        if (idade >= 18) {
            resolve();
        }else{
            reject ();
        }
    }, 2000);
        
    });
}

checaIdade(20)
    .then(function(){
        console.log("Maior que 18");
    })
    .catch(function(error){
        console.log("Menor que 18");
    })

function renderRepo(){
    listElement.innerHTML = 'Carregando...';
    var user = inputElement.value;
    axios.get('https://api.github.com/users/' + user + '/repos')
        .then(function(response){
            listElement.innerHTML = '';
            for (const i in response.data){
                var repoElement = document.createElement('li');
                var repoText = document.createTextNode(response.data[i].name);
                repoElement.appendChild(repoText);
                listElement.appendChild(repoElement);
            }
        })
        .catch(function(){
            listElement.innerHTML = '';
            var errorTextElement = document.createTextNode('Não foi possível encontrar nenhum repositório');
            listElement.appendChild(errorTextElement);
        });
};

buttonElement.onclick = renderRepo