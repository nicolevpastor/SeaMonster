
import GAMES_DATA from './games.js';


// creating a list of objects to store the data using json
const GAMES_JSON = JSON.parse(GAMES_DATA)

//MY CODE FOR NAVIGATION BAR
const highlightMenu = () => {
  const elem = document.querySelector('.highlight');
  const homeMenu = document.querySelector('#home-page');
  const aboutMenu = document.querySelector('#about-page');
  const gamesMenu = document.querySelector('#games-page');
  let scrollPos = window.scrollY;


  if (scrollPos < 600) {
    homeMenu.classList.add('highlight');
    aboutMenu.classList.remove('highlight');
    return;
  } else if (scrollPos < 1600) {
    aboutMenu.classList.add('highlight');
    homeMenu.classList.remove('highlight');
    gamesMenu.classList.remove('highlight');
    return;
  } else if (scrollPos < 2345) {
    gamesMenu.classList.add('highlight');
    aboutMenu.classList.remove('highlight');
    return;
  }

  if ((elem && scrollPos < 600) || elem) {
    elem.classList.remove('highlight');
  }
};

window.addEventListener('scroll', highlightMenu);
window.addEventListener('click', highlightMenu);

//SEARCHING MY CODE
function search_game() {
    let query = document.getElementById("searchInput").value.trim().toLowerCase();
    let searchGames = GAMES_JSON.find(game => game.name.toLowerCase().includes(query)); 
    if (searchGames) {
        // Creating a pop-up with the game's details
        alert(`
        🎮 Game: ${searchGames.name}
        🏆 Description: ${searchGames.description}
        🎮 Backers: ${searchGames.backers}
        `);
    } else {
        alert(`No game found "${query}". Please try again!`);
    }
}

// Event Listener
document.querySelector(".search-button").addEventListener("click", search_game);

document.getElementById("searchInput").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        search_game(); 
    }
});


// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*
Adding data about each game as a card to the games-container
*/

// grab the element with id games-container
const gamesContainer = document.getElementById("games-container");

// adds all data from the games array to the page
function addGamesToPage(games) {


    //adding for LOOP
    for (let i = 0; i< games.length; i++){
        const game = games[i];
        const gameCard = document.createElement("div");
        gameCard.classList.add("game-card");
        //inner html because we need to layout the structure
        gameCard.innerHTML = `
        <img src="${game.img}" alt="${game.name}" class="game-img" /> 
        <h3>${game.name}</h3> 
        <p>${game.description}</p> 
        
         <p class = "label">Backers: ${game.backers.toLocaleString()}</p> `; 


         gamesContainer.appendChild(gameCard);


    }

}

addGamesToPage(GAMES_JSON);

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions"); 

// reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce((acc, game) => acc + game.backers, 0);

contributionsCard.innerHTML = totalContributions.toLocaleString();

const raisedCard = document.getElementById("total-raised");

const totalRaised = GAMES_JSON.reduce((acc, game) => acc + game.pledged, 0)
raisedCard.innerHTML = `$${totalRaised.toLocaleString()}`;// money dollar sign 


const gamesCard = document.getElementById("num-games");
const totalGame = GAMES_JSON.length;
gamesCard.innerHTML = totalGame.toLocaleString();


// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // filter()-> list of games that have not yet met their goal
    const failedGames = GAMES_JSON.filter(game=> game.pledged < game.goal); //less than goal, the < represents that


    console.log("Unfunded games- ", failedGames);
    addGamesToPage(failedGames);
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    //  filter() -> list of games that have met or exceeded their goal
    const addunfunGame = GAMES_JSON.filter(game=> game.pledged >= game.goal);


    //  add unfunded games to the DOM
    console.log("Funded Games:", addunfunGame);
    addGamesToPage(addunfunGame);

}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
//given to use addgamestopage
    addGamesToPage(GAMES_JSON);
}

const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);


// grab the description container
const descriptionContainer = document.getElementById("description-container");

// count the number of unfunded games

const totalDisplay = GAMES_JSON.reduce((acc, game) => acc + game.pledged, 0);


const totalGames = GAMES_JSON.length;

const unfundCt= GAMES_JSON.filter(game => game.pledged < game.goal).length;

// creating a string that explains the number of unfunded games using the ternary operator
const companyMsg = `
A total of $${totalDisplay.toLocaleString()} has been raised for ${totalGames} games. 
Currently, ${unfundCt} game${unfundCt === 1 ? '' : 's'} remain unfunded.
We need your help to fund these amazing games!`;


console.log("Company message: ", companyMsg);
const paragraph = document.createElement("p"); 

paragraph.innerHTML = companyMsg;
 // Append  description container 
 descriptionContainer.appendChild(paragraph);


const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");
//first element is most funded given

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});
// use destructuring and the spread operator to grab the first and second games
const [bigGame, runnerUp] = sortedGames;
const bigGameElement = document.createElement("p"); 

bigGameElement.innerHTML = `🏆 ${bigGame.name}`; 
firstGameContainer.appendChild(bigGameElement); 

const runnerUpElement = document.createElement("p"); 
runnerUpElement.innerHTML = `🥈 ${runnerUp.name}`; 
secondGameContainer.appendChild(runnerUpElement);