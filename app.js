

function calcularValorAleatorio(valorMax,valorMin) {
    return Math.floor(Math.random() * (valorMax-valorMin)) + valorMin;
}

const app = Vue.createApp({
data() {
    return {
        vidaJogador: 100,
        vidaMonstro: 100,
        turnoAtual: 0,
        vencedor: null,
        logBatalha: []

    }
},
computed: {
    styleBarraDeVidaMonstro() {
        if (this.vidaMonstro <= 0) {
            return {width: '0%'}
        }
        return { width: this.vidaMonstro + '%' }
    },

    styleBarraDeVidaJogador() {
        if (this.vidaJogador <= 0) {
            return {width: '0%'}
        }
        return { width: this.vidaJogador + '%' }
    },
    isAtaqueEspecialDisponivel() {
        return this.turnoAtual % 3 !== 0;
    }
},
watch: {
    vidaJogador(valor) {
        if (valor <= 0 && this.vidaMonstro <=0){
            this.vencedor = 'empate'
        } else if (valor <= 0) {
            this.vencedor = 'monstro'
        }
    },
    vidaMonstro(valor) {
        if (valor <= 0 && this.vidaJogador <=0){
            this.vencedor = 'empate'
        } else if (valor <= 0) {
            this.vencedor = 'jogador'
        }
    }
},
methods: {
    atacarMonstro() {
        this.turnoAtual++
        const ataqueJogadorValor = calcularValorAleatorio(12,5)
        this.vidaMonstro -= ataqueJogadorValor
        this.adicionarLogBatalha('jogador','ataque', ataqueJogadorValor)
        this.atacarJogador()
    },
    atacarJogador() {
        const ataqueMonstroValor = calcularValorAleatorio(15,8)
        this.vidaJogador -= ataqueMonstroValor
        this.adicionarLogBatalha('monstro','ataque', ataqueMonstroValor)

    },
    ataqueEspecial(){
        this.turnoAtual++
        const valorAtaqueEspecial = calcularValorAleatorio(25,10)
        this.vidaMonstro -= valorAtaqueEspecial
        this.adicionarLogBatalha('jogador','magia', valorAtaqueEspecial)
        this.atacarJogador()
    },
    curarJogador() {
        this.turnoAtual++
        const valorCura = calcularValorAleatorio(20,8)
        if (valorCura + this.vidaJogador > 100) {
            this.vidaJogador = 100
            this.adicionarLogBatalha('jogador','cura', valorCura - vidaJogador)
        } else {
            this.vidaJogador += valorCura
            this.adicionarLogBatalha('jogador','cura', valorCura)
        }
        this.atacarJogador()
    },
    reiniciarJogo() {
        // window.location.reload(true);
        this.vidaJogador = 100
        this.vidaMonstro = 100
        this.turnoAtual = 0
        this.vencedor = null
        this.logBatalha = []
    },
    seRender() {
        this.vencedor = 'monstro'
        //this.vidaJogador = 0
    },
    adicionarLogBatalha(pessoa, acaoRealizada, valor) {
        this.logBatalha.unshift(
            {
                'acaoPessoa': pessoa,
                'acaoTipo': acaoRealizada,
                'acaoValor': valor
            }
        )
    }
}
})

app.mount('#game')