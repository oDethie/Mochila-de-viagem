export default class ArvoreHTML {
    constructor() {
        this._form = document.querySelector('[data-form]');
        this._ul = document.querySelector('[data-ul]');
        this._itens = this.buscaLocalStorage();
    }

    resgataInput() {
        return {
            nome: this._form.nome.value,
            quantidade: this._form.quantidade.value
        }
    }

    criaElemento({quantidade, nome, id}) {
        const li = document.createElement('li');
        li.classList.add('item');
        
        const strong = document.createElement('strong');
        strong.innerHTML = quantidade;
        strong.dataset.id = id;

        li.appendChild(strong);
        li.innerHTML += nome;

        li.appendChild(this.botaoDeleta(id));

        this._ul.appendChild(li);
    }

    armazenaLocalStorage(objeto) {
        this._itens.push(objeto);
        localStorage.setItem('itens', JSON.stringify(this._itens));
    }

    buscaLocalStorage() {
        const itens = JSON.parse(localStorage.getItem('itens')) || [];

        return itens;
    }

    carregaItens() {
        if(this._itens.length > 0) {
            this._itens.forEach((item)=> {
                this.criaElemento(item);
            })
        } else {
            return 0;
        }
    }

    atualizaElemento({quantidade, id}, existe) {
        this._itens[this._itens.findIndex(elemento => elemento.id === existe.id)].quantidade = quantidade;
        localStorage.setItem('itens', JSON.stringify(this._itens));
        const elementoStrong = document.querySelector(`[data-id='${id}']`);
        elementoStrong.innerHTML = quantidade;
    }

    verificaItens(objeto) {
        const existe = this._itens.find(item => item.nome.toUpperCase() === objeto.nome.toUpperCase());
        if(existe) {
            objeto.id = existe.id;
            this.atualizaElemento(objeto, existe);
        } else {
            objeto.id = this._itens[this._itens.length - 1] ? (this._itens[this._itens.length - 1]).id + 1 : 0;
            this.criaElemento(objeto);
            this.armazenaLocalStorage(objeto);
        }
    }

    botaoDeleta(id) {
        const botao = document.createElement('button');
        botao.innerText = 'X';
        botao.classList.add("botaoDelete");

        botao.addEventListener('click', (event) => {
            const alvo = event.target;
            const paiElemento = alvo.parentElement;

            paiElemento.remove();

            this._itens.splice(this._itens.findIndex(elemento => elemento.id === id), 1);

            localStorage.setItem('itens', JSON.stringify(this._itens));
        })

        return botao;
    }
}