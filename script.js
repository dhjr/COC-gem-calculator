function inputValues()
{
    let values = [];
    let reqdNumGems = document.getElementById('reqdNumOfGems').value;
    let avlNumGems= document.getElementById('avlNumOfGems').value;
    let gemMineLvl = document.getElementById('gemMineLevel').value;
    let clockTowerLvl = document.getElementById('clockTowerLevel').value;
    let clanGameTier = document.getElementById('clanGameTier').value;
    let error;
    
    if(reqdNumGems.length==0)
    {
        error = document.getElementById('err0');
        error.style.visibility = 'visible';
    }
    else
    {
        error = document.getElementById('err0');
        error.style.visibility='hidden'
        values[0] = reqdNumGems;
    }


    if(avlNumGems.length==0)
    {
        error = document.getElementById('err1');
        error.style.visibility = 'visible';
    }
    else
    {
        error = document.getElementById('err1');
        error.style.visibility = 'hidden';
        values[1] = avlNumGems;
    }


    if(gemMineLvl.length==0||Number(gemMineLvl)>10||Number(gemMineLvl)<0)
    {
        error = document.getElementById('err2');
        error.style.visibility = 'visible';

    }
    else
    {
        error = document.getElementById('err2');
        error.style.visibility = 'hidden';
        values[2]=gemMineLvl;
    }


    if(clockTowerLvl.length==0||Number(clockTowerLvl)>10||Number(clockTowerLvl)<0)
    {
        error = document.getElementById('err3');
        error.style.visibility = 'visible';

    }
    else
    {
        error = document.getElementById('err3');
        error.style.visibility = 'hidden';
        values[3]=clockTowerLvl;
    }
    

    if(clanGameTier.length==0||Number(clanGameTier)>7||Number(clanGameTier)<0)
    {
        error = document.getElementById('err4');
        error.style.visibility = 'visible';
        
    }
    else
    {
        error = document.getElementById('err4');
        error.style.visibility = 'hidden';
        values[4]=clanGameTier;
        console.log(values);
    }

    return values;
}




function gemMineAndClockTower(values)
{
let gemMineLvl = values[2];

const gemMinePerDayProduction = {0:Infinity,         //time taken to produce 1 gem for each level of the gem mine
                    1:40000,
                    2:36000,
                    3:32727,
                    4:30000,
                    5:27692,
                    6:25714,
                    7:22500,
                    8:20000,
                    9:18000,
                    10:17143
                }



let clockTowerLvl = values[3];

const netTimeGainedPerDay = {0:0,       //Indicated how much actual boost is provided by the clock tower in addition to 24 hours of a day for each clock tower level.
                    1:6720,
                    2:7680,
                    3:8640,
                    4:9600,
                    5:10560,
                    6:11520,
                    7:12480,
                    8:13440,
                    9:14400,
                    10:15360
                }

let cgmProductionPerDay = (86400+netTimeGainedPerDay[clockTowerLvl])/gemMinePerDayProduction[gemMineLvl];       // total production by the gemMine with clock tower boost once a day
console.log("Net gem mine production per day:"+cgmProductionPerDay);
return cgmProductionPerDay;
}



function gemBox()
{
    let gbProdPerDay = 50/30;            //average of 2 gem boxes(50gems) per month(30days)
    return gbProdPerDay;
}


function clanGames()
{
    const d = newDate();
    let date = d.getDate();
    let clanGameTier = values[4];
    let clanGameAvailable = false;
    if (date>=22 &&date<=28)

    if (clanGameTier>0 && clanGameTier<=2)
    {
        gemsPerDay = 20/30;
    }
    else if(clanGameTier>2&&clanGameTier<6)
    {
        gemsPerDay = 50/30;
    }

}

function displayTime(time)
{
    let remainingTime;

    let days = Math.floor(time);
    remainingTime = time-days;
    
    let hours = (remainingTime*24);
    remainingTime = hours;
    hours = Math.floor(remainingTime);
    remainingTime-=hours;


    let minutes = (remainingTime*60);
    remainingTime = minutes;
    minutes = Math.floor(remainingTime);
    remainingTime-= minutes;

    let seconds = (remainingTime*60);
    remainingTime = seconds;
    seconds = Math.floor(remainingTime);

    return [days,hours,minutes,seconds];
}

function mainFunction()
{
    let val = inputValues();
    let reqdTime = 0;
    let reqdGems = val[0];
    let avlGems = val[1];
    let resultTag = document.getElementById('timeTaken');
    
    if(reqdGems <= avlGems)
        {
            resultTag.innerHTML = ("Time Taken:0 days");   
        }
    else
        {
            let netReqdGems = reqdGems - avlGems;
            let gcNetProductionPerDay = gemMineAndClockTower(val);
            reqdTime = netReqdGems/gcNetProductionPerDay;
            reqdTime = parseFloat(reqdTime.toFixed(4));            //to round required time to 4 decimal places.

            let result = displayTime(reqdTime);
            resultTag.innerHTML = `Time Taken: ${result[0]} days ${result[1]} hours ${result[2]} minutes ${result[3]} seconds `;
       
    }
}

    

document.getElementById('calcBtn').addEventListener('click',mainFunction);

