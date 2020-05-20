var mainMenu = `
    <div class="mainMenu">
        <div class="Sana"></div>
        <div class="menu">
            <div>
                <div class="sign-wrap-1">
                <span class="sign_word"><span class="gameName">КАБАНИДЗЕ</span></span>
            </div>
             <div>
                <div class="sign-wrap-1">
                <span class="sign_word"><span id="start">Начать игру</span></span>
            </div>
        <div>
       
       
    </div>
`;

var wellcome = `
    <div class="mainMenu">
    <div class="sign-wrap-1">
        <span class="sign_word">нажми сюда</span>
    </div>
    </div>
`;

var gameover = winner => `
    <div class="mainMenu">
    <div class="sign-wrap-1">
        <span class="sign_word" id="restart">${winner}</span>
    </div>
    </div>
`;

var happyBirth = `
    <div class="mainMenu">
    <div class="sign-wrap-1">
        <span class="sign_word">Саня! С днем варенья!</span>
        <span class="sign_word">(нажми еще)</span>
    </div>
    </div>
`;


function soundMenu() {
   var audio
   audio = new Audio('./menu.mp3'); // Создаём новый элемент Audio
   audio.muted = "muted";
   audio.autoplay = true;
   console.log(audio);
   audio.play().then(audio.muted=null);
}


function showMeinMenu() {
    $('body').empty();
    
    var el = $('body').append(mainMenu);
    el.off( "click" );
    setTimeout(function(){$(".Sana").css("transform","translate(0)");},0);
    setTimeout(function(){$(".menu").css("transform", "translateY(0)");},0);
    $("#start").click(()=>gamePlay())
}

function showHappyBirth() {
    soundMenu();
    $('body').empty();
    var el = $('body').append(happyBirth);
    el.off( "click" )
    el.click(showMeinMenu);
}

function showWelckome() {
    var el = $('body').append(wellcome);
    el.click(showHappyBirth);
}

$(document).ready(function(){
    showWelckome();

});


const game = `
    <div id="player1"></div>
    <div id="player2"></div>
`;


var intersect = function(a,b){
    return(
      (
        (
          ( a.x>=b.x && a.x<=b.x1 )||( a.x1>=b.x && a.x1<=b.x1  )
        ) && (
          ( a.y>=b.y && a.y<=b.y1 )||( a.y1>=b.y && a.y1<=b.y1 )
        )
      )||(
        (
          ( b.x>=a.x && b.x<=a.x1 )||( b.x1>=a.x && b.x1<=a.x1  )
        ) && (
          ( b.y>=a.y && b.y<=a.y1 )||( b.y1>=a.y && b.y1<=a.y1 )
        )
      )
    )||(
      (
        (
          ( a.x>=b.x && a.x<=b.x1 )||( a.x1>=b.x && a.x1<=b.x1  )
        ) && (
          ( b.y>=a.y && b.y<=a.y1 )||( b.y1>=a.y && b.y1<=a.y1 )
        )
      )||(
        (
          ( b.x>=a.x && b.x<=a.x1 )||( b.x1>=a.x && b.x1<=a.x1  )
        ) && (
          ( a.y>=b.y && a.y<=b.y1 )||( a.y1>=b.y && a.y1<=b.y1 )
        )
      )
    );
  }

var player1;
var p1 = {x:0,y:0};
var big1 = false;
var player2;
var big2 = false;
var p2 = {x:0,y:0};

function keycontroll(e) {
    const key = e.which;
    let size1 = !big1 ? 40 : 1;
    let size2 = !big2 ? 40 : 1;
    if (key == 32) {
        let newsize = big1 ? 40 : 100 + "px";
        player1.css('width',newsize);
        player1.css('height',newsize);
        if (!big1) {
            p1.y-=size1;
            p1.x-=size1;
            size1 = 1;
            setTimeout(()=>{
                big1 = false;
                player1.css('width',"40px");
            player1.css('height',"40px");},1000);
        } else {
            p1.y+=size1;
            p1.x+=size1;
            size1 = 40;
        }
        player1.css("transform",`translate(${p1.x}px,${p1.y}px)`)
        big1 = !big1;
    }

    if (key == 13 || key == 96) {
        let newsize = big2 ? 40 : 100 + "px";
        player2.css('width',newsize);
        player2.css('height',newsize);
        if (!big2) {
            p2.y-=size2;
            p2.x-=size2;
            size2 = 1;
            setTimeout(()=>{
                big2 = false;
                player2.css('width',"40px");
            player2.css('height',"40px");},1000);
        } else {
            p2.y+=size2;
            p2.x+=size2;
            size2 = 40;
        }
        player2.css("transform",`translate(${p2.x}px,${p2.y}px)`)
        big2 = !big2;
    }
 
    switch(key) {
        case 87: 
            p1.y-=size1;
            player1.css("transform",`translate(${p1.x}px,${p1.y}px)`)
        break;
        case 65: 
            p1.x-=size1;
            player1.css("transform",`translate(${p1.x}px,${p1.y}px)`)
        break;
        case 68: 
            p1.x+=size1;
            player1.css("transform",`translate(${p1.x}px,${p1.y}px)`)
        break;
        case 83: 
            p1.y+=size1;
            player1.css("transform",`translate(${p1.x}px,${p1.y}px)`)
        break;

        case 38: 
            p2.y-=size2;
            player2.css("transform",`translate(${p2.x}px,${p2.y}px)`)
        break;
        case 37: 
            p2.x-=size2;
            player2.css("transform",`translate(${p2.x}px,${p2.y}px)`)
        break;
        case 39: 
            p2.x+=size2;
            player2.css("transform",`translate(${p2.x}px,${p2.y}px)`)
        break;
        case 40: 
            p2.y+=size2;
            player2.css("transform",`translate(${p2.x}px,${p2.y}px)`)
        break;
    }

    let pointA = player1.offset();
    let a = {
        x: pointA.top,
        y: pointA.left
    };
    a.x1 = a.x + (big1 ? 100 : 40);
    a.y1 = a.y + (big1 ? 100 : 40);

    let pointB = player2.offset();
    let b = {
        x: pointB.top,
        y: pointB.left
    };
    console.log(b.x);
    b.x1 = b.x + (big2 ? 100 : 40);
    b.y1 = b.y + (big2 ? 100 : 40);

    console.log('a',a);
    console.log('b',b);

    if (intersect(a,b)) {
        if(big1==true && big2!=true) {
            showEnd('Победил рыжий')
        }

        if(big2==true && big1!=true) {
            showEnd('Победил синий')
        }
    }
}

function showEnd(winner) {
    $("body").empty();
    $("body").off('click');
    $('body').append(gameover(winner));
    $("#restart").click(()=>document.location.reload(true));
}


function gamePlay() {
    $('.mainMenu').empty();
    $("body").off('click');
    $(".mainMenu").append(game);
    player1 = $("#player1");
    player2 = $("#player2");
    $("body").keydown(keycontroll);
}