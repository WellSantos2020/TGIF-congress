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
    membersmostoftentvotewiththeirparty:MostloyalRep(members)
  
 }
 

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
    console.log(final)
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
    console.log(final)
}