var VERSION = 0.005;
var Game;
(function (Game) {
    Game.Toes = 0;
    Game.ToesPerClick = 1;
    Game.ToesPerSecond = 0;
    Game.ToesEarned = 0;
    Game.GameStart = Date.now();
    //Story chapter
    var StoryBeingDisplayed = false;
    var DisplayNextTimeout;
    var FINAL_STORY_ELEMENT = '(tap to continue)';
    function CreateStoryChapter(title, elements, onfinish) {
        if (StoryBeingDisplayed)
            return;
        StoryBeingDisplayed = true;
        $('#storyChapter').css('display', 'block');
        var ElementsIndex = 0;
        function DisplayNextElement() {
            //This is the final element to be added
            if (ElementsIndex == elements.length)
                elements.push(FINAL_STORY_ELEMENT);
            var text = elements[ElementsIndex];
            $('#storyChapter').append("\n            <p class = 'story-element new-story-element'>".concat(text, "</p>\n            "));
            $('.new-story-element').animate({
                "opacity": "1"
            }, 2000, "swing", function () {
                $(this).removeClass('new-story-element');
            });
            if (text == FINAL_STORY_ELEMENT) {
                $('.new-story-element').css('font-size', '2vh');
                $('.new-story-element').removeClass('new-story-element');
                return;
            }
            ElementsIndex++;
            DisplayNextTimeout = setTimeout(function () {
                DisplayNextElement();
            }, 2050); //Slight delay so it works on mobile devices
        }
        $('#storyChapter').on('click', function () {
            if ($('.new-story-element').length == 0) {
                //So the event doesn't fire again if this is another call to Game.CreateStoryChapter
                $('#storyChapter').off('click');
                $('#storyChapter').animate({
                    "opacity": "0"
                }, 1000, "swing", function () {
                    $(this).css('display', 'none');
                    $('.story-element').remove();
                    if (onfinish)
                        onfinish();
                });
                return;
            }
            $('.new-story-element').stop();
            $('.new-story-element').css('opacity', '1');
            $('.new-story-element').removeClass('new-story-element');
            clearTimeout(DisplayNextTimeout);
            DisplayNextElement();
        });
        $('.story-title').html(title);
        $('#storyChapter').animate({
            "opacity": "1"
        }, 1000, "swing", function () {
            DisplayNextElement();
        });
        StoryBeingDisplayed = false;
    }
    Game.CreateStoryChapter = CreateStoryChapter;
    //Alerts
    $('#ok').on('click', function () {
        $('#alert').css('display', 'none');
    });
    function CreateAlert(message) {
        $('#alert').css('display', 'block');
        $('#message').html(message);
    }
    Game.CreateAlert = CreateAlert;
    //Menus (slightly messy code but whatever)
    $('#closeMenu').on('click', function () {
        $(this).parent().detach().appendTo('#menus');
        $(this).detach().appendTo('#menus');
    });
    function OpenMenu(name) {
        //We need to check if another menu is open first
        //We can do this by checking if the close menu button is outside the #menus div
        if ($('#closeMenu').parent().attr('id') != 'menus') {
            //So from what I've heard it's more reliable to do this instead of just $('#closeMenu').click()
            $('#closeMenu')[0].click();
        }
        $("#".concat(name, "Menu")).detach().appendTo('#game');
        $('#closeMenu').detach().appendTo("#".concat(name, "Menu"));
    }
    Game.OpenMenu = OpenMenu;
    function Save() {
        var SaveData = {
            Version: VERSION,
            LastLogonTime: Date.now(),
            Toes: Game.Toes,
            ToesEarned: Game.ToesEarned,
            GameStart: Game.GameStart,
            CurrentUpgrades: Upgrades.CurrentUpgrades,
            BoughtUpgrades: Upgrades.UpgradePath,
            Buildings: []
        };
        //Go over all the buildings and put them in the array (we don't need to use string keys because we can always just switch stats for different buildings)
        for (var _i = 0, _a = Buildings.AllBuildings; _i < _a.length; _i++) {
            var building = _a[_i];
            SaveData.Buildings.push(building.Amount);
        }
        //This encodes to base64, we do this so if the user were to say paste their save in a google doc, the data would not change
        var SaveString = btoa(JSON.stringify(SaveData));
        localStorage.setItem('save', SaveString);
        return SaveString;
    }
    Game.Save = Save;
    function Load(save) {
        var fetchedSave;
        if (save) {
            fetchedSave = save;
        }
        else {
            fetchedSave = localStorage.getItem('save');
        }
        if (fetchedSave) {
            Game.Reset();
            var SaveData = void 0;
            try {
                //Convert to b64
                SaveData = JSON.parse(atob(localStorage.getItem('save')));
            }
            catch (error) {
                //We get here if they are using an older save (which is not in b64)
                SaveData = JSON.parse(localStorage.getItem('save'));
            }
            //Version updaters
            var ver = SaveData.Version;
            switch (ver) {
                case 0.001:
                    Upgrades.PossibleUpgrades = ['juc1'];
                case 0.002:
                    SaveData.LastLogonTime = Date.now();
                    SaveData.Buildings = [];
                case 0.003:
                    //whoopsie
                    if (SaveData.ToesEarned == NaN || SaveData.ToesEarned == undefined)
                        SaveData.ToesEarned = SaveData.Toes;
                case 0.004:
                    SaveData.GameStart = SaveData.LastLogonTime;
            }
            console.log(SaveData);
            Game.Toes = SaveData.Toes;
            Game.ToesEarned = SaveData.ToesEarned;
            Game.GameStart = SaveData.GameStart;
            //So Jucier Toes isn't in there by default
            if (SaveData.CurrentUpgrades.length > 0 || SaveData.BoughtUpgrades.length > 0) {
                Upgrades.PossibleUpgrades = [];
            }
            //Show all upgrades that need to be shown
            for (var _i = 0, _a = SaveData.CurrentUpgrades; _i < _a.length; _i++) {
                var id = _a[_i];
                Upgrades.ShowUpgrade(id);
            }
            //Follow the path to get all upgrades
            for (var _b = 0, _c = SaveData.BoughtUpgrades; _b < _c.length; _b++) {
                var id = _c[_b];
                //The item exists in the array
                if (Upgrades.PossibleUpgrades.indexOf(id) != -1) {
                    Upgrades.PossibleUpgrades.splice(Upgrades.PossibleUpgrades.indexOf(id), 1);
                }
                Upgrades.UpgradePath.push(id);
                Upgrades.AllUpgrades[id].Effect();
                //This is to compensate for any new branches that could have been added
                for (var _d = 0, _e = Upgrades.AllUpgrades[id].Unlocks; _d < _e.length; _d++) {
                    var possible = _e[_d];
                    if (Upgrades.AllUpgrades[id].Requires) {
                        var canUnlock = true;
                        for (var _f = 0, _g = Upgrades.AllUpgrades[id].Requires; _f < _g.length; _f++) {
                            var requiredId = _g[_f];
                            if (Upgrades.UpgradePath.indexOf(requiredId) == -1) {
                                canUnlock = false;
                                break;
                            }
                        }
                        if (!canUnlock)
                            continue;
                    }
                    //It's already in here, don't put it again
                    if (Upgrades.CurrentUpgrades.indexOf(id) > -1) {
                        continue;
                    }
                    Upgrades.PossibleUpgrades.push(possible);
                }
            }
            if (Upgrades.PossibleUpgrades.length == 0 && Upgrades.CurrentUpgrades.length == 0 && Upgrades.UpgradePath.length > 1) {
                $('#cannonInterrogation').css('display', 'none');
            }
            //Create all their buildings
            var i = 0;
            for (var _h = 0, _j = SaveData.Buildings; _h < _j.length; _h++) {
                var amount = _j[_h];
                var building = Buildings.AllBuildings[i];
                building.Amount = amount;
                $(document.getElementById("".concat(building.Name, ":amount"))).html(amount.toString());
                for (var n = 0; n < building.Amount; n++) {
                    building.Price *= building.PriceMult;
                }
                $(document.getElementById("".concat(building.Name, ":price"))).html("Price: ".concat(Beautify(Math.round(building.Price)), " toes"));
                i++;
            }
            Buildings.UpdateToesPerSecond();
            //Calculate offline earnings
            var earnings = Math.floor((Game.ToesPerSecond / 1000) * (Date.now() - SaveData.LastLogonTime));
            Game.Toes += earnings;
            Game.CreateAlert("While you were away, you gained ".concat(Beautify(earnings), " toes."));
        }
        //Inital lore
        if (Game.ToesEarned == 0) {
            Game.CreateStoryChapter("Prolouge", [
                "Harry always struck everyone as a bit odd.",
                "Maybe it was because of his moaning in class.",
                "Maybe it was because of his \"Devious ASF Walk\"",
                "Maybe it was because he dealt cough drops in the back alley after school.",
                "Or maybe it was his weird obsession with toes.",
                "Your friends dare you to try and go to Harry's house, in return for a hundred bucks.",
                "You decide to take the deal, not passing up some easy money.",
                "You walk over to Harry, and ask if you could come over to his house. Just for a bit, of course.",
                "He turns with a devious grin. \"Follow me.\" he says"
            ], function () {
                Game.CreateStoryChapter("Harry's Basement", [
                    "Without you even asking, Harry takes you to his house.",
                    "Blindfolded of course. You do look sussy after all.",
                    "When he takes off your blindfold, you find yourself in a dark room, that you can only assume is his basement.",
                    "\"This is my toe making basement.\" he says in an unusually deep voice. \"You should touch that machine over there.\"",
                    "You walk over to the machine to observe it more closely, while Harry moans in another corner of the room.",
                    "The machine is placed on a dark brown desk, with a giant white button hooked to a machine,",
                    "and a glass chamber on the other end.",
                    "With no other choice you decide to try the machine."
                ]);
            });
        }
    }
    Game.Load = Load;
    function Reset() {
        Game.Toes = 0;
        Game.ToesPerClick = 1;
        Game.ToesPerSecond = 0;
        Game.ToesEarned = 0;
        Game.GameStart = Date.now();
        Upgrades.PossibleUpgrades = ["juc1"];
        Upgrades.CurrentUpgrades = [];
        Upgrades.UpgradePath = [];
        $('.upgrade').each(function () {
            if ($(this).attr('id') != 'cannonInterrogation') {
                $(this).remove();
            }
        });
        $('#cannonInterrogation').css('display', 'block');
        Buildings.AllBuildings = structuredClone(Buildings.BuildingList);
        $('#buildings').html('');
    }
    Game.Reset = Reset;
})(Game || (Game = {}));
//Game Update
var lastTime = Date.now();
var delta = 0;
setInterval(function () {
    delta = Date.now() - lastTime;
    lastTime = Date.now();
    $('#toeCounter').html("Toes: ".concat(Beautify(Math.floor(Game.Toes))));
    $('#toePerSecondCounter').html("Per Second: ".concat(Beautify(Game.ToesPerSecond)));
    var earned = (Game.ToesPerSecond / 1000) * delta;
    Game.Toes += earned;
    Game.ToesEarned += earned;
}, 10);
$('#gainToe').on('click', function () {
    Game.Toes += Game.ToesPerClick;
    Game.ToesEarned += Game.ToesPerClick;
});
//Initial load
$(window).on('load', function () {
    Game.Load();
});
//Most browsers don't actually fire this event, but some do, so might as well
$(window).on('beforeunload', function () {
    Game.Save();
});
//Autosave
setInterval(function () {
    Game.Save();
    console.log('Game has been autosaved');
}, 30000); //Every 30 seconds
$('#changelog').on('click', function () {
    Game.OpenMenu('changelog');
});
// Options menu
$('#options').on('click', function () {
    Game.OpenMenu('options');
});
$('#manualSaveButton').on('click', function () {
    Game.Save();
});
$('#importSaveButton').on('click', function () {
    var val = $('#importSaveInput').val();
    //Typechecking
    if (typeof (val) != 'string')
        return;
    Game.Load(val);
});
$('#exportSaveButton').on('click', function () {
    navigator.clipboard.writeText(Game.Save());
    Game.CreateAlert("Your save has been copied to the clipboard.");
});
$('#wipeSaveButton').on('click', function () {
    Game.Reset();
});
//Stats menu
var UpdateStatsInterval;
function UpdateStats() {
    $('#toesEarnedLabel').html("Toes Earned (in total): ".concat(Beautify(Math.floor(Game.ToesEarned))));
    $('#timePlayedLabel').html("Time Played: ".concat(FormatDate(Date.now() - Game.GameStart, 3)));
}
$('#stats').on('click', function () {
    UpdateStats();
    UpdateStatsInterval = setInterval(function () {
        UpdateStats();
        //Check if the menu has been closed
        if ($('#statsMenu').parent()[0] == document.getElementById('menus')) {
            clearInterval(UpdateStatsInterval);
            return;
        }
    }, 200);
    Game.OpenMenu('stats');
});
//And lastly just update the version label
$('#version').html("Version ".concat(VERSION));
