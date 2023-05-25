

var monTexte =`Hello
Comment va tu
*bien ->sibien
*super bien ->siSuperBien

===sibien===
Ma réponse si bien

===siSuperBien===
Ma réponse si super bien
*orange ->siOrange
*rouge
===siOrange===
Hello
`

//assigner à splited avec un liste 
// [
//     Hello, 
//     Comment va tu,
//     *bien,
//     *super bien
// ]
//à partir du texte
var splited = monTexte.split('\n')
console.log(splited);

//un exemple de boucle for
// for (let i = 0; i < array.length; i++) {
//     const element = array[i];
    
// }


//transformer *splited* en une liste de la forme
// var dic =[
//     {type:"paragraph", text:"Hello"},
//     {type:"paragraph", text:"Commment va tu"},
//     {type:"question", text:"bien", goTo:"sibien"},
//     {type:"question", text:"super bien"},
// ]

//HINT:
// var listeVide =[]
// listeVide.push({type:"placeholder", text:"placeholder"})
//HINT
var dic=[]

for (let i = 0; i < splited.length; i++) {
    const element = splited[i];
    if (element[0] =="*") {
        var questionText = element.split("->")[0]
        var questionTarget = element.split("->")[1]
        dic.push({type:"question", text:questionText, goTo:questionTarget})
    }else if(element[0]=="="){
        dic.push({type:"chapitre", text:element})
    }else{
        dic.push({type:"paragraph", text:element})
    }
    
}
console.log(dic);

// Parcourir la liste avec une
//  boucle for et afficher chaque élement dans la page

//les questions doivent lancer un message d'alert
//quand on clique dessus


// var dic =[
//     {type:"paragraph", text:"Hello"},
//     {type:"paragraph", text:"Commment va tu"},
//     {type:"question", text:"bien"},
//     {type:"question", text:"super bien"}
//     {type:"chapitre", text:"===sibien==="},
// ]

function createElementInPage(text,question){
    var newElement = document.createElement("p");
    newElement.innerHTML = text
    console.log(question)
    if (question) {
        var onClick= function () {
            //alert(question)
            var chapterStart = findChapter(dic,"==="+question+"===")
            console.log(chapterStart);
            reader(dic,chapterStart+1)
        }
        newElement.addEventListener("click",onClick  ) 
    }
    
    var targetArea = document.querySelector(".talking_area")
    targetArea.appendChild(newElement);
    console.log(newElement);
    console.log(targetArea);
}

var findChapter = function (dic, chapterName) {
    var chapterStartAtLine = null
    for (let i = 0; i < dic.length; i++) {
        const element = dic[i];
        if (element.text == chapterName) {
            chapterStartAtLine = i
        }
    }
    return chapterStartAtLine
}

var reader = function (dic, startLine) {
    var startAt =0;
    if (startLine) {
        startAt = startLine
    }

    for (let i = startAt; i < dic.length; i++) {
        const element = dic[i];
        if (element.type =="question") {
            console.log(element);
            createElementInPage(element.text, element.goTo);
        }else if(element.type =="chapitre"){
            break
        }else if(element.type =="paragraph"){
            createElementInPage(element.text)
        }
    } 
}
//reader(dic,0)

var startDialogue = function () {
    //alert("Un import")
    reader(dic,0)  
}

export {startDialogue}











//230515-0// ajouter la prise en compte des chapitre
//(la lecture s'arrete avant un nouveau chapitre)

//230515-1// intégrer la boucle dans une fonction avec comme pram
//d'entrée la liste (dic)

//230515-2//ajouter un second parametre permetant de démarer la lecture de n'importe ou
//230515-3//ajouter un dernier parametre permetant de 
//démarrer la lecture sur base du nom d'un chapitre