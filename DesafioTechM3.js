function Cliente(nomeCompleto, dataNascimento, documentoTipo, numeroDocumento, endereco, tipoCliente, rendaMensal) {
    this.nomeCompleto = nomeCompleto,
    this.dataNascimento = dataNascimento,
    this.documento = {
        tipo: documentoTipo,
        numeroDoc: numeroDocumento,
    },
    this.endereco = {
        cep: endereco.cep,
        estado: endereco.estado,
        cidade: endereco.cidade,
        bairro: endereco.bairro,
        logradouro: endereco.logradouro,
        numero: endereco.numero,
        complemento: endereco.complemento,
    },
    this.tipoCliente = tipoCliente,
    this.rendaMensal = rendaMensal,
    this.ativo = false
    this.saldo = 0

this.validadorDoc1 = function() {
    const conta1 = [10, 9, 8, 7, 6, 5, 4, 3, 2]
    let soma1 = 0
    
    for (let i = 0; i < conta1.length; i++) {
        soma1 += this.documento.numeroDoc.toString()[i] * conta1[i]
    }
    
    let result = (soma1 * 10) % 11
    
    if (result === 10 || result === 11) {
        result = 0
    } 

    return result
}   

this.validadorDoc2 = function() {
    const conta2 = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2]
    let soma2 = 0

    for (let j = 0; j < conta2.length; j++) {
        soma2 += this.documento.numeroDoc.toString()[j] * conta2[j]
    }
    
    let result2 = (soma2 * 10) % 11

    if (result2 === 10 || result2 === 11) {
        result2 = 0
    }

    return result2
}

this.calcularIdade = function() {
    let partes = this.dataNascimento.split("/")
    let dataFormatada = new Date(partes[2], partes[1] - 1, partes[0])
    
    let dataAtual = new Date()
    let idade = dataAtual.getFullYear() - dataFormatada.getFullYear()

    let mesAtual = dataAtual.getMonth()
    let diaAtual = dataAtual.getDate()

    if (mesAtual < dataFormatada.getMonth() || (mesAtual === dataFormatada.getMonth() && diaAtual < dataFormatada.getDate())) {
        idade--
    }

    return idade
}

this.idadeValida = function() {
    return this.calcularIdade() >= 18 
}


this.docValido = function () {
    const numeroDocArray = this.documento.numeroDoc.split('')
    const todosDigitosIguais = numeroDocArray.every(digit => digit === numeroDocArray[0])

    if (todosDigitosIguais) {
        return false
    } else if (this.validadorDoc1() === parseInt(numeroDocArray[9]) && this.validadorDoc2() === parseInt(numeroDocArray[10])) {
        return true
    } else {
        return false
    }
}

this.rendaCartao = function() {
    return this.rendaMensal >= 10000
}


this.contaAtiva = function () {
    if (!this.idadeValida()) {
        return "Conta não pode ser aberta pois não possui a idade suficiente!"
    } 
    if (!this.docValido()) {
        return "Conta não pode ser aberta pois o documento não é válido!"
    }
    
    if (!this.ativo) { 
        this.ativo = true;
    }
    
    const min = 1;
    const max = 100000;
    const numeroConta = Math.floor(Math.random() * (max - min + 1)) + min
    const tipoCartao = this.rendaCartao() === true ? "CARTÃO BLACK" : "CARTÃO STANDARD"

    return {
            statusConta: this.ativo,
            numeroConta: numeroConta,
            saldo: this.saldo,
            tipoCartao: tipoCartao
    }
}

this.acrescentarSaldo = function(valor, moeda) {
    if (!this.ativo) {
        return "Não pode ser acrescentado saldo pois a conta não está ativa!"
    }

    if (moeda === "BRL") {
        this.saldo += valor
        console.log(`Depósito realizado com sucesso. Saldo atual: R$ ${this.saldo.toFixed(2)}`)
    } else if (moeda === "USD" || moeda === "EUR") {
        this.saldo += this.converterMoeda(valor, moeda);
        console.log(`Depósito realizado com sucesso. Saldo atual: R$ ${this.saldo.toFixed(2)}`)
    }
}

this.debitarSaldo = function(valor) {
    if (!this.ativo) {
        return "Para realizar transações a conta do cliente precisa estar ativa"
    }

    if (valor > this.saldo) {
        return `Não é possível realizar saques maiores que ${this.saldo}`
    }

    this.saldo -= valor
    return `Saque realizado com sucesso. Saldo atual: R$ ${this.saldo.toFixed(2)}`
}

this.converterMoeda = function(valor, moeda) {
    const COTACAO = {
        EUR: 5.69,
        USD: 5.28,
    };

    return Number((valor * COTACAO[moeda]).toFixed(2));
}
}

function criarCliente(nomeCompleto, dataNascimento, documentoTipo, numeroDocumento, cep, estado, cidade, bairro, logradouro, numero, complemento, tipoCliente, rendaMensal) {
    const endereco = {
        cep: cep,
        estado: estado,
        cidade: cidade,
        bairro: bairro,
        logradouro: logradouro,
        numero: numero,
        complemento: complemento
    }
    return new Cliente(nomeCompleto, dataNascimento, documentoTipo, numeroDocumento, endereco, tipoCliente, rendaMensal)
}

function statusContaCliente(cliente) {
    const resultadoConta = cliente.contaAtiva()
    
    if (typeof resultadoConta === 'string') {
        console.log(`Olá, ${cliente.nomeCompleto}, o status da sua conta é: ${resultadoConta.statusConta ? "Ativa" : "Inativa"}, ${resultadoConta}`)
    } else {
        console.log(`Olá, ${cliente.nomeCompleto}, o status da sua conta é: ${resultadoConta.statusConta ? "Ativa" : "Inativa"}, Número da Conta: ${resultadoConta.numeroConta}, Saldo: R$ ${resultadoConta.saldo.toFixed(2)}, Tipo de Cartão: ${resultadoConta.tipoCartao}`)
    }
} 

const cliente1 = criarCliente("Eric", "11/11/1997", "CPF", "12345678911", "73000-000", "BR", "AMAPÁ", "BAIRRO", "RUA X", 1, "CASA", "BRASILEIRO", 10000.00)

const cliente2 = criarCliente("Eric Silva", "11/11/2015", "CPF", "12345678911", "73000-000", "BR", "AMAPÁ", "BAIRRO", "RUA X", 1, "CASA", "BRASILEIRO", 3000.00)

statusContaCliente(cliente1)

cliente1.acrescentarSaldo(200, "BRL")

console.log(cliente1.debitarSaldo(350))
console.log(cliente1.debitarSaldo(50))

statusContaCliente(cliente2)