
var wordsList = {
    hard: ['nor','sar','jar'],
    med: ['mediom'],
    easy: ['easy']
}
var currentWord=[];
var prevChar ,currentChar;
$("td").on('mousedown', function (event) {
    event.preventDefault();
    checkChart(event.target);
    $("td").on('mouseenter', function (event) {
        checkChart(event.target);
    });
});
$("body").on('mouseup', function (event) {
    checkWord();
    $("td").removeClass("selected");
    $("td").off('mouseenter');
});

function checkChart(chart){

    console.log(jQuery.inArray("selected",$(chart).attr('class')) )
    if (jQuery.inArray("selected",$(chart).attr('class'))==-1){
        $(chart).addClass("selected");
       currentWord.push(chart.id);
       currentChar=chart;
       console.log( currentChar.id)
    }
    else{
        console.log(chart.id +",;,l,'" )
        currentChar.removeClass("selected");
    }
}
function checkWord(){
//     if (!currSelection)    
//     return "";
    
// var txt = "";    

// for(var o of wordsList.hard)
// {
//     if(currentWord== o){
//         match
//     }
// }

// return txt;

}
function win() {
//    showScene("Game");

}
function gotorealgame(){
    window.location.href = "home.html"

}