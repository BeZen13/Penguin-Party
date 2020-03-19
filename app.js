const readline = require('readline-sync')

let isAlive = true;
let hasWon = false;


console.log(`
                       !!! WELCOME TO THE PENGUIN PARTY !!!!   

                                        *,,@@@@@&                               
                                      /,*@@@@@@@@@                              
                                    **#(&@@@@@@@&@@,                            
                                 #   ..,,/#@&*     @@&                          
                               #  ..,,,,**/(#%@                                 
                              &,.....,.,,,*/(%(@                                
                            @&%.......,,*///(((@@                               
                          &**/&,..,.,,***//(/(#@@@                              
                        @***//...,,,,,***///((#&&/@                             
                       ****/  ....,,,,,****/((((&#(@                            
                      ****/   .,.,,,,,,*****/(((@&(/*                           
                     .**//    ...,,,,,*****///(( &#//                           
                      &&@     ...,,,,,,*****//(# @(//                           
                       @%     .,,,,,,,,***////(* @@@(                           
                              ,,,,,,,,,***////(                                 
                              .,***//((((////(                                  
                              */(@        @((#                                  
                            *@%&&&       #@@@@                                  
                          &(&%@@         %#@&@@#                                
                          /                 /&  .     
                          
                    Where all your Penguin Desires are Met!      
`)

const penguinName = readline.question('What is your Penguins Name? ')

//Penguin...
function Penguin(name, hp, ap){
    this.name = name;
    this.hp = hp;
    this.ap = ap
    this.inventory = ['icicle']
}
const penguin = new Penguin(penguinName, 100, 30)

//predators
function Predator(name, hp, ap){
    this.name = name;
    this.hp = hp;
    this.ap = ap;
}

const sealion = new Predator('Sea Lion', 40, 20);
const poacher = new Predator('Poacher', 100, 500);
const polarbear = new Predator('Polar Bear', 300, 10)

const predators = [sealion, poacher, polarbear]

console.log("Upon a barren wasteland of Ice and Snow you stumble out into waking existence.")
console.log("You are but a tiny spec of black in this white winter desert! You hear the wind rumble as you recognize the futility of your existence")
console.log("You will either survive or perish. The perril that awaits you is near, and the forboding elements are a constant reminder!\n") 


while(isAlive && !hasWon){
    const action = readline.keyIn('Would you like to waddle [w], print inventory [p], or quit[q]? ', { limit: 'wqp' })
        if(action === 'w'){
            waddle()
        }else if(action === 'p'){
            console.log(`You have ${penguin.inventory} `)
        }else {
            isAlive = false
            console.log('You just quit')
        }
}

function waddle(){
    let random = Math.random()
    if(random <= .25){
        predatorEncounter()
    }else{
        console.log('You did not encounter a predator, keep waddling ')
    }
}

function predatorEncounter(){
    let predator = predatorSelect()
    console.log(`You've encountered a ${predator.name}`)
    let action = readline.keyIn('Would you like to fight[f], or play Dead[d] ', { limit: 'fd' })
    if(action === 'd'){
        if(Math.random > .5){
            playDead()
        }else{
            console.log(`The ${predator.name} does not believe you.`)
            fight(predator)
        }
    }else{
        fight(predator)
    }
}

function SkinLion(){
    console.log("You now have the ability to skin the Sea Lion.")
    const actionseal = readline.keyIn('Would you like to skin the Sea Lion? y or n ? ', { limit: 'yn' })
        if(actionseal === 'y'){
            console.log("You begin to skin the Sea Lion. The smell is strong, but you notice there is a lot of use for this animal.")
            const equipseal = readline.keyIn('Would you like to equip the skin and be warmer? y or n? ', { limit: 'yn' })
                if(equipseal === 'y'){
                    penguin.hp = penguin.hp + 10;
                    console.log(`You gained some health from the Sea Lion Skin! Your new HP is ${penguin.hp}`)
                }else{
                    console.log('You have decided to pass up a great opportunity to utilize the warmth of a skin!')
                    
                }
        }
        
}

function SkinBear(){
    console.log("You now have the ability to skin the Polar Bear")
    const actionbear = readline.keyIn(`Would you like to skin the Polar Bear? y or n? `, { limit: 'yn' })
        if(actionbear === 'y'){
            console.log("You begin to skin the Polar Bear. The smell is strong but you notice there is a lot ofuse for this amimal!")
            const equipbear = readline.keyIn('Would you like to equip the skin and be warmer? y or n?', { limit: 'yn' })
            if(equipbear === 'y'){
                penguin.hp = penguin.hp + 50;
                console.log(`You gained some health from the Sea Lion Skin! Your new HP is ${penguin.hp}`)
            }
            else{
            console.log('You have decided to pass up a great opportunity to utilize the warmth of a skin!')
            }
        }
}

