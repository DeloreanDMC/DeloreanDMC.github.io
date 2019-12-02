import { unlink } from "fs";
import { StringDecoder } from "string_decoder";
import { addListener } from "cluster";

var airconsole;
var paddles;
var ball;
var score = [0, 0];
var canvas;
var last = null;
var score_el;

/**
* Проверяет были ли два пользователя подключены
*/
function checkTwoPlayers() {
    var active_players = airconsole.getActivePlayerDeviceIds();
    var connected_controllers = airconsole.getControllerDeviceIds();
    // Обновляйте только если в игре нет активных игроков
    if (active_players.length == 0) {
        if (connected_controllers.length >= 2) {
            // Достаточно устройств, подключенных для запуска игры.
            // Установка первых 2 контроллеров для активных игроков.
            airconsole.setActivePlayers(2);
            resetBall(50, 0);
            score = [0, 0];
            score_el.innerHTML = score.join(":");
            document.getElementById("wait").innerHTML = "";
        } else if (connected_controllers.length == 1) {
            document.getElementById("wait").innerHTML = "Нужен еще 1 игрок!";
            resetBall(0, 0);
        } else if (connected_controllers.length == 0) {
            document.getElementById("wait").innerHTML = "Нужно еще 2 игрока!";
            resetBall(0, 0);
        }
    }
}
/**
* Настраивает связь с игровыми площадками
*/
function setupConsole() {
    // Создаем объект AirConsole и назначаем его переменной
    airconsole = new AirConsole();
    // Когда устойство подключилось и загрузило игру
    airconsole.onConnect = function(device_id) {
        checkTwoPlayers();// проверка подключено ли 2 игрока
    };
    /*
    * Когда устройство покинуло игру
    */
    airconsole.onDisconnect = function(device_id) {
        var player = airconsole.convertDeviceIdToPlayerNumber(device_id);
        if (player != undefined) {
            // Игрок, который был в игре, покинул игру.
            // Установка активных игроков на длину 0.
            airconsole.setActivePlayers(0);
        }
        checkTwoPlayers();
    };
    /**
    * Вызывается при получении сообщения от другого устройства,
    * которое вызвало message () или broadcast ()
    */
    airconsole.onMessage = function(device_id, data) {
        var player = airconsole.convertDeviceIdToPlayerNumber(device_id);
        if (player != undefined && data.move !== undefined) {
            paddles[player].move.y = data.move;
        }
    };
}


/**
* Отправляет сообщение на устройство, заставляя его вибрировать
*/
function vibrate(player) {
    airconsole.message(
    airconsole.convertPlayerNumberToDeviceId(player),
    { vibrate: 1000 })
}

/**
* Показывает, кто забил и обновляет счет впоследствии.
*/
function displayScore(player) {
    var name = airconsole.getNickname(
        airconsole.convertPlayerNumberToDeviceId(player));
    score_el.innerHTML = "<div style='font-size: 20px;margin-top:16px'>" +
                    name + " забил!</div>";
    window.setTimeout(function() {
        score_el.innerHTML = score.join(":");
    }, 1000);
}

/**
* body.onload function.
*/
function init() {
    setupConsole();
    // Настройка игры. Ничего особенного в AirConsole.
    canvas = document.getElementById("canvas");
    score_el = document.getElementById("score");
    paddles = [
        { pos: {x: 10, y: 50}, move: {x: 0, y: 0 },
        el: document.getElementById("player_1") },
        { pos: {x: 190, y: 53}, move: {x: 0, y: 0 },
        el: document.getElementById("player_2") } 
    ];
    ball = { pos: { x: 100, y: 50 }, move: {x: 0, y: 0 },
    el: document.getElementById("ball") };
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    window.onresize = (clearCanvas);
    last = new Date().getTime();
    loop();
}
/**
* Перемещение элемента. Ничего особенного в AirConsole.
* @param entity
*/
function updatePos(entity, delta) {
    entity.pos.x += entity.move.x*delta;
    entity.pos.y += entity.move.y*delta;
}

/**
* Перемещение мяча и рисование холста. Ничего особенного в AirConsole.
*/
function loop() {
    var now = new Date().getTime();
    var delta = (now - last);
    delta = Math.min(20, delta);
    delta /= 1000;
    last = now;
    draw(true);
    updatePos(paddles[0], delta);
    updatePos(paddles[1], delta);
    updatePos(ball, delta);
    // Предел ракетор
    paddles[0].pos.y = Math.min(Math.max(10, paddles[0].pos.y), 90);
    paddles[1].pos.y = Math.min(Math.max(10, paddles[1].pos.y), 90);
    // Отпрыгивание от стен
    if (ball.pos.y <= 1) {
        ball.pos.y = 1;
        ball.move.y *= -1;
        updatePos(ball, 0);
    }
    if (ball.pos.y >= 99) {
        ball.pos.y = 99;
        ball.move.y *= -1;
        updatePos(ball, 0);
    }
    // Отскок ракетки
    if (ball.pos.x >= paddles[0].pos.x - 2 &&
        ball.pos.x <= paddles[0].pos.x + 2 &&
        ball.pos.y >= paddles[0].pos.y - 10 &&
        ball.pos.y <= paddles[0].pos.y + 10) {
            ball.move.x *= -1;
            ball.move.y += (ball.pos.y - paddles[0].pos.y)*2;
            ball.pos.x = paddles[0].pos.x + 2;
    }
    if (ball.pos.x >= paddles[1].pos.x - 2 &&
        ball.pos.x <= paddles[1].pos.x + 2 &&
        ball.pos.y >= paddles[1].pos.y - 10 &&
        ball.pos.y <= paddles[1].pos.y + 10) {
            ball.move.x *= -1;
            ball.move.y += (ball.pos.y - paddles[1].pos.y)*2;
            ball.pos.x = paddles[1].pos.x - 2;
    }
    // Счет
    if (ball.pos.x >= 200) {
        score[0] += 1;
        displayScore(0);
        resetBall(-ball.move.x, ball.move.y/2);
        vibrate(1);
    }
    if (ball.pos.x <= 0) {
        score[1] += 1;
        displayScore(1);
        resetBall(-ball.move.x, ball.move.y/2);
        vibrate(0);
    }
        draw();
        requestAnimationFrame(loop);
}

/**
* Сброс мяча. Ничего особенного в игровой консоли.
* @param move_x
* @param move_y
*/
function resetBall(move_x, move_y) {
    clearCanvas();
    ball.pos.x = 100;
    ball.pos.y = 50;
    ball.move.x = move_x;
    ball.move.y = move_y;
}   

/**
* Изменение мяча. Ничего особенного в игровой консоли.
* @param move_x
* @param move_y
*/
function clearCanvas() {
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "black";
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    ctx.fillRect(0,0, canvas.width, canvas.height);
}
/**
* Рисование игровой сцены. Ничего особенного в игровой консоли.
* @param clear
*/
function draw(clear) {
    // Draw
    var ctx = canvas.getContext("2d");
    var zoom = canvas.clientHeight / 100;
    function c(x) {
        x *= zoom;
        return x | 0; // round
    }
    ctx.fillStyle = clear ? 'black' : 'white';
    ctx.fillRect(c(paddles[0].pos.x - 1),c(paddles[0].pos.y - 10),
            c(2), c(20));
    ctx.fillRect(c(paddles[1].pos.x - 1),c(paddles[1].pos.y - 10),
            c(2), c(20));
    ctx.beginPath();
    ctx.arc(c(ball.pos.x), c(ball.pos.y), c(clear ? 3 : 2), 0,
        2 * Math.PI, false);
    ctx.fill();
    ctx.closePath();
}