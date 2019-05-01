"use strict";

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

//EXERCICIO 1
var Usuario =
/*#__PURE__*/
function () {
  function Usuario(nome, senha) {
    _classCallCheck(this, Usuario);

    this.nome = nome;
    this.senha = senha;
  }

  _createClass(Usuario, [{
    key: "isAdmin",
    value: function isAdmin() {
      return this.admin || false;
    }
  }]);

  return Usuario;
}();

var Admin =
/*#__PURE__*/
function (_Usuario) {
  _inherits(Admin, _Usuario);

  function Admin() {
    var _this;

    _classCallCheck(this, Admin);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Admin).call(this));
    _this.admin = true;
    return _this;
  }

  return Admin;
}(Usuario);

var User1 = new Usuario('email@teste.com', 'senha123');
var Adm1 = new Admin('email@teste.com', 'senha123');
console.log(User1.isAdmin()); // false

console.log(Adm1.isAdmin()); // true
//EXERCICIO 2

var usuarios = [{
  nome: 'Diego',
  idade: 23,
  empresa: 'Rocketseat'
}, {
  nome: 'Gabriel',
  idade: 15,
  empresa: 'Rocketseat'
}, {
  nome: 'Lucas',
  idade: 30,
  empresa: 'Facebook'
}];
var mapUsuarios = usuarios.map(function (item) {
  return item.idade;
});
console.log(mapUsuarios);
var filterUsuarios = usuarios.filter(function (item) {
  return item.empresa === 'Rocketseat' && item.idade > 18;
});
console.log(filterUsuarios);
var findUsuarios = usuarios.filter(function (item) {
  return item.empresa === 'Google';
});
console.log(findUsuarios);
var unionUsuarios = usuarios.map(function (item) {
  return {
    nome: item.nome,
    idade: item.idade *= 2,
    empresa: item.empresa
  };
}).filter(function (item) {
  return item.idade <= 50;
});
console.log(unionUsuarios); //EXERCICIO 3
// 3.1

var arr = [1, 2, 3, 4, 5];
arr.map(function (item) {
  item + 10;
}); // 3.2
// Dica: Utilize uma constante pra function

var user = {
  nome: 'Diego',
  idade: 23
};

var mostraIdade = function mostraIdade(item) {
  return item;
};

console.log(mostraIdade(user.idade)); // 3.3
// Dica: Utilize uma constante pra function

var nome = "Diego";
var idade = 23;

var mostraUsuario = function mostraUsuario() {
  var nome = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Diego';
  var idade = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 18;
  return {
    nome: nome,
    idade: idade
  };
};

console.log(mostraUsuario(nome, idade));
console.log(mostraUsuario(nome)); // 3.4

var promise = function promise() {
  new Promise(function (resolve, reject) {
    resolve();
  });
}; //EXERCICIO 4


var empresa = {
  nome: 'Rocketseat',
  endereco: {
    cidade: 'Rio do Sul',
    estado: 'SC'
  }
};
var nome2 = empresa.nome,
    _empresa$endereco = empresa.endereco,
    cidade = _empresa$endereco.cidade,
    estado = _empresa$endereco.estado;
console.log(nome2);
console.log(cidade);
console.log(estado);

function mostraInfo(usuario) {
  var nome3 = usuario.nome,
      idade3 = usuario.idade;
  return "".concat(nome3, " tem ").concat(idade3, " anos.");
}

console.log(mostraInfo({
  nome: 'Diego',
  idade: 23
})); //EXERCICIO 5

var arr2 = [1, 2, 3, 4, 5, 6];
var x = arr2[0],
    y = arr2.slice(1);
console.log(x);
console.log(y);

var soma = function soma(item) {
  return item.reduce(function (a, b) {
    return a + b;
  });
};

console.log(soma(y));
var usuario5 = {
  nome: 'Diego',
  idade: 23,
  endereco: {
    cidade: 'Rio do Sul',
    uf: 'SC',
    pais: 'Brasil'
  }
};

var usuario52 = _objectSpread({}, usuario5, {
  nome: 'Gabriel'
});

var usuario53 = _objectSpread({}, usuario5, {
  endereco: _objectSpread({}, usuario5.endereco, {
    cidade: 'Lontras'
  })
});

console.log(usuario52);
console.log(usuario53); //EXERCICIO 6

var usuario6 = 'Diego';
var idade6 = 23;
console.log("O usu\xE1rio ".concat(usuario6, " possui ").concat(idade6, " anos")); //EXERCICIO 6

var nome7 = 'Diego';
var idade7 = 23;
var usuario7 = {
  nome7: nome7,
  idade7: idade7,
  cidade: 'Rio do Sul'
};
console.log(usuario7);
