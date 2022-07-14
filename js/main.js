import ArvoreHTML from "./ArvoreHTML.js";
const elementoPai = new ArvoreHTML();
elementoPai.carregaItens();
elementoPai._form.nome.focus();

elementoPai._form.submit.addEventListener('click', (event) => {
    event.preventDefault();
    const input = elementoPai.resgataInput();

    elementoPai.verificaItens(input);

    elementoPai._form.reset();
    elementoPai._form.nome.focus();
})