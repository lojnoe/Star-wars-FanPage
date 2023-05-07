let solo, rey, chewie, jyn, boba, padme, beckett;
let charactersArr = [solo, rey, chewie, jyn, boba, padme, beckett];

let currentCategory = "characters";
let categories = ["characters", "spaceships", "locations", "droids"];

let index = 0;
let length = $('.category.active .cards .card').length;

let backgroundsCharacters = [
  "https://upsights.fra1.digitaloceanspaces.com/fwbmatch/starwars/star-wars-bg-01.jpg",
  "https://upsights.fra1.digitaloceanspaces.com/fwbmatch/starwars/star-wars-bg-02.jpg",
  "https://upsights.fra1.digitaloceanspaces.com/fwbmatch/starwars/star-wars-bg-03.jpg",
  "https://upsights.fra1.digitaloceanspaces.com/fwbmatch/starwars/star-wars-bg-06.jpg",
  "https://upsights.fra1.digitaloceanspaces.com/fwbmatch/starwars/star-wars-bg-04.jpg",
  "https://upsights.fra1.digitaloceanspaces.com/fwbmatch/starwars/star-wars-bg-07.jpg",
  "https://upsights.fra1.digitaloceanspaces.com/fwbmatch/starwars/star-wars-bg-05.jpg",
];

let backgroundsSpaceships = [
  "https://upsights.fra1.digitaloceanspaces.com/fwbmatch/starwars/spaceships-bg-01.jpg",
  "https://upsights.fra1.digitaloceanspaces.com/fwbmatch/starwars/spaceships-bg-02.jpg",
  "https://upsights.fra1.digitaloceanspaces.com/fwbmatch/starwars/spaceships-bg-03.jpg",
  "https://upsights.fra1.digitaloceanspaces.com/fwbmatch/starwars/spaceships-bg-04.jpg",
  "https://upsights.fra1.digitaloceanspaces.com/fwbmatch/starwars/spaceships-bg-05.jpg",
  "https://upsights.fra1.digitaloceanspaces.com/fwbmatch/starwars/spaceships-bg-06.jpg",
]

let backgroundsLocations = [
  "https://upsights.fra1.digitaloceanspaces.com/fwbmatch/starwars/locations-bg-01.jpg",
  "https://upsights.fra1.digitaloceanspaces.com/fwbmatch/starwars/locations-bg-02.jpg",
  "https://upsights.fra1.digitaloceanspaces.com/fwbmatch/starwars/locations-bg-03.jpg",
  "https://upsights.fra1.digitaloceanspaces.com/fwbmatch/starwars/locations-bg-04.jpg",
]

let backgroundsDroids = [
  "https://upsights.fra1.digitaloceanspaces.com/fwbmatch/starwars/droids-bg-01.jpg",
  "https://upsights.fra1.digitaloceanspaces.com/fwbmatch/starwars/droids-bg-02.jpg",
  "https://upsights.fra1.digitaloceanspaces.com/fwbmatch/starwars/droids-bg-03.jpg",
  "https://upsights.fra1.digitaloceanspaces.com/fwbmatch/starwars/droids-bg-04.jpg",
  "https://upsights.fra1.digitaloceanspaces.com/fwbmatch/starwars/droids-bg-05.jpg",
  "https://upsights.fra1.digitaloceanspaces.com/fwbmatch/starwars/droids-bg-06.jpg",
  "https://upsights.fra1.digitaloceanspaces.com/fwbmatch/starwars/droids-bg-07.jpg",
]

let backgrounds = [backgroundsCharacters, backgroundsSpaceships, backgroundsLocations, backgroundsDroids];

init();

function init() {
  startTyping(index);
  toggleCategory(currentCategory);
}

/*** Slide between cards */

$('.next').click(() => {
  stopTyping(index);
  if(index === length - 1)
    index = -1;

  if (index < length -1) {
    index++;
    $('.category.active .cards .card').removeClass('active');
    $('.category.active .cards .card').eq(index).addClass('active');
    startTyping(index);
    changeBackground(index);
  }
})

