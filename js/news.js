var News;
(function (News) {
    //DelayBetweenStories is in milliseconds
    News.DelayBetweenStories = 200;
    //Private function to add arrays of stories
    function AddStories(stories) {
        if (typeof stories != 'string') {
            for (let story of stories) {
                News.Stories.push(story);
            }
        }
        else {
            News.Stories.push(stories);
        }
    }
    function UpdateStories() {
        News.Stories = [];
        //omg news in news ticker (this shows up when the player has a NOOB amount of toes)
        AddStories([
            "Florida man dies after trying to rocket jump in real life.",
            "Florida man attempts to backwards long jump in real life, in hospital now.",
            "\"It was just a prank bro.\" - social media influencer pleads innocent after hijacking a car and driving it into the local power plant.",
            "Elon Musk pulls out of Twitter deal, \"The clown makeup was horrible.\"",
            "New show to come out on Netflix titled \"The 🤓 Complex\"",
            "Spider monkeys found to be attracted to the 🤓.",
            "Canadian wizard under arrest for hacking James Charles' OnlyFans and seizing 6 terabytes of feet pictures.",
            "New internet trend leading teenagers to \"speedrun\" snorting crack, some of the fastest times ranging in single digit seconds.",
            "Kid gets bullied for giant pimple: what happens next made me giggle.",
            "Canadian wizard teleports bread: what happens next signed my eyeballs.",
            "New science-themed video Baby Quark surpasses Baby Shark in view count, world peace achieved.",
            "New documentary announced on Netflix: \"How an inside joke became an outside joke: The Story of Twerking\"",
            "I hate this job.",
            "Social media prankster dies after trying to drop a high concentration of Uranium-235 on a pedestrian.",
            "New car dealer \"Cadillac Kingdom\" to open!",
            "Fortnite: The Musical has been announced. It has sold one morbillion tickets in preorders.",
            `People cheer as world leaders finally outlaw ${Choose([
                "ironic memes",
                "Fortnite",
                "Jambaju Gaming",
                "Diego's Teeth",
                "70 pound midgets",
                "🤓",
                "the phrase \"who asked\""
            ])}`,
            "Scientists discover that the maximum of anything in the world is 1e308, due to poor programming language choices when creating the simulation that is our world.",
            "Birds may not be real, but injuries are! Buy Jimmy Health Insurance today!",
            "Breaking News: undefined",
            "\"jkl;\" surpasses \"asdf\" in usage.",
            "Left handed people nearly half of population, apocolypse soon.",
            `This news story is so ${Choose([
                "silly",
                "goofy aah",
                "dumb",
                "tasty"
            ])}:`,
            "Kid dies of death: what happens next gave me depression.",
            "This news ticker is sponsored by NordVPN. You probably don't want people knowing you played this game. Get NordVPN today!",
            "JoltStorm accused of starting illegal bakery teleporting bread, wanted in 37 countries.",
            "Florida man is now illegaly blind, wanted in 3 counties for running into 27 pedestrians while driving.",
            "Florida man has illegaly changed their name, now called \"I💩myself\"",
            "Crippled kid shunned for not standing up for the national anthem.",
            "maggot",
            "numbnuts",
            "My name is ˙å˙ß∂ƒ´¨∆. I am just like you, except I am dead. If you don't transfer Bitcoin to the following address, tonight, I will visit your house, and break your dishwasher.",
            "Achieve inner peace. Become English mailbox.",
            "I am on OKTOBERFEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEST",
            "You haven't lived until you've had German GFuel.",
            "I spent 100 days inside a car engine, what happens gave me lung cancer.",
            "\"Normal Flip\" on track to becoming the most popular song in the world.",
            "Spanish teacher under arrest for assaulting someone wearing headphones.",
            "Band director under arrest for recieving crack from his dentist.",
            "Harry Potter now canonically has erectile dysfunction.",
            "Teenager commits vehicular manslaughter, innocent verdict because he \"did it for the vine.\"",
            "\"I am not a tuba. I AM BETTER!\" - Euphoniums",
        ]);
        //They've started accumulate some toes
        if (Game.Stats.ToesEarned >= 1000) {
            AddStories([
                "Strange boy has weird obessision with toes, recruiting others into his cult following.",
                "Toes have been put on pizza. By Harry of course.",
                "New YouTube cooking channel called \"Cooking with Harry\" has come, teaches toe themed recipes.",
                "Toe-loving outcasts slowing beig integrated back into society due to resurgance.",
                "Are toes healthy? \"Yes\" says Harry.",
                "So silly.",
                "Do toes taste like a berry? \"Yes\" says Harry.",
                "Scientists discover that 99.99% of people are deathly allergic to death. The other 0.01% are probably just sentinent toes.",
                "Harry has invented a new percussion instrument. It's just a giant toe.",
                "Day 1: It would definetly be hard to survive in a car engine, and I had to immediately find a source of food. I wasn't able to find the food, but I used the oil as water, and if I ration there should be enough oil to last the entire 100 days.",
                "HowToBasic released a new video on how to properly prepare a toe, apparently people fell for it and some people have acid burns on their tounge.",
                "For some reason people like having 69 toes specifically.",
                "Toadally is investigating the fact that h is in the first letter of Harry's name. This can't be a coincidence.",
                "You have 10 toes too? #relatable",
                "Teenager burns down hospital, recieving death sentence because he \"did it for the TikTok.\"",
                "Alex Jones has been cancelled after saying that toes are controlled by the government.",
                "\"I don't like the chemicals they put in the water, that turn the toes into fingers!\" -Alex Jones",
                "I am outside your walls.",
                "Research shows that 99% of things on this news ticker are not news related at all.",
            ]);
        }
        if (Game.Stats.ToesEarned >= 10000) {
            AddStories([
                "This is a story all about how my life got turned flipped upside down, my fingers all got replaced with toes, and also I should mention that I lost my nose.",
                "Lil' Hey's new album topping the charts!",
                "Harry is on Oktoberfest.",
                "D6500 has put toes on khachapuri. It's kinda... good?",
                "Day 5: I've been eating metal since Day 3, and I've started to get used to the rusty taste. I've begun to think about making a base so I can focus on something other than the burning in my entire body from all the oil I've been drinking.",
                "\"I don't get toes.\" says man in local insane asylum.",
                "\"I'm basically just hoping the player understands all these references\" -Enckripted",
                "Jesse, screw making crack. We need to make toes.",
                "Florida man tries to backwards long jump again, broke all their bones after falling down a staircase.",
                "\"It's still just a prank bro, why you so mad?\" - social media influencer attempts to escape prison, by pouring poison in the guards food, using improvised explosives to blow a hole in the wall, and pouring boiling water on the warden's pants. He probably would have would have gotten away with it too, but he hijacked another car and drove into the power plant again.",
                "Jambaju Gaming thinks Bangarang by Skrillex has the words \"chapstick on my balls\", he's been cancelled and has lost all of his subscribers.",
                "Usain Bolt's toes are worth trillions of dollars. \"They're craved because they're so... muscular, and that probably makes them juicier.\" says a Durnen Boven, a local toe consumption expert.",
                "Cookbooks are coming out for the many uses for toes.",
                "Fingers are overrated.",
                //i'll finish this at somepoint: "Hello Internet, welcome to Game Theory, the show where you might want to refresh if you don't want to sit through this news ticker. In our last episode, we discussed how Five Night's at Freddy's is actually a first person shooter game, but today, we're not going to be talking about Five Night's at Freddy's. Today, we're going to be talking about how Harry is actually an NPC. Now, I know this sounds crazy, as he has helped us discover the magic of the toe, but hear me out. First of all, have you noticed th",
                "Harry is starting work on a new autobiography: \"How I Became Drippy\"",
                "The United States has amended the Constitution so people who have more than 10 fingers can be burned without a trial.",
            ]);
        }
        //10 million
        if (Game.Stats.ToesEarned >= 1e7) {
            AddStories([
                "A toe based economy is beginning to take shape.",
                "We've skipped Web3 and Web5 and gone to WebT. This is an internet based on toes.",
                "Feet pics are now being replaced by toe pics.",
                "Canadian wizard has turned James Charles' 6 terabytes of feet pics into toe pics, now has a private space station.",
                "D6500 has become rich off of his toe khachapuri.",
                "Day 12: Using this metal inside the car engine, I've created a home for myself. However, I ran out of car oil, and had to quit the challenge because my skin was beginning to turn orange. It was a sad day indeed.",
                "JoltStorm is still teleporting bread.",
                "The National Museum of Toes now exists.",
                "Florida man spun eternally. They're vomiting uncontrollably now.",
                "Is it possible to understand all the references in this news ticker? NO!",
            ]);
        }
        //1 billion
        if (Game.Stats.ToesEarned >= 1e9) {
            AddStories([
                "A machine has been created to measure toe value, allowing for a toe based economy to finally take shape.",
                "Harry <3 toes",
                "JoltStorm put toes in their bakery's bread, warrants for arrest removed.",
                "D6500 now lives in a mansion shaped like khachapuri.",
                "What does toe juice taste like? Consensus is a mix between cranberry juice and blackberries.",
                "Toe mines have been confirmed to not exist. \"Well I mean the... the cookie clickers have the cookie mines, and I don't, uh, think Enckripted is very original, so I thought I could mine out toes. But turns out he hadn't even bothered creating the underground, so I can now say that I have touched the void."
            ]);
        }
        if (Buildings.AllBuildings)
            if (Random(0, 10) == Random(0, 10)) {
                AddStories("This news story has a 1 in a 100 chance of showing up.");
            }
        if (Random(0, 100) == Random(0, 100)) {
            AddStories("This news story has a 1 in a 10,000 chance of showing up.");
        }
    }
    News.UpdateStories = UpdateStories;
})(News || (News = {}));
function news() {
    News.UpdateStories();
    let ChosenStory = Choose(News.Stories);
    $('#news').append(`
    <p class = 'newsItem'>${ChosenStory}</p>
    `);
    $('.newsItem').animate({
        'left': `${0 - $('.newsItem').width()}px`
    }, (window.innerWidth + $('.newsItem').width()) * 8, 'linear', function () {
        $('.newsItem').remove();
        news();
    });
}
news();
