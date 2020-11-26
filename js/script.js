const push = document.querySelector(".push");
const form = document.querySelector(".form");
let itemsNum = document.querySelectorAll(".form-item").length;

const range =   `<div class="inputs">
                    от <input type="number" name="" id="">
                    до <input type="number" name="" id="">
                </div>`;
const type =    `<div class="inputs">
                    <select name="type" id="type">
                        <option value="standert">Standart</option>
                        <option value="silver">Silver</option>
                        <option value="gold">Gold</option>
                    </select>
                </div>`;
const status1 =  `<div class="inputs">
                    <select name="status" id="status">
                        <option value="standert">Активна</option>
                        <option value="silver">Неактивна</option>
                    </select>
                </div>`;

class Condition {
    constructor(num){
        this.num = num;
    }
    render() {
        const formItem = document.createElement("div");
        let rangeNum = formItem.querySelectorAll(".range").length;
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
                    <button class="hide"></button>
                </div>
                <div class="del-btn">
                    <button><i class="fas fa-trash-alt"></i>  Удалить условие</button>
                </div>
            </div>
        `;
        form.append(formItem);
        itemsNum++;

        const addBtn = formItem.querySelector(".add-btn");
        const delBtn = formItem.querySelector(".del-btn");
        const select = formItem.querySelector('select');

        delBtn.addEventListener("click", () => {
            formItem.remove();
            itemsNum--;
            rangeNum = 0;

        });
        
        select.addEventListener("change", () => {
            const rangeWrap = formItem.querySelector('.range-wrapper');
            rangeWrap.innerHTML = "";
            rangeNum = 0;
            if(select.value == "age"){
                createRange();
                addBtn.removeEventListener("click", createType);
                addBtn.removeEventListener("click", createStatus);
                addBtn.addEventListener("click", createRange);
            } 
            else if (select.value == "type"){
                createType();
                addBtn.removeEventListener("click", createRange);
                addBtn.removeEventListener("click", createStatus);
                addBtn.addEventListener("click", createType);

            } 
            else if (select.value == "status"){              
                createStatus();
                addBtn.removeEventListener("click", createType);
                addBtn.removeEventListener("click", createRange);
                addBtn.addEventListener("click", createStatus);                
            } 
            else {
                const btn = formItem.querySelector("button");
                btn.classList.add("hide");
            }
        });

        class Range {
            constructor(rangeNum, condition, inner){
                this.rangeNum = rangeNum;
                this.condition = condition;
                this.inner = inner;
            }
            render(){
                const btn = formItem.querySelector("button");
                btn.classList.remove("hide");
                btn.innerHTML = `<i class="fas fa-plus"></i> Добавить ${this.condition.toLowerCase()}`;
        
                const rangeWrap = formItem.querySelector(".range-wrapper");
                const range = document.createElement("div");
                range.classList.add("range");
                if(rangeNum > 0){
                    range.innerHTML = 
                    `   
                        <div class="range-title">
                            <span>или ${this.condition} ${this.rangeNum+1}</span>
                        </div>
                        ${this.inner}
                    `;
                } else {
                    range.innerHTML = 
                    `
                        <div class="range-title">
                            <span> ${this.condition} ${this.rangeNum+1}</span>
                        </div>
                        ${this.inner}
                    `;
                }
                rangeWrap.append(range);
                rangeNum++;
            }
        }

        function createRange(){
            new Range(rangeNum, 'Диапазон', range).render();   
        }
        function createType(){
            new Range(rangeNum, 'Тип', type).render();   
        }
        function createStatus(){
            new Range(rangeNum, 'Статус', status1).render();   
        }
    }
}

new Condition(itemsNum).render();
push.addEventListener("click", () => new Condition(itemsNum).render());