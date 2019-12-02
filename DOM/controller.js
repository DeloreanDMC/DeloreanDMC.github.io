 // Вибратация устройства
 navigator.vibrate = (navigator.vibrate ||
    navigator.webkitVibrate ||
    navigator.mozVibrate ||
    navigator.msVibrate);
var airconsole;
/**
* Устанавливает связь с экраном.
*/
function init() {
    airconsole = new AirConsole({"orientation": "portrait"});
    /*
    * Проверяет, является ли это устройство частью активной игры.
    */
    airconsole.onActivePlayersChange = function(player) {
        var div = document.getElementById("player_id");
        if (player !== undefined) {
            div.innerHTML =  (["Левый игрок", "Правый игрок"][player]);
        } else {
            div.innerHTML = "Эта игра для 2 игроков!";
        }
    };
    /*
    * Заставляет устройство вибрировать, если экран так приказал
    */
    airconsole.onMessage = function(from, data) {
        if (from == AirConsole.SCREEN && data.vibrate) {
            navigator.vibrate(data.vibrate);
            console.log("Vibrating: " + data.vibrate);
        }
    };
}
/**
* Говорит экрану переместить ракетку этого игрока.
* @param amount
*/
function move(amount) {
airconsole.message(AirConsole.SCREEN, {move: amount})
}