$('.previous').click(() => {
  stopTyping(index);
  if(index === 0)
    index = length;

  if(index > 0) {
    index--;
    $('.category.active .cards .card').removeClass('active');
    $('.category.active .cards .card').eq(index).addClass('active');
    startTyping(index);
    changeBackground(index);
  }
})

function changeBackground(index) {
  let i = categories.findIndex(x => x === currentCategory);
  document.body.style.backgroundImage = "url(" + backgrounds[i][index] + ")";
}

/**** Auto typing ***/

function startTyping(index) {

  if (currentCategory === "characters") {

    switch(index) {

      case 0:
        if(solo) { 
          solo.reset();
        }
        else {
          solo = new Typed('.p-solo', {
            strings: ["Han Solo was a human male smuggler. As captain of the Millennium Falcon, Han and his co-pilot Chewbacca came to believe in the cause of galactic freedom, joining Luke Skywalker and Princess Leia in the fight against the Empire.", "After the Battle of Endor, Han faced difficult times in a chaotic galaxy, leading to a shattering confrontation with his estranged son Ben."],
            typeSpeed: 30,
            backDelay: 2000,
          });
        }
        break;

      case 1:
        if(rey) { 
          rey.reset();
        }
        else {
          rey = new Typed('.p-rey', {
            strings: ["Seemingly abandoned by her parents on Jakku, Rey grew up a scavenger amid the wreckage of war. Her life changed when she agreed to help a droid on an urgent mission for the Resistance.", "Rey discovered she was powerful in the Force, and sought out the vanished Jedi Master Luke Skywalker to train her. That ended in disappointment, as did her attempt to bring Kylo Ren back to the light.", "But the resilient Rey continued her training and learned the truth about her parentage and her mysterious connection with Kylo.", "She then faced her greatest test: a confrontation with fear and evil that would determine the galaxy’s fate."],
            typeSpeed: 30,
            backDelay: 2000,
          });
        }
        break;

      case 2:
        if(chewie) {
          chewie.reset();
        }
        else {
          chewie = new Typed('.p-chewie', {
            strings: ["A legendary Wookiee warrior and Han Solo’s longtime co-pilot, Chewbacca continues to serve as faithful first mate to carry out daring missions against the First Order behind the controls of the Millennium Falcon.", "Known as Chewie to his closest friends, he was part of a core group of rebels who restored freedom to the galaxy during the reign of the Galactic Empire.", "Known for his short temper and accuracy with a bowcaster, Chewie also has a big heart and unwavering loyalty to his friends."],
            typeSpeed: 30,
            backDelay: 2000,
            smartBackspace: false,
          });
        }
        break;

        case 3:
          if(jyn) {
            jyn.reset();
          }
          else {
            jyn = new Typed('.p-jyn-erso', {
              strings: ["Putting behind a checkered past by lending her skills to a greater cause, Jyn Erso is impetuous, defiant, and eager to bring the battle to the Empire.",  "Used to operating alone, she finds higher purpose by taking on a desperate mission for the Rebel Alliance."],
              typeSpeed: 30,
              backDelay: 2000,
              smartBackspace: false,
            });
          }
          break;
        
      case 4:
        if(boba) {
          boba.reset();
        }
        else {
          boba = new Typed('.p-boba-fett', {
            strings: ["With his customized Mandalorian armor, deadly weaponry, and silent demeanor, Boba Fett was one of the most feared bounty hunters in the galaxy.", "A genetic clone of his “father,” bounty hunter Jango Fett, Boba learned combat and martial skills from a young age. Over the course of his career, which included contracts for the Empire and the criminal underworld, he became a legend.", "Boba was one of several bounty hunters recruited by Darth Vader to track down the Millennium Falcon after the Battle of Hoth, and was the only one to prove successful."],
            typeSpeed: 30,
            backDelay: 2000,
            smartBackspace: false,
          });
        }
        break;
      
      case 5:
        if(padme) {
          padme.reset();
        }
        else {
          padme = new Typed('.p-padme-amidala', {
            strings: ["Padmé Amidala was a courageous, hopeful leader, serving as Queen and then Senator of Naboo -- and was also handy with a blaster.", "Despite her ideals and all she did for the cause of peace, her secret, forbidden marriage to Jedi Anakin Skywalker would prove to have dire consequences for the galaxy."],
            typeSpeed: 30,
            backDelay: 2000,
            smartBackspace: false,
          });
        }
        break;

      case 6:
        if(beckett) {
          beckett.reset();
        }
        else {
          beckett = new Typed('.p-beckett', {
            strings: ["A native of Glee Anselm, Tobias Beckett is a professional thief who’s planned and carried out any number of heists with his crew. Beckett is always aware of the angles and uncertainties – and ready to unholster his blasters if something goes wrong.", "During the Kessel Run, it was Beckett who separated one single drop of fuel and carefully added it to in the fusion reactor, enabling the Millennium Falcon to break free from the powerful pull of a gravity well.", "Arriving safely on Savareen, Beckett encountered his old nemesis Enfys Nest. But this time, instead of a losing battle, the masked marauder revealed her true identity and tried to reason with the grizzled gunslinger."],
            typeSpeed: 30,
            backDelay: 2000,
            smartBackspace: false,
          });
        }
          break;  
      }
    }
}

