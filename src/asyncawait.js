import axios from 'axios';
import ClasseUsuario, {idade as IdadeUsuario} from './functions';

const minhaPromise = () => new Promise((resolve, reject) =>{
    setTimeout(()=>{resolve('OK')}, 2000);
});

async function executaPromise(){
    console.log(await minhaPromise());
    console.log(await minhaPromise());
    console.log(await minhaPromise());
}

executaPromise();

class Api {
    static async getUserInfo(username){
        try{
            const response = await axios.get(`https://api.github.com/users/${username}`);
            console.log(response);
        }catch (error){
            console.log('Erro na API');
        }
        

        
    }
}

Api.getUserInfo('feliperodalves');

ClasseUsuario.info();
console.log(IdadeUsuario);


// EXERCICIO 1
const delay = () => new Promise(resolve => setTimeout(resolve, 1000));

async function umPorSegundo() {
    await delay();
    console.log('1s');
    await delay();
    console.log('2s');
    await delay();
    console.log('3s');
}
umPorSegundo();

// EXERCICIO 2
async function getUserFromGithub(user) {
    try {
        const response = await axios.get(`https://api.github.com/users/${user}`);
        console.log(response.data);
    } catch (error){
        console.log('Usuário não existe');
    }
}
getUserFromGithub('diego3g');
getUserFromGithub('diego3g124123');

// EXERCICIO 3
class Github {
    static async getRepositories(repo) {
        try{
            const response = await axios.get(`https://api.github.com/repos/${repo}`);
            console.log(response.data);
        } catch (error){
            console.warn('Repositório não existe');
        }
    }
}
Github.getRepositories('feliperodalves/udacity-ndvr');
Github.getRepositories('rocketseat/dslkvmskv');

// EXERCICIO 4
const buscaUsuario = async usuario => {
    try {
        const response = await axios.get(`https://api.github.com/users/${usuario}`);
        console.log(response.data);
    } catch (error) {
        console.warn('Usuário não existe');
    }
}
buscaUsuario('diego3g');