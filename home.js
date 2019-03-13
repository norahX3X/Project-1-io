//let player choses between play with computer or play with frind in his computer or play online!
//take players name
sessionStorage.removeItem('playWithComputer');
//console
function withAI(){

//take player1 name and bug 
sessionStorage.setItem('firstPlayerName','name from alart!')
sessionStorage.setItem('playWithComputer',true)
sessionStorage.getItem('secondPlayerBug')


//goToXO();


// const onPick = value => {
//   swal("Thanks for your rating!", `You rated us ${value}/3`, "success")
// }
 
// const MoodButton = ({ rating, onClick }) => (
//   '<button data-rating={rating} className="mood-btn"  onClick={() => onClick(rating)} />'
// )
 
// swal({
//   text: "How was your experience getting help with this issue?",
//   buttons: {
//     cancel: "NAH I will change the game ",
//   },
//   content: (
//    ' <div> <MoodButton  rating={1}  onClick={onPick} /><MoodButton  rating={2}  onClick={onPick}  /><MoodButton  rating={3}  onClick={onPick} /> </div>'
//   )
// })

// swal({
//     title: 'Multiple inputs',
//     content:
//       '<input id="swal-input1" class="swal2-input">' +
//       '<input id="swal-input2" class="swal2-input">',
//     preConfirm: function () {
//       return new Promise(function (resolve) {
//         resolve([
//           $('#swal-input1').val(),
//           $('#swal-input2').val()
//         ])
//       })
//     },
//     onOpen: function () {
//       $('#swal-input1').focus()
//     }
//   }).then(function (result) {
//     swal(JSON.stringify(result))
//   }).catch(swal.noop)

swal({
    title: "Teste",   
    text: "Test:",   
    type: "input",
    showCancelButton: true,   
    closeOnConfirm: false,   
    animation: "slide-from-top",   
    inputPlaceholder: "User" 
},
function(inputValue){
    if (inputValue === false) return false;      
    if (inputValue === "") {
        swal.showInputError("Error");     
        return false;
    }
    swal({
        title: "Teste",   
        text: "E-mail:",   
        type: "input",
        showCancelButton: true,   
        closeOnConfirm: false,   
        animation: "slide-from-top",   
        inputPlaceholder: "Digite seu e-mail" 
    },
    function(inputValue){
        if (inputValue === false) return false;      
        if (inputValue === "") {     
            swal.showInputError("E-mail error");     
            return false;
        }
        swal("Nice!", "You wrote: " + inputValue, "success"); 
    });
});
}

function withLocalFriend(){
    sessionStorage.setItem('playWithComputer',false)

    
    sessionStorage.setItem('firstPlayerName','name from alart!')
    sessionStorage.setItem('firstPlayerBug','')
    sessionStorage.setItem('secondPlayerName','')
    sessionStorage.setItem('secondPlayerBug','')

    //take 2 players names and bugs 
    goToXO()
}
function withOnlineFriend(){
    //coming soon :)
}
function start(){
    // get all players scores and names from database we use cookies for now we will switch to firebase someday :)

}
function goToXO(){
    window.location.href = "XOindex.html"
}