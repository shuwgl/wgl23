
// creer un objet avec la notation {}
var monObjet = {x:5,y:6};
console.log(monObjet);

// modifier les props d'un objet avec la notation .
monObjet.x = 1;
console.log(monObjet);

var forSide =5;
// creer une fonction nommée
function add(x){
    var result = x+1
    return result
}

var multiply = function (x) {
    return x*2
}

//chaine de character//

var monText = "hello - sunshine - il fait faim"
//séparer la fonction sur base du texte "-"
var splited = monText.split("-") 
// rechercher la chaine de car "faim" dans "mon texte"
var searched = monText.search("faim")
//renvoie la position de l'élement cherché, ou -1

//CONDITIONS
var isOk = (3 == 3);
var isNotOk = 3 != 3;
console.log(isNotOk);
function check (x) {
    return x<5
}
if ( 3<6 && 3<2){
    console.log("test if###########")
}

if ( monObjet.x >=8 ){
    console.log("test OR!!!!!!")
}else if(monObjet.x >=3){
    console.log("test if else!!!!!!")
}else{
    console.log("FALLBACK");
}

var array =[1,5,7,3,]


for (let i = 0; i < 55; i++) {
    const element = array[i];
    console.log(element);
    
}

var index =0
while(index<5){
    console.log(55);
    index++
}

var a =55

function check (x) {
    return x<5
}

//affiche une variable dans la console.
console.log(monText[0])

//console.log(multiply(5)  );

// on définit la fonction callack
var onClick = function (event) {
    console.log(event);
    alert("test")
}
//on récupère le button
var myButton =document.querySelector(".button");
//on lie les évenement entre eux
myButton.addEventListener("click", onClick);

//ajouter des élément programatiquement
var newELement = document.createElement("p")
newELement.innerHTML = "element ajouté"
console.log(newELement);
document.querySelector(".button").appendChild(newELement)


console.log(myButton);