//var members=data.results[0].members
function getdata(){
    
    fetch('https://api.propublica.org/congress/v1/113/senate/members.json', {
        
        headers: new Headers({
            "X-API-Key":"TWD3eCQJlbdwwNdbtoTSgnA6N9hIVgvvTbnRu0Rx"
        })
    })
.then(response => response.json())
.then(data => {
    var members=data.results[0].members
    var statistics= { 
        numberofdemocrats:getrepresentatives(members,"D"),
        numberofrepublicans:getrepresentatives(members,"R"),
        numberofindependents:getrepresentatives(members,"I"),
        democratsvotingwiththeirparty:votesPartyAverage(members,"D"),
        republicansvotingwiththeirparty:votesPartyAverage(members,"R"),
        indepentsvotingwiththeirparty:votesPartyAverage(members,"I"),
        totalrepresentatives:getTotal(members),
        totalpercentage:getTotalPct(members),
        membersmostoftendonotvotewiththeirparty:leastLoyalRep(members),
        membersmostoftentvotewiththeirparty:MostloyalRep(members),
        membersmissedthemostvotes: leastEngagedRep(members),
        membersmissedtheleastvotes:mostEngagedRep(members), 
     }
    senAtGlance(statistics)
    senEngagetbl(statistics.membersmissedthemostvotes, "least-engaged-sen")
    senEngagetbl(statistics.membersmissedtheleastvotes, "sen-most")
})
.catch(error => console.error(error))

}
getdata()


    function getrepresentatives(array, partycode){
       var numbers=[]
        array.forEach(senator => {
            if(senator.party==partycode) {
                numbers.push(senator)

            }   
        });
       return numbers.length 
    }
getrepresentatives(members,"D")
getrepresentatives(members,"R")
getrepresentatives(members,"I")


function senAtGlance(object){
    console.log(object)
    var republicans=document.getElementById("Reps-row")
    var democrats=document.getElementById("Dems-row")
    var independents=document.getElementById("Inds-row")
    var total=document.getElementById("Total-row")
    
    republicans.insertCell().innerHTML=object.numberofrepublicans
    republicans.insertCell().innerHTML=object.republicansvotingwiththeirparty
    democrats.insertCell().innerHTML=object.numberofdemocrats
    democrats.insertCell().innerHTML=object.democratsvotingwiththeirparty
    independents.insertCell().innerHTML=object.numberofindependents
    independents.insertCell().innerHTML=object.indepentsvotingwiththeirparty
    total.insertCell().innerHTML=object.totalrepresentatives
    total.insertCell().innerHTML=object.totalpercentage
}


function getTotal(array){
    return array.length
}

function getTotalPct(array){
    var total=[]
    array.forEach(senator=>{
        total.push(senator.votes_with_party_pct)
       
        


    })
     var x =total.reduce((a,b)=>a+b)
     
     return (x/array.length).toFixed(2)
}

function mostEngagedRep( array){
    var missedvotes=[]
    var final=[]
    array.forEach(senator => {
    if(senator.total_votes !=0 ){
        missedvotes.push(senator.missed_votes_pct)
        //console.log(missedvotes)
    } 
         });
    var perc  =Math.floor((array.length/100) * 10)
var y =missedvotes.sort(function (a, b) {  return a - b;  }).slice(0,perc)
    //console.log(y)
    var max=Math.max.apply(null, y)
    console.log(max)
    array.forEach(senator=>{
        if (senator.missed_votes_pct <= max){
         final.push(senator)
        }
    })
     return final
}

function leastEngagedRep( array){
    
    var missedvotes=[]
    var final=[]
    array.forEach(senator => {
    if(senator.total_votes !=0 ){
        missedvotes.push(senator.missed_votes_pct)
        //console.log(missedvotes)
    } 
         });
    var perc  =Math.floor((array.length/100) * 10)
var y =missedvotes.sort(function (a, b) {  return b - a;  }).slice(0,perc)
    //console.log(y)
    var min=Math.min.apply(null, y)
    console.log(min)
    array.forEach(senator=>{
        if (senator.missed_votes_pct >= min){
         final.push(senator)
        }
    })
    return final
}

function votesPartyAverage( array,partycode){
    
    var missedvotes=[]
    var final=[]
    var x;
    array.forEach(senator => {
    if(senator.party == partycode ){
        missedvotes.push(senator.votes_with_party_pct)
        
        x= missedvotes.reduce((a, b)=>a + b);
        console.log(x/missedvotes.length)
    }
    });
    x=(x/missedvotes.length).toFixed(2);
    console.log(x)
    return x 

    
}
//votesPartyAverage(members, "D")
//votesPartyAverage(members, "I")
//votesPartyAverage(members, "R")

function senEngagetbl(array,id){
    var tbody=document.getElementById(id)
    array.forEach(senator=>{
        var trow= document.createElement("tr")
        
        trow.insertCell().innerHTML=senator.first_name+ " "+senator.last_name
        trow.insertCell().innerHTML=senator.missed_votes
        trow.insertCell().innerHTML=senator.missed_votes_pct 
        tbody.appendChild(trow)

        
    })
    
}
//senEngagetbl(statistics.memberswhomissedthemostvotes, "least-engaged-sen")
//senEngagetbl(statistics.memberswhomissedtheleastvotes, "sen-most")

var members=data.results[0].members

 

function MostloyalRep( array){
    
    var missedvotes=[]
    var final=[]
    array.forEach(senator => {
    if(senator.total_votes !=0 ){
        missedvotes.push(senator.votes_with_party_pct)
        //console.log(missedvotes)
    } 
         });
    var perc  =Math.floor((array.length/100) * 10)
var y =missedvotes.sort(function (a, b) {  return b - a;  }).slice(0,perc)
    //console.log(y)
    var min=Math.min.apply(null, y)
    console.log(min)
    array.forEach(senator=>{
        if (senator.votes_with_party_pct >= min){
         final.push(senator)
        }
    })
    return final
}

function leastLoyalRep( array){
    var missedvotes=[]
    var final=[] 
    array.forEach(senator => {
    if(senator.total_votes !=0 ){
        missedvotes.push(senator.votes_with_party_pct)
        //console.log(missedvotes)
    } 
         });
    var perc  =Math.floor((array.length/100) * 10)
var y =missedvotes.sort(function (a, b) {  return a - b;  }).slice(0,perc)
    //console.log(y)
    var max=Math.max.apply(null, y)
    console.log(max)
    array.forEach(senator=>{
        if (senator.votes_with_party_pct <= max){
         final.push(senator)
        }
    })
    return final
}
//console.log(statistics.memberswhomissedthemostvotes)
function senEngagetbl(array,id){
    var tbody=document.getElementById(id)
    array.forEach(senator=>{
        var trow= document.createElement("tr")
        
        trow.insertCell().innerHTML=senator.first_name+ " "+senator.last_name
        trow.insertCell().innerHTML=senator.missed_votes
        trow.insertCell().innerHTML=senator.missed_votes_pct 
        tbody.appendChild(trow)

        
    })
    
}


