export default function createForm() {
    const push = document.querySelector(".push");
    const form = document.querySelector(".form");
    let itemsNum = document.querySelectorAll(".form-item").length;

    const range = `   от <input type="number" name="from" id="">
                    до <input type="number" name="to" id="">  `;
    const type = `   <select name="type" id="type">
                        <option value="standart">Standart</option>
                        <option value="silver">Silver</option>
                        <option value="gold">Gold</option>
                    </select>   `;
    const activStatus = `  <select name="status" id="status">
                        <option value="activ">Активна</option>
                        <option value="no-active">Неактивна</option>
                    </select>   `;

    class Condition {
        constructor(num) {
            this.num = num;
        }
        render() {
            const formItem = document.createElement("div");
            let rangeNum = formItem.querySelectorAll(".range").length;
            this.num = document.querySelectorAll(".form-item").length;

            formItem.setAttribute("id", this.num + 1);
            formItem.classList.add("form-item");
            formItem.innerHTML =
                `
            <div class="and">И</div>
            <div class="condition">
                <span>Условие ${this.num + 1}</span>
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
                <i class="fas fa-trash-alt"></i> <span>Удалить условие</span> 
                </div>
            </div>
        `;
            form.append(formItem);
            itemsNum++;

            function changeDecoration(){
                const formItems = document.querySelectorAll(".form-item");
                formItems.forEach((item, i) => {
                    const id = item.getAttribute("id");
                    if(id == 1){
                        item.querySelector(".and").style.display = "none";
                    } 

                    if(id%2){
                        item.classList.remove("blue");
                        item.classList.add("pink");
                    } else {
                        item.classList.remove("pink");
                        item.classList.add("blue");
                    }
                });
            }
            changeDecoration();

            const addBtn = formItem.querySelector(".add-btn");
            const delBtn = formItem.querySelector(".del-btn");
            const select = formItem.querySelector('select');

            delBtn.addEventListener("click", () => {
                formItem.remove();
                itemsNum--;
                rangeNum = 0;
                setNum(".form-item", ".condition span");
                changeDecoration();
            });

            select.addEventListener("change", () => {
                const rangeWrap = formItem.querySelector('.range-wrapper');
                rangeWrap.innerHTML = "";
                rangeNum = 0;
                if (select.value == "age") {
                    createRange();
                    addBtn.removeEventListener("click", createType);
                    addBtn.removeEventListener("click", createStatus);
                    addBtn.addEventListener("click", createRange);
                }
                else if (select.value == "type") {
                    createType();
                    addBtn.removeEventListener("click", createRange);
                    addBtn.removeEventListener("click", createStatus);
                    addBtn.addEventListener("click", createType);
                }
                else if (select.value == "status") {
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
                constructor(rangeNum, condition, inner) {
                    this.rangeNum = rangeNum;
                    this.condition = condition;
                    this.inner = inner;
                }
                render() {
                    const btn = formItem.querySelector("button");
                    btn.classList.remove("hide");
                    btn.innerHTML = `<i class="fas fa-plus"></i> Добавить ${this.condition.toLowerCase()}`;

                    const rangeWrap = formItem.querySelector(".range-wrapper");
                    const range = document.createElement("div");
                    range.classList.add("range");
                    range.setAttribute("id", this.rangeNum + 1);
                    if (rangeNum > 0) {
                        range.innerHTML =
                            `   
                        <div class="range-title">
                            <span><span class="or">или</span> ${this.condition} ${this.rangeNum + 1}</span>
                        </div>
                        <div class="inputs">${this.inner}</div>
                    `;
                    } else {
                        range.innerHTML =
                            `
                        <div class="range-title">
                            <span> ${this.condition} ${this.rangeNum + 1}</span>
                        </div>
                        <div class="inputs">${this.inner}</div>
                    `;
                    }
                    rangeWrap.append(range);
                    rangeNum++;
                }
            }

            function createRange() {
                new Range(rangeNum, 'Диапазон', range).render();
            }
            function createType() {
                new Range(rangeNum, 'Тип', type).render();
            }
            function createStatus() {
                new Range(rangeNum, 'Статус', activStatus).render();
            }
        }
    }

    function setNum(parentSelector, selector) {
        let items = document.querySelectorAll(parentSelector);
        items.forEach((item, i) => {
            item.setAttribute("id", i + 1);
            let cond = item.querySelector(selector);
            cond.innerText = `Условие ${i + 1}`;
        });
    }

    new Condition(itemsNum).render();
    push.addEventListener("click", () => {
        setNum(".form-item", ".condition span");
        new Condition(itemsNum).render();
    });
}