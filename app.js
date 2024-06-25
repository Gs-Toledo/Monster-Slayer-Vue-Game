

function calcularValorAleatorio(valorMax,valorMin) {
    return Math.floor(Math.random() * (valorMax-valorMin)) + valorMin;
}

const app = Vue.createApp({
data() {
    return {
        vidaJogador: 100,
        vidaMonstro: 100,
        turnoAtual: 0
    }
},
computed: {
    styleBarraDeVidaMonstro() {
        return { width: this.vidaMonstro + '%' }
    },

    styleBarraDeVidaJogador() {
        return { width: this.vidaJogador + '%' }
    },
    isAtaqueEspecialDisponivel() {
        return this.turnoAtual % 3 !== 0;
    }
},
methods: {
    atacarMonstro() {
        this.turnoAtual++
        const ataqueJogadorValor = calcularValorAleatorio(12,5)
        this.vidaMonstro -= ataqueJogadorValor
        this.atacarJogador()
    },
    atacarJogador() {
        const ataqueMonstroValor = calcularValorAleatorio(15,8)
        this.vidaJogador -= ataqueMonstroValor
    },
    ataqueEspecial(){
        this.turnoAtual++
        const valorAtaque = calcularValorAleatorio(25,10)
        this.vidaMonstro -= valorAtaque
        this.atacarJogador()
    },
    curarJogador() {
        this.turnoAtual++
        const valorCura = calcularValorAleatorio(20,8)
        if (this.valorCura + this.vidaJogador > 100) {
            this.vidaJogador = 100
        } else {
            this.vidaJogador += valorCura
        }
        this.atacarJogador
    }
}
})

app.mount('#game')