const push = document.querySelector(".push");
const form = document.querySelector(".form");
let number = 0;

function createCondition(){
    new Condition(number).render();
}


class Condition {
    constructor(num){
        this.num = num;

    }
    render() {
        const formItem = document.createElement("div");
        formItem.classList.add("form-item");
        formItem.innerHTML = 
        `                    
            <div class="condition">
                <span>Условие ${this.num+1}</span>
                <select name="condition" id="condition">
                    <option value="choose">Выберете условие</option>
                    <option value="age">Возраст респондента</option>
                    <option value="type">Тип карты лояльности</option>
                    <option value="status">Статус карты лояльности</option>
                </select>
            </div>
            <div class="range-wrapper">
            </div>
            <div class="item-buttons">
                <div class="add-btn">
                </div>
                <div class="del-btn">
                    <button><i class="fas fa-trash-alt"></i>  Удалить условие</button>
                </div>
            </div>
        `;
        form.append(formItem);
        number++;

        const delBtn = formItem.querySelector(".del-btn");
        delBtn.addEventListener("click", () =>{
            formItem.remove();
            number--;
        });
    }
}

createCondition();

push.addEventListener("click", createCondition);