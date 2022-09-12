var News;
(function (News) {
    //DelayBetweenStories is in milliseconds
    News.DelayBetweenStories = 200;
    //Private function to add arrays of stories
    function AddStories(stories) {
        if (typeof stories != 'string') {
            for (var _i = 0, stories_1 = stories; _i < stories_1.length; _i++) {
                var story = stories_1[_i];
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
            "Studies show 100% of people do not have an obsesssion with toes. I don't understand why I needed to do this survey.",
            "I hate this job.",
            "Social media prankster dies after trying to drop a high concentration of Uranium-235 on a pedestrian.",
            "New car dealer \"Cadillac Kingdom\" to open!",
            "Fortnite: The Musical has been announced. It has sold one morbillion tickets in preorders.",
            "People cheer as world leaders finally outlaw ".concat(Choose([
                "ironic memes",
                "Fortnite",
                "Jambaju Gaming",
                "Diego's Teeth",
                "70 pound midgets",
                "🤓",
                "the phrase \"who asked\""
            ])),
            "Scientists discover that the maximum of anything in the world is 1e308, due to poor programming language choices when creating the simulation that is our world.",
            "Birds may not be real, but injuries are! Buy Jimmy Health Insurance today!",
            "Breaking News: undefined",
            "\"jkl;\" surpasses \"asdf\" in usage.",
            "Left handed people nearly half of population, apocolypse soon.",
            "This news story is so ".concat(Choose([
                "silly",
                "goofy aah",
                "dumb",
                "tasty"
            ]), ":"),
            "Kid dies of death: what happens next gave me depression.",
            "This news ticker is sponsored by NordVPN. You probably don't want people knowing you played this game. Get NordVPN today!",
        ]);
        //They've started accumulate some toes
        if (Game.Toes >= 1000) {
            AddStories([
                "Strange boy has weird obessision with toes, recruiting others into his cult following.",
                "Toes have been put on pizza. By Harry of course.",
                "New YouTube cooking channel called \"Cooking with Harry\" has come, teaches toe themed recipe.",
                "\"I don't get toes.\" says man in local insane asylum.",
                "Toe-loving outcasts slowing beig integrated back into society due to resurgance.",
                "Are toes healthy? \"Yes\" says Harry.",
                "So silly.",
                "Do toes taste like a berry? \"Yes\" says Harry.",
                "Scientists discover that 99.99% of people are deathly allergic to death. The other 0.01% are probably just sentinent toes.",
                "Harry has invented a new percussion instrument. It's just a giant toe.",
                "99.99% of people do not have an obsession with toes. I still don't understand why I have to do this survey."
            ]);
        }
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
    var ChosenStory = Choose(News.Stories);
    $('#news').append("\n    <p class = 'newsItem'>".concat(ChosenStory, "</p>\n    "));
    $('.newsItem').animate({
        'left': "".concat(0 - $('.newsItem').width(), "px")
    }, (window.innerWidth + $('.newsItem').width()) * 5, 'swing', function () {
        $('.newsItem').remove();
        news();
    });
}
News.UpdateStories();
news();
