var Upgrades;
(function (Upgrades) {
    Upgrades.CannonInterrogationPrice = 5;
    //I thought about having this exported and be called All, but I don't think it's needed anywhere else
    //Requires is optional, I just think it helps with being able to tell with what upgrades point to where
    Upgrades.ConstUpgrades = {
        "juc1": {
            Id: "juc1",
            Title: "Juicier Toes",
            Description: "Gives all your toes 60% more juice, giving you +2 more toes per click.",
            Price: 10,
            Effect: function () {
                Game.ToesPerClick += 2;
            },
            Unlocks: ['juc2', 'bul1'],
            Requires: [],
        },
        'juc2': {
            Id: "juc2",
            Title: "Tastier Toe Juice",
            Description: "Gives toe juice extra flavor, giving you +2 more toes per click.",
            Price: 50,
            Effect: function () {
                Game.ToesPerClick += 2;
            },
            Unlocks: ['amg1'],
            Requires: ['juc1']
        },
        'bul1': {
            Id: 'bul1',
            Title: "Amogus",
            Description: "Get Harry's Among us figurines to make toes for you. For a price of course.",
            Price: 50,
            Effect: function () {
                Buildings.ShowBuilding('Amogus');
            },
            Unlocks: ['amg1'],
            Requires: ['juc1']
        },
        "amg1": {
            Id: "amg1",
            Title: "Sussier Imposters",
            Description: "By removing imposters from the workplace, we can double the efficiency of Amoguses.",
            Price: 100,
            Effect: function () {
                Buildings.AddProductionFactor("Amogus", 2, 1);
            },
            Unlocks: ['f000', 'f001', 'amg2'],
            Requires: ['bul1', 'juc2']
        },
        'f000': {
            Id: 'f000',
            Title: 'Metal Press',
            Description: "Learn how to effectively create and operate a metal press, setting the stage for a new building.",
            Price: 200,
            Effect: function () { },
            Unlocks: ['f002'],
            Requires: ['amg1']
        },
        'f001': {
            Id: 'f001',
            Title: 'The Anatomy of an Amogus',
            Description: "Learn more about the anatomy of an Amogus, and how you can attach toes to them. This upgrade path will make clicking much more powerful.",
            Price: 200,
            Effect: function () { },
            Unlocks: ['f002', 'ptc1'],
            Requires: ['amg1']
        },
        'amg2': {
            Id: 'amg2',
            Title: 'Looser Suits',
            Description: "Considering I've never seen an Amogus without it's suit on, it's probably safe to say that this is a good idea. Doubles Amogus production.",
            Price: 200,
            Effect: function () {
                Buildings.AddProductionFactor('Amogus', 2, 2);
            },
            Unlocks: ['ptc1'],
            Requires: ['amg1'],
        },
        'f002': {
            Id: 'f002',
            Title: 'Spleen Reserach',
            Description: "Do research on the chemical properties of the spleen. Continues the path to a new building",
            Price: 500,
            Effect: function () { },
            Unlocks: ['f003'],
            Requires: ['f000', 'f001'],
        },
        "ptc1": {
            Id: 'ptc1',
            Title: 'Amogus Toes',
            Description: "Apply toes to your Amoguses. 5% of all Amogus production is added to your toes per click.",
            Price: 500,
            Effect: function () {
                Buildings.AddProductionFunction(Buildings.AllBuildings[Buildings.AllBuildings.length - 1].Name, function () {
                    Game.ToesPerClick = Game.BaseToesPerClick + Game.ToesPerSecond * 0.1;
                }, 1);
            },
            Unlocks: ['bul2'],
            Requires: ['f001', 'amg2'],
        },
        'f003': {
            Id: 'f003',
            Title: 'Amogus Psychology',
            Description: "Study the psychology of an Amogus, unlocking the path towards the 3rd building.",
            Price: 1000,
            Effect: function () { },
            Unlocks: ['f004', 'amg3'],
            Requires: ['f002'],
        },
        'bul2': {
            Id: 'bul2',
            Title: "Spleen Converters",
            Description: "Get machines to convert donated spleens into toes.",
            Price: 1000,
            Effect: function () {
                Buildings.ShowBuilding('SpleenConverter');
            },
            Unlocks: ['spl1', 'f005'],
            Requires: ['ptc1'],
        },
        'f004': {
            Id: 'f004',
            Title: 'Workforces 101',
            Description: "Learn the basics of hiring and managing employees.",
            Price: 2000,
            Effect: function () { },
            Unlocks: ['f006'],
            Requires: ['f003'],
        },
        'amg3': {
            Id: 'amg3',
            Title: 'Advanced Amogus Psychology',
            Description: "Learn more about the behavior of Amoguses, allowing us to control their behavior. Increase your Amogus efficiency by 50%",
            Price: 2000,
            Effect: function () {
                Buildings.AddProductionFactor('Amogus', 1.5, 3);
            },
            Unlocks: ['f006', 'f007'],
            Requires: ['f003'],
        },
        'spl1': {
            Id: 'spl1',
            Title: 'Regenrative Amogus Spleens',
            Description: "Amogus spleens will now grow back after being removed, tripling the efficiency of Spleen Converters.",
            Price: 2000,
            Effect: function () {
                Buildings.AddProductionFactor('SpleenConverter', 3, 1);
            },
            Unlocks: ['f007', 'f008'],
            Requires: ['bul2'],
        },
        'f005': {
            Id: 'f005',
            Title: 'Primitive Agriculture',
            Description: "Learn some basic knowledge of farming. But you don't plan on growing tomatoes with this knowledge.",
            Price: 2000,
            Effect: function () { },
            Unlocks: ['f008'],
            Requires: ['bul2'],
        },
        'f006': {
            Id: 'f006',
            Title: 'Amogus Collaboration',
            Description: "Teach your Amoguses how to work together.",
            Price: 5000,
            Effect: function () { },
            Unlocks: ['f009'],
            Requires: ['f004', 'amg3'],
        },
        'f007': {
            Id: 'f007',
            Title: 'Machine Operating Permit',
            Description: "Your Amoguses will finally be able to legally operate machinery.",
            Price: 5000,
            Effect: function () { },
            Unlocks: ['spl2', 'atsp'],
            Requires: ['amg3', 'spl1'],
        },
        'f008': {
            Id: 'f008',
            Title: 'Irrigation Techniques',
            Description: "Continue to learn more about how to farm effectively, paving the way for a third building.",
            Price: 5000,
            Effect: function () { },
            Unlocks: ['amg4', 'f010'],
            Requires: ['f005', 'spl1'],
        },
        'f009': {
            Id: 'f009',
            Title: 'Less Worker Rights',
            Description: "Learn how to get away with underpaying your employees.",
            Price: 10000,
            Effect: function () { },
            Unlocks: ['bul3'],
            Requires: ['f006'],
        },
        'spl2': {
            Id: 'spl2',
            Title: 'Oiled Presses',
            Description: "Oil the presses on your Spleen Converters, doubling their efficiency.",
            Price: 10000,
            Effect: function () {
                Buildings.AddProductionFactor('SpleenConverter', 2, 2);
            },
            Unlocks: ['f011'],
            Requires: ['f007'],
        },
        'atsp': {
            Id: 'atsp',
            Title: 'Amogus Machine Operation',
            Description: "+1% Spleen Converter production for every Amogus.",
            Price: 10000,
            Effect: function () {
                Buildings.AddProductionFunction('SpleenConverter', function () {
                    Buildings.AllBuildings[1].ToesPerSecond *= 1 + (0.01 * Buildings.AllBuildings[0].Amount);
                }, 1);
            },
            Unlocks: ['bul3'],
            Requires: ['f007'],
        },
        'amg4': {
            Id: 'amg4',
            Title: 'Hydrated Amogus',
            Description: "Use your newfound knowledge of irrigation techniques to deliver water to your Amoguses, increasing their production by 50%.",
            Price: 10000,
            Effect: function () {
                Buildings.AddProductionFactor('Amogus', 1.5, 4);
            },
            Unlocks: ['bul3'],
            Requires: ['f008'],
        },
        'f010': {
            Id: 'f010',
            Title: 'Advanced Agriculture',
            Description: "Learn advanced farming techniques, so advanced that you might be able to grow more than just plants.",
            Price: 10000,
            Effect: function () { },
            Unlocks: ['bul3'],
            Requires: ['f008'],
        },
        'f011': {
            Id: 'f011',
            Title: 'Urbanization',
            Description: "Learn more about creating small neighborhoods, starting the path towards a 4th building.",
            Price: 20000,
            Effect: function () { },
            Unlocks: ['f012', 'can1'],
            Requires: ['spl2'],
        },
        'bul3': {
            Id: 'bul3',
            Title: 'Toe Farm',
            Description: "Use your knowledge of agriculture and human labor to begin the cultivation of toes.",
            Price: 20000,
            Effect: function () {
                Buildings.ShowBuilding('Farm');
            },
            Unlocks: ['amg5', 'frm1'],
            Requires: ['f009', 'atsp', 'amg4', 'f010'],
        },
        'f012': {
            Id: 'f012',
            Title: 'Apartments',
            Description: "Build vertically instead of horizontallly.",
            Price: 50000,
            Effect: function () { },
            Unlocks: ['f013', 'f014'],
            Requires: ['f011'],
        },
        'can1': {
            Id: 'can1',
            Title: 'Practice Room Torture',
            Description: "Find a new method of torture involving a dark practice room and Harry. Interrogations are now 500 toes and only have a 1 and 24 chance of succeeding, but upgrades become much more powerful.",
            Price: 50000,
            Effect: function () {
                InterrogationChance = 24;
                Upgrades.CannonInterrogationPrice = 500;
                CannonInterrogationChance = [];
                RefillInterrogationChance(InterrogationChance);
                $('#cannonInterrogationPrice').html("Price: 500 toes");
            },
            Unlocks: ['can2'],
            Requires: ['f011'],
        },
        'amg5': {
            Id: 'amg5',
            Title: "Jackson's Beansauce Delivery",
            Description: "Get some of Jackson's scrumptious beansauce, to improve Amogus producitivity by 33%.",
            Price: 50000,
            Effect: function () {
                Buildings.AddProductionFactor('Amogus', 1 + (1 / 3), 5);
            },
            Unlocks: ['f014', 'frm2', 'can3'],
            Requires: ['bul3'],
        },
        'frm1': {
            Id: 'frm1',
            Title: 'Fortune III',
            Description: "Who knew glowing books found on library shelves could be so useful? Triples all farm output.",
            Price: 50000,
            Effect: function () {
                Buildings.AddProductionFactor('Farm', 3, 1);
            },
            Unlocks: ['tps1'],
            Requires: ['bul3'],
        },
        'f013': {
            Id: 'f013',
            Title: 'Building Permit Bribes',
            Description: "Use questionable methods to obtain some building permits, beginning the path to the 4th building.",
            Price: 1e5,
            Effect: function () { },
            Unlocks: ['tps2'],
            Requires: ['f012'],
        },
        'can2': {
            Id: 'can2',
            Title: 'Auto-Interrogator 2000',
            Description: "Invent a machine that will automatically interrogate Harry for you. It will interrogate Cannon once every second.",
            Price: 1e5,
            Effect: function () {
                $('#autoInterrogatorLabel').css('display', 'inline');
                $('#autoInterrogatorButton').css('display', 'inline');
                $('#autoInterrogatorButton').on('click', function () {
                    if (Upgrades.AutoInterrogatorInterval) {
                        $('#autoInterrogatorButton').html('OFF');
                        clearInterval(Upgrades.AutoInterrogatorInterval);
                        Upgrades.AutoInterrogatorInterval = null;
                    }
                    else {
                        $('#autoInterrogatorButton').html('ON');
                        setInterval(function () {
                            alertsOnUpgradePrompt = false;
                            $('#cannonInterrogationButton').trigger('click');
                            alertsOnUpgradePrompt = true;
                        }, 1000);
                    }
                });
            },
            Unlocks: ['tps2'],
            Requires: ['can1'],
        },
        'f014': {
            Id: 'f014',
            Title: 'Beansauce Lures',
            Description: "See if you can lure any creatues using some of the spare beansauce from Jackson. Continues the path towards the 4th building.",
            Price: 1e5,
            Effect: function () { },
            Unlocks: ['tps2', 'atfr'],
            Requires: ['f012', 'amg5'],
        },
        'frm2': {
            Id: 'frm2',
            Title: 'Forklift Certification',
            Description: "Look cool, and increase Farm production by 33% at the same time!",
            Price: 1e5,
            Effect: function () {
                Buildings.AddProductionFactor('Farm', 1 + (1 / 3), 2);
            },
            Unlocks: ['atfr'],
            Requires: ['amg5'],
        },
        'can3': {
            Id: 'can3',
            Title: 'Denial',
            Description: "Gain the ability to throw away an upgrade for now.",
            Price: 1e5,
            Effect: function () {
                $('.denial-button').css('display', 'inline');
            },
            Unlocks: ['spl3'],
            Requires: ['amg5'],
        },
        'tps1': {
            Id: 'tps1',
            Title: "Jolt's Slerp Juice",
            Description: "Use Jolt's spherical linear interoplation juice to make everybody move a bit smoother, and increase your whole toe production by 5%.",
            Price: 1e5,
            Effect: function () {
                Buildings.AddProductionFunction(Buildings.AllBuildings[Buildings.AllBuildings.length - 1].Name, function () {
                    Game.ToesPerSecond *= 1.05;
                }, 1000);
            },
            Unlocks: ['spl3', 'amg6'],
            Requires: ['frm1'],
        },
        'tps2': {
            Id: 'tps2',
            Title: 'Monkee Moment',
            Description: "Make this game a certified monkee moment, adding +10% to your total production multiplier (now 15%)",
            Price: 5e5,
            Effect: function () {
                Buildings.EditProductionFunction(Buildings.AllBuildings[Buildings.AllBuildings.length - 1].Name, function () {
                    Game.ToesPerSecond *= 1.15;
                }, 1000);
            },
            Unlocks: ['tps3', 'f015'],
            Requires: ['f013', 'can2', 'f014'],
        },
        'atfr': {
            Id: 'atfr',
            Title: 'Amogus Farmers',
            Description: "Employ your Amoguses to help at the farms. +1% farm production for ever",
            Price: 5e5,
            Effect: function () {
                Buildings.AddProductionFunction('Farm', function () {
                    Buildings.AllBuildings[Buildings.GetBuildingIndexFromName('Farm')].ToesPerSecond *= 1 + 0.01 * Buildings.AllBuildings[Buildings.GetBuildingIndexFromName('Amogus')].Amount;
                }, 1);
            },
            Unlocks: ['f015'],
            Requires: ['f014', 'frm2'],
        },
        'spl3': {
            Id: 'spl3',
            Title: '3D Printed Spleens',
            Description: "3D print spleens, doubling their production.",
            Price: 5e5,
            Effect: function () {
                Buildings.AddProductionFactor('SpleenConverter', 2, 3);
            },
            Unlocks: ['f015', 'ptc2'],
            Requires: ['can3', 'tps1'],
        },
        'amg6': {
            Id: 'amg6',
            Title: 'Unironically Funny Among Us Memes',
            Description: "Make all Among Us memes actually funny, ushering humanity into a new golden age. +50% to Amogus production",
            Price: 5e5,
            Effect: function () {
                Buildings.AddProductionFactor('Amogus', 1.5, 6);
            },
            Unlocks: ['ptc2'],
            Requires: ['tps1'],
        },
        'tps3': {
            Id: 'tps3',
            Title: 'So Much Monkee',
            Description: "Add 5% to the total production multiplier.",
            Price: 1e6,
            Effect: function () {
                Buildings.EditProductionFunction(Buildings.AllBuildings[Buildings.AllBuildings.length - 1].Name, function () {
                    Game.ToesPerSecond *= 1.2;
                }, 1000);
            },
            Unlocks: ['can4'],
            Requires: ['tps2'],
        },
        'f015': {
            Id: 'f015',
            Title: 'Monkee Civilization',
            Description: "Learn how to make monkees live together, in perfect harmony.",
            Price: 1e6,
            Effect: function () { },
            Unlocks: ['bul4'],
            Requires: ['tps2', 'atfr', 'spl3'],
        },
        'ptc2': {
            Id: 'ptc2',
            Title: 'Monkee Toes',
            Description: "Apply toes to your Monkees, changing the percentage of toe production added to your base toes per click from 0.1% to 0.15%",
            Price: 1e6,
            Effect: function () {
                Buildings.EditProductionFunction(Buildings.AllBuildings[Buildings.AllBuildings.length - 1].Name, function () {
                    Game.ToesPerClick = Game.BaseToesPerClick + Game.ToesPerSecond * 0.15;
                }, 1000);
            },
            Unlocks: ['bul4'],
            Requires: ['spl3', 'amg6'],
        },
        'can4': {
            Id: 'can4',
            Title: 'Darker Practice Rooms',
            Description: "The chance of a succesful interrogation is now 1 in 20.",
            Price: 5e6,
            Effect: function () {
                CannonInterrogationChance = [];
                InterrogationChance = 20;
                RefillInterrogationChance(InterrogationChance);
            },
            Unlocks: [],
            Requires: ['tps3'],
        },
        'bul4': {
            Id: 'bul4',
            Title: "Monkee City",
            Description: "Create a bustling city full of Monkees, all working 9 to 5 workdays 24/7 to create toes.",
            Price: 5e6,
            Effect: function () {
                Buildings.ShowBuilding('City');
            },
            Unlocks: [],
            Requires: ['f015', 'ptc2'],
        },
    };
    Upgrades.AllUpgrades = Object.assign({}, Upgrades.ConstUpgrades);
    Upgrades.PossibleUpgrades = ["juc1"];
    Upgrades.CurrentUpgrades = [];
    Upgrades.UpgradePath = [];
    function ShowUpgrade(id) {
        //Safeguard
        if (Upgrades.CurrentUpgrades.indexOf(id) != -1 || Upgrades.UpgradePath.indexOf(id) != -1) {
            console.error(`ShowUpgrade has been called twice for the upgrade ${id} and the call has been dropped.`);
            return;
        }
        $('#upgrades').append(`
        <div id = '${id}' class = 'upgrade'>
            <p id = '${id}-header' class = 'upgrade-header'>${Upgrades.AllUpgrades[id].Title}</p>
            <p id = '${id}-description' class = 'upgrade-description'>${Upgrades.AllUpgrades[id].Description}</p>
            <p id = '${id}-price' class = 'upgrade-price'>Price: ${Upgrades.AllUpgrades[id].Price} toes</p>
            <button id = '${id}-button' class = 'upgrade-button'>Buy</button><button id = '${id}-denialbutton' class = 'upgrade-button denial-button'>Deny</button>
        </div>
        `);
        Upgrades.CurrentUpgrades.push(id);
        if (Upgrades.PossibleUpgrades.indexOf(id) != -1) {
            Upgrades.PossibleUpgrades.splice(Upgrades.PossibleUpgrades.indexOf(id), 1);
        }
        $(document.getElementById(`${id}-button`)).on('click', function () {
            if (Game.Toes >= Upgrades.AllUpgrades[id].Price) {
                Game.Toes -= Upgrades.AllUpgrades[id].Price;
                Upgrades.AllUpgrades[id].Effect();
                Buildings.UpdateToesPerSecond();
                //This needs to go first so the requirments system works
                Upgrades.CurrentUpgrades.splice(Upgrades.CurrentUpgrades.indexOf(id), 1);
                Upgrades.UpgradePath.push(id);
                for (let unlockId of Upgrades.AllUpgrades[id].Unlocks) {
                    Upgrades.AllUpgrades[unlockId].Requires.splice(Upgrades.AllUpgrades[unlockId].Requires.indexOf(id), 1);
                    if (Upgrades.AllUpgrades[unlockId].Requires.length == 0) {
                        Upgrades.PossibleUpgrades.push(unlockId);
                    }
                }
                $(document.getElementById(`${id}`)).remove();
            }
        });
        //Chgeck if they have the denial upgrade
        if (Upgrades.UpgradePath.indexOf('can3') != -1)
            $(`#${id}-denialbutton`).css('display', 'inline');
        $(`#${id}-denialbutton`).on('click', function () {
            Upgrades.CurrentUpgrades.splice(Upgrades.CurrentUpgrades.indexOf(id), 1);
            Upgrades.PossibleUpgrades.push(id);
            $(`#${id}`).remove();
        });
    }
    Upgrades.ShowUpgrade = ShowUpgrade;
})(Upgrades || (Upgrades = {}));
let InterrogationChance = 12;
let CannonInterrogationChance = [];
function RefillInterrogationChance(length) {
    CannonInterrogationChance = [];
    length -= 1;
    for (let i = 0; i < length; i++)
        CannonInterrogationChance.push(0);
    CannonInterrogationChance[Math.round(Math.random() * CannonInterrogationChance.length - 1)] = 1;
}
RefillInterrogationChance(InterrogationChance);
let alertsOnUpgradePrompt = true;
$('#cannonInterrogationButton').on('click', function () {
    function CreateAlert(message) {
        if (!alertsOnUpgradePrompt)
            return;
        Game.CreateAlert(message);
    }
    if (Game.Toes >= Upgrades.CannonInterrogationPrice) {
        if (Upgrades.UpgradePath.length == Object.keys(Upgrades.AllUpgrades).length) {
            //We want to be sure even if this happens while using the Auto Interrogator the player still knows about it
            Game.CreateAlert("Cannon has run out of upgrades!");
            $('#cannonInterrogation').css('display', 'none');
            $('#cannonInterrogationButton').off('click');
            return;
        }
        if (Upgrades.CurrentUpgrades.length > 2) {
            CreateAlert("You can only have 3 upgrades out at a time, purchase an upgrade!");
            return;
        }
        if (Upgrades.PossibleUpgrades.length == 0) {
            CreateAlert("Cannon has no available upgrades right now! Buy some of the upgrades you have right now to unlock more.");
            return;
        }
        Game.Toes -= Upgrades.CannonInterrogationPrice;
        if (CannonInterrogationChance[CannonInterrogationChance.length - 1] == 1) {
            RefillInterrogationChance(InterrogationChance);
            let Index = ChooseIndex(Upgrades.PossibleUpgrades);
            Upgrades.ShowUpgrade(Upgrades.PossibleUpgrades[Index]);
        }
        else {
            CannonInterrogationChance.pop();
            CreateAlert(`You interrogated Cannon, but only learned that ${Choose([
                "khachapuri is important to all aspects of life.",
                "Cannon's CoC is doing good.",
                "Cannon is so silly.",
                "Cannon doesn't do drugs (or the 🤓)",
                "Cannon studies sussy sciences."
            ])}`);
        }
    }
});
//Price color changing
setInterval(() => {
    UpdateIfPriceAvailableOnElement($('#cannonInterrogationPrice'), Upgrades.CannonInterrogationPrice);
    for (let id of Upgrades.CurrentUpgrades) {
        //Return of the document.querySelector spaghetti
        UpdateIfPriceAvailableOnElement($(document.getElementById(`${id}-price`)), Upgrades.AllUpgrades[id].Price);
    }
}, 10);
//A some hacked in little tests to be sure everything works (for upgrades)
/*
window.onload = function(){
    //Check that all the upgrades function don't error
    for(let upgradeKey of Object.keys(Upgrades.AllUpgrades)){
        if(Upgrades.UpgradePath.indexOf(upgradeKey) == -1){
            Upgrades.AllUpgrades[upgradeKey].Effect();
            Upgrades.UpgradePath.push(upgradeKey);
        }
    }

    //Check all the upgrades link to each other and there are no invalid IDs
    let UpgradesToIndex = Object.assign({}, Upgrades.AllUpgrades);
    for(let upgradeKey of Object.keys(UpgradesToIndex)){
        for(let unlock of UpgradesToIndex[upgradeKey].Unlocks){
            if(!UpgradesToIndex[unlock]) {
                console.error(`Attempt to unlock upgrade that does not exist (${unlock}) from ${upgradeKey}`)
                continue
            };
            if(UpgradesToIndex[unlock].Requires.indexOf(upgradeKey) == -1){
                console.error(`Attempt to unlock upgrade ${unlock} when it is not required for ${upgradeKey}`);
                continue;
            }
            UpgradesToIndex[unlock].Requires.splice(UpgradesToIndex[unlock].Requires.indexOf(upgradeKey) - 1, 1);
        }
    }
    for(let upgradeKey of Object.keys(UpgradesToIndex)){
        if(UpgradesToIndex[upgradeKey].Requires.length > 0){
            let str = `Upgrade ${upgradeKey} cannot be unlocked. Missing upgrades: `;
            for(let missing of UpgradesToIndex[upgradeKey].Requires){
                str += ` ${missing} `;
            }
            console.error(str);
        }
    }
}
*/ 
