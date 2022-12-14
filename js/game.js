const VERSION = 0.008;
var Game;
(function (Game) {
    Game.Toes = 0;
    Game.BaseToesPerClick = 1;
    Game.ToesPerClick = 1;
    Game.ToesPerSecond = 0;
    Game.GameStart = Date.now();
    Game.Stats = {
        ToesEarned: 0,
        SuccesfulInterrogations: 0,
        FailedInterrogations: 0,
    };
    //Story chapter
    function CreateStoryChapter(title, text, onfinish) {
        text.push('(tap to continue)');
        $('.story-title').html(title);
        $('#storyChapter').css('display', 'block');
        $('#storyChapter').animate({
            'opacity': '1',
        }, 2000);
        for (let i = 0; i < text.length; i++) {
            $('#storyChapter').append(`<p id = 'storyelement${i}' class = 'story-element'>${text[i]}</p>`);
        }
        let CurrentElement = 0;
        function NextElement() {
            $(`#storyelement${CurrentElement}`).css('opacity', '1');
            CurrentElement++;
            $(`#storyelement${CurrentElement}`).animate({
                'opacity': '1'
            }, 2000, NextElement);
        }
        setTimeout(function () {
            $(`#storyelement${CurrentElement}`).animate({
                'opacity': '1'
            }, 2000, NextElement);
        }, 2000);
        $('#storyChapter').on('click', function () {
            //A temporary fix while I find out why you can get two elements spawning at once.
            if (CurrentElement >= text.length) {
                $('.story-element').remove('');
                $('#storyChapter').off();
                $('#storyChapter').css('opacity', 0);
                $('#storyChapter').css('display', 'none');
                if (onfinish)
                    onfinish();
                return;
            }
            $(`#storyelement${CurrentElement}`).stop();
            NextElement();
        });
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
        $(`#${name}Menu`).detach().appendTo('#game');
        $('#closeMenu').detach().appendTo(`#${name}Menu`);
    }
    Game.OpenMenu = OpenMenu;
    function Save() {
        let SaveData = {
            Version: VERSION,
            LastLogonTime: Date.now(),
            Theme: theme,
            Toes: Game.Toes,
            GameStart: Game.GameStart,
            InterrogationChance: InterrogationChance,
            CurrentUpgrades: Upgrades.CurrentUpgrades,
            BoughtUpgrades: Upgrades.UpgradePath,
            Buildings: [],
            Stats: Game.Stats,
        };
        console.log(Upgrades.UpgradePath);
        //Go over all the buildings and put them in the array (we don't need to use string keys because we can always just switch stats for different buildings)
        for (let building of Buildings.AllBuildings) {
            SaveData.Buildings.push(building.Amount);
        }
        //This encodes to base64, we do this so if the user were to say paste their save in a google doc, the data would not change
        let SaveString = btoa(JSON.stringify(SaveData));
        localStorage.setItem('save', SaveString);
        return SaveString;
    }
    Game.Save = Save;
    function Load(save) {
        let fetchedSave;
        if (save) {
            fetchedSave = save;
        }
        else {
            fetchedSave = localStorage.getItem('save');
        }
        //you could encrypt this to stop people from looking in the js and immediately finding the cheat code but whatever
        if (fetchedSave == 'sv_cheats 1') {
            Cheats.Activate();
            return;
        }
        else if (fetchedSave == 'sv_cheats 0') {
            Cheats.Deactivate();
            return;
        }
        if (fetchedSave) {
            let SaveData;
            try {
                //Convert to b64
                SaveData = JSON.parse(atob(fetchedSave));
            }
            catch (error) {
                //We get here if they are using an older save (which is not in b64)
                try {
                    SaveData = JSON.parse(fetchedSave);
                }
                catch (error) {
                    return;
                }
            }
            //Version updaters
            let ver = SaveData.Version;
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
                case 0.006:
                    SaveData.Stats = {
                        ToesEarned: SaveData.ToesEarned,
                        SuccesfulInterrogations: 0,
                        FailedInterrogations: 0,
                    };
                case 0.007:
                    SaveData.Theme = 'dark';
                    //This is only a one-time thing, so they can't abuse this as an exploit in the future without save editing
                    InterrogationChance = Random(1, 12);
                    let upgradePatch = {
                        'f001': 'juc3',
                        'f002': 'f001',
                        'f003': 'amg3',
                        'f004': 'tps1',
                        'amg3': 'amg4',
                        'f005': 'f002',
                        'f006': 'amg5',
                        'f007': 'spl2',
                        'f008': 'f003',
                        'f009': 'pfa1',
                        'spl2': 'spl3',
                        'amg4': 'amg6',
                        'f010': 'f004',
                        'f011': 'f005',
                        'f012': 'f006',
                        'amg5': 'amg7',
                        'f013': 'pfs1',
                        'f014': 'f007',
                        'tps1': 'tps2',
                        'tps2': 'tps3',
                        'spl3': 'spl4',
                        'amg6': 'amg8',
                        'tps3': 'tps4',
                        'f015': 'f008',
                    };
                    // let i = 0;
                    for (let upgradeId of SaveData.BoughtUpgrades) {
                        //i++;
                        if (upgradePatch[upgradeId]) {
                            SaveData.BoughtUpgrades.splice(SaveData.BoughtUpgrades.indexOf(upgradeId), 1, upgradePatch[upgradeId]);
                            upgradePatch[upgradeId] = null;
                            console.log(`Removed upgrade id: ${upgradeId} Replaced with id: ${upgradePatch[upgradeId]}`);
                        }
                    }
                    console.log(upgradePatch);
            }
            Game.Reset();
            console.log(SaveData);
            Game.Toes = SaveData.Toes;
            Game.GameStart = SaveData.GameStart;
            Game.Stats = SaveData.Stats;
            theme = SaveData.Theme;
            $('head link#theme').attr('href', `styles/${SaveData.Theme}.css`);
            $('#themeSelect').val(theme);
            InterrogationChance = SaveData.InterrogationChance;
            //So Jucier Toes isn't in there by default
            if (SaveData.CurrentUpgrades.length > 0 || SaveData.BoughtUpgrades.length > 0) {
                Upgrades.PossibleUpgrades = [];
            }
            //Show all upgrades that need to be shown
            for (let id of SaveData.CurrentUpgrades) {
                Upgrades.ShowUpgrade(id);
            }
            for (let id of SaveData.BoughtUpgrades) {
                Upgrades.UpgradePath.push(id);
                Upgrades.AllUpgrades[id].Effect();
            }
            for (let upgradeId of Object.keys(Upgrades.AllUpgrades)) {
                for (let unlockId of Upgrades.AllUpgrades[upgradeId].Unlocks) {
                    let canUnlock = true;
                    for (let requirment of Upgrades.AllUpgrades[unlockId].Requires) {
                        if (Upgrades.UpgradePath.indexOf(requirment) == -1) {
                            canUnlock = false;
                            break;
                        }
                    }
                    if (canUnlock && Upgrades.UpgradePath.indexOf(unlockId) == -1 && Upgrades.CurrentUpgrades.indexOf(unlockId) == -1 && Upgrades.PossibleUpgrades.indexOf(unlockId) == -1) {
                        Upgrades.PossibleUpgrades.push(unlockId);
                    }
                }
            }
            if (Upgrades.PossibleUpgrades.length == 0 && Upgrades.CurrentUpgrades.length == 0 && Upgrades.UpgradePath.length > 1) {
                $('#cannonInterrogation').css('display', 'none');
            }
            //Create all their buildings
            let i = 0;
            for (let amount of SaveData.Buildings) {
                let building = Buildings.AllBuildings[i];
                building.Amount = amount;
                for (let n = 0; n < building.Amount; n++) {
                    building.BasePrice *= building.PriceMult;
                }
                building.Price = building.BasePrice;
                $(`#${building.Name}-amount`).html(amount.toString());
                $(`#${building.Name}-price`).html(`Price: ${Beautify(Math.round(building.Price))} toes`);
                i++;
            }
            Buildings.UpdateToesPerSecond();
            //Calculate offline earnings
            let earnings = Math.floor((Game.ToesPerSecond / 1000) * (Date.now() - SaveData.LastLogonTime));
            Game.Toes += earnings;
            Game.CreateAlert(`While you were away, you gained ${Beautify(earnings)} toes.`);
        }
        //Inital lore
        if (Game.Stats.ToesEarned == 0) {
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
        if (Game.Stats.ToesEarned >= 20) {
            $('#upgrades').css('display', 'block');
        }
    }
    Game.Load = Load;
    function Reset() {
        Game.Toes = 0;
        Game.ToesPerClick = 1;
        Game.ToesPerSecond = 0;
        Game.GameStart = Date.now();
        Game.Stats = {
            ToesEarned: 0,
            SuccesfulInterrogations: 0,
            FailedInterrogations: 0,
        };
        Upgrades.PossibleUpgrades = ["juc1"];
        Upgrades.CurrentUpgrades = [];
        Upgrades.UpgradePath = [];
        $('.upgrade').each(function () {
            if ($(this).attr('id') != 'cannonInterrogation') {
                $(this).remove();
            }
        });
        $('#cannonInterrogation').css('display', 'block');
        Upgrades.CannonInterrogationPrice = 5;
        MaxInterrogationChance = 12;
        InterrogationChance = Random(1, MaxInterrogationChance);
        $('#autoInterrogatorLabel').css('display', 'none');
        $('#autoInterrogatorButton').css('display', 'none');
        $('#autoInterrgatorButton').off('click');
        $('#autoInterrogatorButton').html('OFF');
        Upgrades.AutoInterrogatorInterval = null;
        Buildings.AllBuildings = structuredClone(Buildings.BuildingList);
        $('#buildings').html('');
    }
    Game.Reset = Reset;
})(Game || (Game = {}));
//Tabs
let Tabs = {
    'Buildings': [$('#buildings'), $('#upgrades')],
    'Instructions': [$('#instructions')],
};
let CurrentTab = 'Buildings';
$('.tab').on('click', function () {
    let name = $(this).html();
    $(`#tab-${CurrentTab.toLowerCase()}`).css({
        'background-color': 'black',
        'color': 'white',
    });
    $(`#tab-${name.toLowerCase()}`).css({
        'background-color': 'white',
        'color': 'black',
    });
    for (let item of Tabs[CurrentTab]) {
        item.css('display', 'none');
    }
    for (let item of Tabs[name]) {
        item.css('display', 'block');
    }
});
//Themes
let theme = 'dark';
$('#themeSelect').on('change', function () {
    let val = $('#themeSelect').val();
    //For TypeScript
    if (typeof (val) != 'string')
        return;
    val = val.toLowerCase();
    theme = val;
    $(`head link#theme`).attr('href', `styles/${val}.css`);
});
//Game Update
let lastTime = Date.now();
let delta = 0;
setInterval(() => {
    delta = Date.now() - lastTime;
    lastTime = Date.now();
    $('#toeCounter').html(`Toes: ${Beautify(Math.floor(Game.Toes))}`);
    $('#toePerSecondCounter').html(`Per Second: ${Beautify(Math.floor(Game.ToesPerSecond))}`);
    let earned = (Game.ToesPerSecond / 1000) * delta;
    Game.Toes += earned;
    Game.Stats.ToesEarned += earned;
}, 10);
let checks = [];
$('#gainToe').on('click', function (event) {
    Game.Toes += Game.ToesPerClick;
    Game.Stats.ToesEarned += Game.ToesPerClick;
    $('body').append(`<p class = 'click-popups unselectable'>+${Beautify(Math.floor(Game.ToesPerClick))} toes</p>`);
    $('.click-popups').css({
        'top': event.pageY - $('.click-popups').height(),
        'left': event.pageX,
    });
    $('.click-popups').animate({
        'top': event.pageY - ConvertPercentageToPx(5, 'height') - $('.click-popups').height(),
        'left': event.pageX,
    }, 500, '', function () {
        $(this).remove();
    });
    if (Game.Stats.ToesEarned >= 20 && $('#upgrades').css('display') == 'none') {
        Game.CreateStoryChapter("This is boring", [
            "It isn't long before you realize clicking a button over and over is kinda boring.",
            "You'll never reach critical toe amounts at this rate.",
            `You go over to Harry, who has been moaning in those entire ${FormatDate(Date.now() - Game.GameStart, 1)}.`,
            "and ask if he knows anything you could do other than press that button.",
            "He tells you to follow him past a steel door, into a room with somebody tied to a chair.",
            "\"This little sussy boy,\" Harry says with a devious smirk. \"Has some secrets to make more toes.\"",
            "\"It's your job to get them out of him.\" he says, turning back to you.",
            "Ignoring all morals and human rights, this could net some serious toe production.",
        ], function () {
            $('#upgrades').css('display', 'block');
        });
    }
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
setInterval(() => {
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
    let val = $('#importSaveInput').val();
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
let UpdateStatsInterval;
function UpdateStats() {
    $('#toesEarnedLabel').html(`Toes Earned (in total): ${Beautify(Math.floor(Game.Stats.ToesEarned))}`);
    $('#timePlayedLabel').html(`Time Played: ${FormatDate(Date.now() - Game.GameStart, 3)}`);
    $('#succesfulInterrogationsLabel').html(`Succesful Interrogations: ${Game.Stats.SuccesfulInterrogations}`);
    $('#failedInterrogationsLabel').html(`Failed Interrogations: ${Game.Stats.FailedInterrogations}`);
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
$('#version').html(`Version ${VERSION}`);
