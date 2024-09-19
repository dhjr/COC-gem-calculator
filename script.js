function inputValues()
{
    let values = [];
    let reqdNumGems = document.getElementById('reqdNumOfGems').value;
    let avlNumGems= document.getElementById('avlNumOfGems').value;
    let gemMineLvl = document.getElementById('gemMineLevel').value;
    let clockTowerLvl = document.getElementById('clockTowerLevel').value;
    let error;
        
    if(reqdNumGems.length==0||reqdNumGems.length>10)
    {
        error = document.getElementById('err0');
        error.style.visibility = 'visible';
        values[0]=-1;
    }
    else
    {
        error = document.getElementById('err0');
        error.style.visibility='hidden'
        values[0] = Number(reqdNumGems);
    }
    
    
    if(avlNumGems.length==0||avlNumGems.length>10)
    {
        error = document.getElementById('err1');
        error.style.visibility = 'visible';
        values[1]=-1;
    }
    else
    {
        error = document.getElementById('err1');
        error.style.visibility = 'hidden';
        values[1] = Number(avlNumGems);
    }

    
    if(gemMineLvl.length==0||Number(gemMineLvl)>10||Number(gemMineLvl)<0)
    {
        error = document.getElementById('err2');
        error.style.visibility = 'visible';
        values[2]=-1;
        
    }
    else
    {
        error = document.getElementById('err2');
        error.style.visibility = 'hidden';
        values[2]=Number(gemMineLvl);
    }
    
    
    if(clockTowerLvl.length==0||Number(clockTowerLvl)>10||Number(clockTowerLvl)<0)
    {
        error = document.getElementById('err3');
        error.style.visibility = 'visible';
        values[3]=-1;
        
    }
    else
    {
        error = document.getElementById('err3');
        error.style.visibility = 'hidden';
        values[3]=Number(clockTowerLvl);
    }
    
    return values;
}
    
        
        
function gemMineAndClockTower(val)
{
let gemMineLvl = val[2];

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



let clockTowerLvl = val[3];

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
//console.log("Net gem mine production per day:"+cgmProductionPerDay);
return cgmProductionPerDay;
}



function gemBoxCounter(values)
{
    let gemBox = document.getElementById('gemBox');
    console.log(values);
    let reqdGems = values[0];
    let avlGems = values[1];
    let count =0;
    let newAvlGems = avlGems;
    let resultTag = document.getElementById('timeTakenText2');


    function newTime()
    {
        newAvlGems +=25;
        console.log(newAvlGems)

        if(newAvlGems>=reqdGems)
        {
            count++;
            document.getElementById('counter').innerHTML=`x${count}`;
            resultTag.innerHTML = `Time Taken:0 days`;
            gemBox.removeEventListener('click' , newTime);
        }
        else
        {
            count++;
            document.getElementById('counter').innerHTML=`x${count}`;
            let reqdTime =reqdTimeCalculate(values, reqdGems, newAvlGems);
            let result = obtainTime(reqdTime);
            resultTag.innerHTML = `Time Taken: ${result[0]}d ${result[1]}h ${result[2]}m ${result[3]}s`;  
        }
    }

    gemBox.addEventListener('click',newTime);

}

function obstacles()
{
    let obstacleNetProdPerDay =0;
    let homeBaseObs = document.getElementById('homeBaseObstacleToggle');
    let BuilderBaseObs = document.getElementById('builderBaseObstacleToggle');

    if(homeBaseObs.checked)
        {
            obstacleNetProdPerDay+=6;
        }
                        
    if(BuilderBaseObs.checked)
        {
            obstacleNetProdPerDay +=6;
        }

    return obstacleNetProdPerDay;
}

function reqdTimeCalculate(values ,reqdGems , avlGems)
{
    let netReqdGems = (Number(reqdGems)) - (Number(avlGems));
    let NetProductionPerDay = gemMineAndClockTower(values) + obstacles();

    let reqdTime = netReqdGems/NetProductionPerDay;
    reqdTime = parseFloat(reqdTime.toFixed(4));         //to round required time to 4 decimal places.
    return reqdTime;

}

function obtainTime(time)
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

function checkType(arr)
{
    for(let i=0;i<(arr.length);i++)
    {
        if (arr[i]===-1)
        {
            return false;
        }
    }
    return true;
}

function mainFunction()
{
    let val = inputValues();
    let resultTag = document.getElementById('timeTakenText1');

    if(checkType(val))
    {
        window.scrollBy({ top: 500, behavior: 'smooth' }); // Scroll down by 500 pixels
        let reqdGems = val[0];
        let avlGems = val[1];
        document.getElementById('counter').innerHTML=`x0`;
        document.getElementById('timeTakenText2').innerHTML = 'Time Taken:';
        
        let elements = document.querySelectorAll('.timeTaken');
        elements.forEach(function(element) {
            element.style.visibility = 'visible';
        });



        if(reqdGems <= avlGems) 
            {
                resultTag.innerHTML = ("Time Taken:0 days");   
                document.getElementById('timeTakenWithGb').style.visibility = 'hidden';
            }
            else
            {
                let reqdTime = reqdTimeCalculate(val, reqdGems , avlGems);
                let result = obtainTime(reqdTime);
                resultTag.innerHTML =`Time Taken: ${result[0]}d ${result[1]}h ${result[2]}m ${result[3]}s`;
                gemBoxCounter(val);
            }
    }
    else{
        resultTag.innerHTML = 'Time Taken: ';
    }
} 



document.getElementById('calcBtn').addEventListener('click',mainFunction);