function stopTyping(index) {
  let typer = charactersArr[index];
  if(typer) {
    typer.stop();
    typer.reset();
  }
}





/*** Navigation ***/

let nav = document.getElementById('main-nav');
let burger = document.getElementById('burger');
let burgericon = document.getElementById("burger-icon");
let characters = document.getElementById("btn-characters");
let creatures = document.getElementById("btn-creatures");
let droids = document.getElementById("btn-droids");
let locations = document.getElementById("btn-locations");
let spaceships = document.getElementById("btn-spaceships");
let weaponry = document.getElementById("btn-weaponry");

burger.addEventListener('click', toggleNavigation);

characters.addEventListener('click', () => {
  toggleNavigation();
  toggleCategory("characters");
});
droids.addEventListener('click', () => {
  toggleNavigation();
  toggleCategory("droids");
});
locations.addEventListener('click', () => {
  toggleNavigation();
  toggleCategory("locations");
});
spaceships.addEventListener('click', () => {
  toggleNavigation();
  toggleCategory("spaceships");
});


function toggleNavigation() {
  burgericon.classList.toggle('burger-is-open');
	nav.classList.toggle('is-open');
};

function toggleCategory(category) {
  
  let element = document.getElementById(category);

  if(element) {
    currentCategory = category;
    categories.map(removeActive);
    element.classList.add("active");

    index = 0;
    length = $('.category.active .cards .card').length;
    changeBackground(index);
    setFlyingObjects(category);
  } 
}

function removeActive(el) {
  let element = document.getElementById(el);
  if(element)
    element.classList.remove("active");
}


function setFlyingObjects(category) {

  let object1 = document.getElementById("flying-object-01");
  let object2 = document.getElementById("flying-object-02");

  switch(category) {

    case "characters":
      object1.src = "https://upsights.fra1.digitaloceanspaces.com/fwbmatch/starwars/cloud-01.png";
      object2.src = "https://upsights.fra1.digitaloceanspaces.com/fwbmatch/starwars/cloud-02.png";
      object1.className = 'cloud-01';
      object2.className = 'cloud-02';
      break;
    case "spaceships":
      object1.src = "https://upsights.fra1.digitaloceanspaces.com/fwbmatch/starwars/cloud-01.png"; 
      object2.src = "https://upsights.fra1.digitaloceanspaces.com/fwbmatch/starwars/cloud-02.png";
      object1.className = 'cloud-01';
      object2.className = 'cloud-02';      
      break;

  }

}




// Usage
// categories.map(toggleElementByID);
//
// or
//  categories.map(x => {
//    toggleElementByID(x);
//  });
function toggleElementByID(id) {
  let x = document.getElementById(id);
  if(x) {
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }
}

function toggleElementByTag(tag) {
  let x = document.getElementsByTagName(tag);
  //foreach????
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}