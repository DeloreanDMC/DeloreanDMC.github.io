'use strict'

let game;       // Сама игра
let table;      // Игровое поле
let mainMenu;   // Главное меню
let startButton;// Кнопка начала игры
let timer;      // Таймер
let points;     // Кол-во очков в раунде 
let pointsText; // Отображение очков
let burgerUrl = "https://www.stickers-factory.com/media/catalog/product/cache/1/image/363x/040ec09b1e35df139433887a97daa66f/0/6/06970_00.png";
let foodList=[];// Порядок элементов
let record=0;   // Рекордное кол-во очков

// Подготовка данных перед началом игры
function init() {
    game = document.getElementById("Game");
    table = createTable();
    mainMenu = createMainMenu();
    timer = createElement('div','timer','15');
    pointsText = document.getElementById('Points');
    drawElem(mainMenu);
}

// Убирает элемент из DOM дерева
function hiddenElem(elemHTML) {
    elemHTML.remove();
}

// Добавляет элемент в DOM дерево
function drawElem(elemHTML) {
    game.appendChild(elemHTML);
}

// Функция создания элементов
function createElement(str,className=str,content) {
    let elem = document.createElement(str); 
    if (className) elem.className=className; 
    if (content) elem.innerHTML=content;
    return elem;
}

// Счетчик
function timerTick() {
    setTimeout(() => {
        let time = +timer.innerHTML;
        timer.innerHTML = (time-1)+'';
        if (time>0) {
            time--;
            setTimeout(timerTick,0);
        }else{
            if (time==0)
                endGame('Время вышло!');
        }
    }, 1000);
}

// Создание главного меню
function createMainMenu() {
    let result = createElement('div',undefined);
    startButton = createElement('button','btn-menu','Начать');
    let burger = createElement('img',undefined);

    burger.style.marginLeft='18px';
    burger.src=burgerUrl;
   
    result.appendChild(burger);
    result.appendChild(startButton);
    startButton.onclick=()=>startGame();

    return result;
}

// Cоздание таблицы
function createTable() {
    let table = createElement('table');
    for(let i of [0,1,2]) {
        let tr = createElement('tr');
        for(let j of [1,2,3]) {
            let td = createElement('td');    
            td.innerHTML= '  ';
            tr.appendChild(td);
        }    
        table.appendChild(tr);
    }
    return table;
}

// Получение элемента таблица по индексам
function tabeElem(i,j) {
    return table.children[i].children[j];
}

// Случайное число от min до (max+1)
function rand(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

// Отображение заработанных очков
function showRecord() {
    if (+(pointsText.innerHTML)>record) record=+pointsText.innerHTML;
    pointsText.innerHTML="Заработано: "+pointsText.innerHTML+"\n Рекорд: "+record;
    pointsText.classList.add('records');
    pointsText.style.color="#FFD700";
    pointsText.style.left="55px";
    pointsText.style.top="200px";
}

// Сбросить отображение очков
function resetRecord() {
    pointsText.innerHTML='0';
    pointsText.style.color="#641212";
    pointsText.style.left="175px";
    pointsText.style.top=null;
    pointsText.style.bottom="100px";
}

// Конец игры
function endGame(state) {
    timer.innerHTML="-3";
    alert(state); 
    timer.remove();
    table.remove();
    showRecord();
    drawElem(startButton);
}

// Инициализация уровня
function initRound(level) {

    let indexes=[];
    // Кладем в массив индексы матрицы
    for(let i=0;i<=2;++i)
        for(let j=0;j<=2;++j) {
            indexes.push({i:i,j:j});
        }

    // Если уровень больше девятого - не увеличивать кол-во элементов
    if (level>9) level=9;
    
    for(let lev=0;lev<level;++lev) {
        let ind = rand(0,indexes.length-1);// Рандомно получаем индекс массива
        let s = indexes[ind];   // Достаем из него координаты матрицы
        foodList.push(lev+1);   
        let el = tabeElem(s.i,s.j); // Получаем html объект (ячейку таблицы)
        el.innerHTML=lev+1+"";      
        el.onclick=()=>{ 
            if(+el.innerHTML!=foodList[0]) { // Если ошиблись
                endGame('Проиграл!');
            } else {
                foodList.shift();
                el.innerHTML="";
                el.classList.remove("click");
                el.onclick=null;
                if (foodList.length==0) {
                    nextRound(level);
                }
            }
        };
        el.classList.add("click");
        indexes = indexes.filter((_el,i)=>i!=ind);
    }
}

// Очистка содержимого таблицы
function clearTable() {
    for(let i=0;i<=2;++i) {
        for(let j=0;j<=2;++j) { 
            tabeElem(i,j).innerHTML="";
            tabeElem(i,j).classList.remove("click");
            tabeElem(i,j).onclick=null;
        }
    }   
}

// Начало нового уровня
function nextRound(level) {
    points+=level;                      // Добавляем очки
    pointsText.innerHTML=points+'';     // Обновляем представление
    pointsText.style.fontSize='60px';   // Давим на подсознание увеличиваем ненадолго размер 
    setTimeout(()=>pointsText.style.fontSize='45px',400);
    timer.innerHTML=(+timer.innerHTML+1+(level==9))+'';    // Увеличиваем кол-во времени на чуть-чуть 
    clearTable();
    initRound(level+1);
}

//Начало игры
function startGame() {
    clearTable();
    foodList=[];
    resetRecord();
    hiddenElem(startButton);
    hiddenElem(mainMenu);
    drawElem(timer);
    drawElem(table);
    timer.innerHTML="15";
    points=0;
    timerTick(); 
    initRound(3);
}
