#!/usr/bin/env node

//

console.log(this);

//

Reset = "\x1b[0m"
BgCyan = "\x1b[46m"
consoleLogItem1 = BgCyan+'%s'+Reset;

//

const _ = require("underscore");

var firstEven = _.find([1, 2, 3, 4, 5, 6], num => num % 2 == 0);

var getMethods = _.functions(XMLHttpRequest);

console.log(getMethods);

process.exit();

//

var o = {
  a: 7,
  get b() { 
    return this.a + 1;
  },
  set c(x) {
    this.a = x / 2
  }
};

console.log(o.a); // 7
console.log(o.b); // 8
o.c = 50;
console.log(o.a); // 25

process.exit();

//

var keys = '10001';

var pagseguro_errors = {
    10001:"Tamanho do cartão inválido.", 
    10006:"Tamanho do CVV inválido.",
    30400:"Dados do cartão inválidos.", 
    30405:"Data de validade incorreta.",
    59001:"ID da sessão web desconhecida",
};

var message = pagseguro_errors[10001];

console.log(message);

console.log(keys);

var message = pagseguro_errors.keys;

console.log(message);


process.exit();

//

var debugData = {};

debugData.config = '1';
debugData.casa = 'aaa';

console.log(debugData);

process.exit();

//

// https://www.npmjs.com/package/cpf_cnpj

const libCpfCnpj = require("cpf_cnpj");
var CPF = libCpfCnpj.CPF;
var CNPJ = libCpfCnpj.CNPJ;

var isValidCPF = CPF.isValid("532.820.857-96");
console.log(isValidCPF);
var isValidCNPJ = CNPJ.isValid("41.381.074/6738-65");
console.log(isValidCNPJ);

process.exit();

//

//const os = require('os'); // https://nodejs.org/api/

console.log(consoleLogItem1, '### pci');

var json = '{"error":true,"success":false,"error_messages":"message"}'; // Checkout Nativo
var json = '{"error":"message","redirect":"http:"}'; // IWD_Opc

console.log(json);
console.log(typeof json);

var json = JSON.parse(json);
console.log(json);
console.log(typeof json);


var error_return = false;

if(json.error){
    var error_return = (json.error != "undefined");
    console.log('json.error: ' + error_return);
}
if(json.success){
    var error_return = (json.success == false);
    console.log('json.success: ' + error_return);
}

console.log(error_return);

//

process.exit();

//

/*console.log(consoleLogItem1, '### https://www.npmjs.com/~mozg');

var mozg_framework_node = require('mozg-framework-node');

console.log(mozg_framework_node);*/

//

//console.log(consoleLogItem1, this);
console.log(consoleLogItem1, '### https://www.npmjs.com/package/creditcard-info');

var creditcardInfo = require('creditcard-info');

var myObject_CardType = {};
myObject_CardType['Amex'] = "376488977091001";
myObject_CardType['Visa'] = "4073020000000002";
myObject_CardType['MasterCard'] = "5555666677778884";
myObject_CardType['Discover'] = "6011000990139424";
myObject_CardType['Dinners'] = "36201475131126";
myObject_CardType['JCB'] = "3566002020360505";
myObject_CardType['ELO'] = "4514166365215946";
myObject_CardType['Aura'] = "5078601800003247449";
myObject_CardType['Maestro'] = "6759649826438453";
myObject_CardType['HiperCard'] = "6062825624254001";
myObject_CardType['Hiper(Other)'] = "6370950000000000";

var obj = myObject_CardType;

console.log('---- Step 1 ----');

Object.keys(obj).forEach(function(key) { // Under ECMAScript 5, you can combine Object.keys() and Array.prototype.forEach():

    console.log('---- Step 2 ----');

    key = key;
    value = obj[key];

    console.log(key, value);

    //var rule = creditcardInfo(value).getRule();
    //console.log(rule);

    brand = creditcardInfo(value).getBrand();
    console.log(brand);

});

console.log('---- End ----');

//

console.info(consoleLogItem1, '### https://www.npmjs.com/package/creditcardgenerator');

const creditcardgenerator = require('creditcardgenerator');

var creditcard_json = creditcardgenerator.create('Diners');

console.log(creditcard_json);

var creditcard = creditcard_json.number;

console.log(creditcard);

console.log('---');

//

console.info(consoleLogItem1, '### https://www.npmjs.com/package/random-natural');

var randomNatural = require('random-natural');

var random_number = randomNatural({ min: 1, max: 60 });

console.log(random_number);

var random_number = randomNatural({ min: 1, max: 60 });

console.log(random_number);

var random_number = randomNatural({ min: 1, max: 60 });

console.log(random_number);

var random_number = randomNatural({ min: 1, max: 60 });

console.log(random_number);

var random_number = randomNatural({ min: 1, max: 60 });

console.log(random_number);

var random_number = randomNatural({ min: 1, max: 60 });

console.log(random_number);

console.log('---');

//