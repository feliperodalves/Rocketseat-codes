//EXERCICIO 1
class Usuario{
    constructor(nome, senha) {
        this.nome = nome;
        this.senha = senha;
    }
    isAdmin() {
        return this.admin || false;   
    }
}

class Admin extends Usuario{
    constructor(){
        super();
        this.admin = true;
    }
}

const User1 = new Usuario('email@teste.com', 'senha123');
const Adm1 = new Admin('email@teste.com', 'senha123');

console.log(User1.isAdmin()) // false
console.log(Adm1.isAdmin()) // true

//EXERCICIO 2
const usuarios = [
    { nome: 'Diego', idade: 23, empresa: 'Rocketseat' },
    { nome: 'Gabriel', idade: 15, empresa: 'Rocketseat' },
    { nome: 'Lucas', idade: 30, empresa: 'Facebook' },
];

const mapUsuarios = usuarios.map(item => item.idade);
console.log(mapUsuarios);

const filterUsuarios = usuarios.filter(item => item.empresa === 'Rocketseat' && item.idade > 18);
console.log(filterUsuarios);

const findUsuarios = usuarios.filter(item => item.empresa === 'Google');
console.log(findUsuarios);

const unionUsuarios = usuarios.map(item => ({nome: item.nome, idade: item.idade*=2, empresa: item.empresa}))
    .filter(item => item.idade <= 50);
console.log(unionUsuarios);

//EXERCICIO 3
// 3.1
const arr = [1, 2, 3, 4, 5];
arr.map((item) => {item + 10});
// 3.2
// Dica: Utilize uma constante pra function
const user = { nome: 'Diego', idade: 23 };
const mostraIdade = item => item;
console.log(mostraIdade(user.idade));
// 3.3
// Dica: Utilize uma constante pra function
const nome = "Diego";
const idade = 23;
const mostraUsuario = (nome = 'Diego', idade = 18) => ({ nome, idade });
console.log(mostraUsuario(nome, idade));
console.log(mostraUsuario(nome));
// 3.4
const promise = () => { new Promise((resolve, reject) => {resolve()})};

//EXERCICIO 4
const empresa = {
    nome: 'Rocketseat',
    endereco: {
        cidade: 'Rio do Sul',
        estado: 'SC',
    }
};
const {nome: nome2, endereco: {cidade, estado}} = empresa;
console.log(nome2);
console.log(cidade);
console.log(estado);

function mostraInfo(usuario) {
    const {nome: nome3, idade:idade3} = usuario
    return `${nome3} tem ${idade3} anos.`;
}
console.log(mostraInfo({ nome: 'Diego', idade: 23 }));

//EXERCICIO 5
const arr2 = [1, 2, 3, 4, 5, 6];
const [x,...y] = arr2;
console.log(x);
console.log(y);

const soma = (item) => item.reduce((a, b) => a+b);
console.log(soma(y));

const usuario5 = {
    nome: 'Diego',
    idade: 23,
    endereco: {
        cidade: 'Rio do Sul',
        uf: 'SC',
        pais: 'Brasil',
    }
};
const usuario52 = {...usuario5, nome: 'Gabriel' };
const usuario53 = {...usuario5, endereco: {...usuario5.endereco, cidade: 'Lontras'}};
console.log(usuario52);
console.log(usuario53);

//EXERCICIO 6
const usuario6 = 'Diego';
const idade6 = 23;
console.log(`O usuário ${usuario6} possui ${idade6} anos`);

//EXERCICIO 7
const nome7 = 'Diego';
const idade7 = 23;
const usuario7 = {
    nome7,
    idade7,
    cidade: 'Rio do Sul',
};
console.log(usuario7);