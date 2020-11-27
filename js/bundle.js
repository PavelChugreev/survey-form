/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/create-form.js":
/*!***********************************!*\
  !*** ./js/modules/create-form.js ***!
  \***********************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ createForm
/* harmony export */ });
function createForm() {
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
                setNum(".form-item", ".condition span");
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
                            <span>или ${this.condition} ${this.rangeNum + 1}</span>
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

/***/ }),

/***/ "./js/modules/post.js":
/*!****************************!*\
  !*** ./js/modules/post.js ***!
  \****************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ post
/* harmony export */ });
//before posting init json-server (data-base.json) 
function post() {
    let data = {};

    function createData() {
        let items = document.querySelectorAll(".form-item");

        items.forEach((item, i) => {
            let inpsFrom = item.querySelectorAll("input[name='from']");
            let inpsTo = item.querySelectorAll("input[name='to']");
            let selectsType = item.querySelectorAll("#type");
            let selectsStatus = item.querySelectorAll("#status");

            data[`formItem-${i + 1}`] = {};

            function setValue(arr, key, id) {
                arr.forEach((item, i) => data[`${id}`][`${key}-${i + 1}`] = item.value);
            }
            setValue(inpsFrom, "from", `formItem-${i + 1}`);
            setValue(inpsTo, 'to', `formItem-${i + 1}`);
            setValue(selectsType, "type", `formItem-${i + 1}`);
            setValue(selectsStatus, 'status', `formItem-${i + 1}`);
        });
    }

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: data
        });
        return await res.json();
    };

    const nextBtn = document.querySelector(".next-btn button");
    const testBtn = document.querySelector(".test-btn button");
    nextBtn.addEventListener("click", () => createData());

    testBtn.addEventListener("click", (e) => {
        e.preventDefault();

        createData();
        const json = JSON.stringify(data);

        postData("http://localhost:3000/requests", json)
            .then(data => {
                console.log(data);
            }).catch(() => {
                console.log("error");
            }).finally(() => {
                console.log("reset");
            });
    });
}

/***/ }),

/***/ "./js/script.js":
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_create_form__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/create-form */ "./js/modules/create-form.js");
/* harmony import */ var _modules_post__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/post */ "./js/modules/post.js");



window.addEventListener("DOMContentLoaded", () => {
    (0,_modules_create_form__WEBPACK_IMPORTED_MODULE_0__.default)();
    (0,_modules_post__WEBPACK_IMPORTED_MODULE_1__.default)();
});

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./js/script.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=bundle.js.map