function SkinPoacher(){
    console.log("You now have the ability to skin the Poacher.")
    const actionpoacher = readline.keyIn('Would you like to skin the Poacher? y or n ? ', { limit: 'yn' })
        if(actionpoacher === 'y'){
            console.log("You begin to skin the Poacher. The smell is strong, but you notice there is a lot of use for this animal.")
            const equippoacher = readline.keyIn('Would you like to equip the skin and be warmer? y or n? ', { limit: 'yn' })
                if(equippoacher === 'y'){
                    penguin.hp = penguin.hp + 100;
                    console.log(`You gained some health from the Poacher Skin! Your new HP is ${penguin.hp}`)
                }else{
                    console.log('You have decided to pass up a great opportunity to utilize the warmth of a skin!')
                    
                }
        }
}




function predatorSelect(){
    let random = Math.floor(Math.random()*predators.length)
    return predators[random]
}

function fight(predator){
    while(penguin.hp > 0 && predator.hp > 0){
        let penguinAttack = Math.floor(Math.random()*penguin.ap)
        let predatorAttack = Math.floor(Math.random()*predator.ap)
        predator.hp -= penguinAttack
        penguin.hp -= predatorAttack
        console.log(`
        ${penguin.name} was hit by ${predator.name}. Their hp is now ${penguin.hp}
        ${predator.name} was hit by ${penguin.name}. Their hp os now ${predator.name}
        `)
    
    if(penguin.hp > 0){
        console.log(`Congratulations ${penguin.name}, you defeated ${predator.name}`)
        if(`${predator.name} === 'Sea Lion'`){
            SkinLion()
        }
        else if(`${predator.name} === 'Polar Bear'`){
            SkinBear()
        }
        else if(`${predator.name} === 'Poacher'`){
            SkinPoacher()
        }
    }}
}    
        let index = predators.findIndex((myPredator) => { myPredator.name === predator.name })
        predators.splice(index, 1)
        if(predators.length === 0){
            hasWon = true;
            console.log(`
                        Congratulations! You've Won!
                                                                           
                     &&                 
                     #%&@               
                     %#%&&@             
                     ###%&&%            
       @&&&&&&%(     ###%&&&%#          
      &&%%*###%%&&# &###%%&&&(          
      %&@&*@((((##%&&%#%%&&&&           
      @%%@,@&  @((##%&&%&&&&&           
       %&%*       @(##%&&&&&&           
        @%%#@       ,(#%&&&&&%          
          @&%#@       &##%&&&&          
            &&%&        (#%&&&&         
           @&&%&         ##%&&%@        
&&@       @&&%#@         @##%&&&@       
.%%&&%@  %&&%##*          (##%&&%       
  &(#%%&%&&&%#(           %##%%&%&      
     @#%%%&&%#%           @(#%&&%&&     
        @@ &%#@           @(#%%@%&&@    
           &%(,           @##@%%%%&&%@  
          *&%#            #######%%&&&  
          &%%(   .........(######%%&&&* 
          @&%#............####(##%%&&&  
          @&%#/....,,,,,,,%####@#%&@%,, 
          /&%##(.,,,,,,,,,%%%%,,,,,,,#,,
           %&%##%,,,******@%&,,,.,.,@   
            &&%%##%,**@&@ @*,/@         
             @&&&@@%&                   
              *,&,,,,                   
            &,*,,,,,,                   
            `)
        }
        
    
    else{
        isAlive = false
        console.log(`
              GAME OVER!               
            @@@@@@@@@@@@@             
          @@@@@@@@@@@@@@@@@           
          @@@@@@@@@@@@@@@@@#          
          @@@    @@@    @@@           
           @@   @@ @@   @@            
           @@@@@@ @ @@@@@@            
             @ @@@@@@@ @,             
  @@@@       @@       @@       @@@@   
@@@@@@@@@      @@@@@@@@@      @@@@@@@@@
@@@@@@@@@@@@@             @@@@@@@@@@@@@
        @@@@@@@@@   @@@@@@@@@         
              @@@@@@@@@               
       @@@@@@@@@@   @@@@@@@@@&        
@@@@@@@@@@@@,             (@@@@@@@@@@@@
*@@@@@@@@                     @@@@@@@@ 
  @@@@                         @@@@   

        `)
}



function playDead(){
    console.log("You've successfully thwarted your Predator, They believe you're dead! ")
}