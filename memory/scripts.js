// Helper shuffle function. Taken from 
function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
}
  
var cards = [
    {value: '2', image:'./images/diamonds_2.svg', matched: false},
    {value: '3', image:'./images/diamonds_3.svg', matched: false},
    {value: '4', image:'./images/diamonds_4.svg', matched: false},
    {value: '5', image:'./images/diamonds_5.svg', matched: false},
    {value: '6', image:'./images/diamonds_6.svg', matched: false},

    {value: '2', image:'./images/diamonds_2.svg', matched: false},
    {value: '3', image:'./images/diamonds_3.svg', matched: false},
    {value: '4', image:'./images/diamonds_4.svg', matched: false},
    {value: '5', image:'./images/diamonds_5.svg', matched: false},
    {value: '6', image:'./images/diamonds_6.svg', matched: false},
]

var cardEles = document.querySelectorAll('.card')
var firstGuess = null;
var canGuess = true;
var flippedCards = 0;
var guesses = 0;

shuffle(cards);

cardEles.forEach(function(ele, index){
    ele.addEventListener('click', function(){
        if(index == firstGuess || cards[index].matched || !canGuess){
            alert('invalid guess')
            return
        }
        
        var clickedCard = cards[index]
        ele.setAttribute('src', clickedCard.image)

        if(firstGuess == null){
            firstGuess = index
        }else{
            guesses++;
            document.querySelector('#guesses').textContent = guesses;

            if(cards[firstGuess].value == cards[index].value){
                cards[firstGuess].matched = true; 
                cards[index].matched = true;
                firstGuess = null;
                flippedCards += 2;

                if(flippedCards == cards.length){
                    reset()
                }

            }else{
                canGuess = false;

                setTimeout(() => {
                    cardEles[firstGuess].setAttribute('src', './images/abstract_clouds.svg')
                    cardEles[index].setAttribute('src', './images/abstract_clouds.svg')
                    firstGuess = null;
                    canGuess = true;
                }, 1500)
            }
        }
    })
})

function reset(){
    canGuess = false;

    setTimeout(() => {
        firstGuess = null;
        canGuess = true;
        flippedCards = 0;
        guesses = 0;
        document.querySelector('#guesses').textContent = guesses;
    
        cardEles.forEach(function (ele, index){
            ele.setAttribute('src', './images/abstract_clouds.svg')
        })

        cards.forEach(function(card, index){
            card.matched = false;
        })
    
        shuffle(cards)
    }, 2000);
}

document.querySelector('#reset').addEventListener('click', function(){
    reset()
})
