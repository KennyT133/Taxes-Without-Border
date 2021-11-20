var finalPriceAdd = 0;
var holdFinal = 0;
function priceType()
{
  var productType = document.getElementById("productSelect").value;
  if(productType == "Retail")
  {
    finalPriceRetail();
  
  }
  else if(productType ==  "Medical Marijuana")
  {
    finalPriceMedical();
 
  }
  else if(productType == "Recreational Marijuana"){
    finalPriceRec();
    
  }
}

function validState()
{
  const stateArray = ["AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"];
  var inputState = document.getElementById("statename").value;
  var validInput = false;
  var i;
  for(i = 0; i < 50; i++)
  {
    if(stateArray[i] == inputState)
    {
      validInput = true;
    }
  }
  if(validInput == false)
  {
    document.getElementById("stateValid").innerHTML = "Enter a valid state with uppercase abbreviation.";
  }
  if(validInput == true)
  {
    document.getElementById("stateValid").innerHTML = "";
  }
}
function finalPriceRetail()
{
  const stateArray = ["AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"];
  const retailTax = [.04,0,.056,.065,.0725,.029,.0635,0,.06,.06,.04,.06,.0625,.07,.06,.065,.06,.0445,.05,.06,.0625,.06,.0688,.07,.0423,0,.055,.0685,0,.0665,.0513,.04,.0475,.05,.0575,.045,0,.06,.07,.06,.045,.07,.0625,.0595,.06,.053,.065,.06,.05,.04];
  var state = document.getElementById("statename").value;
  var price = document.getElementById("priceval").value;
  var pos = true;
  var x = parseFloat(price);
  var finalPrice;
  var returnPrice = parseFloat(price);
  var i;
  var y = Math.sign(x);
  if(x < 0)
  {
    pos = false;
    document.getElementById("demo").innerHTML = "Product price can not be a negative number."
  }
  else{
    pos = true;
    document.getElementById("demo").innerHTML = "";
  }
 if(pos == true){
  for(i = 0; i < stateArray.length; i++)
  {
    if(state == stateArray[i])
    {
      x = price * retailTax[i];
      finalPrice = Math.round(x*100)/100;
      returnPrice += finalPrice;
      
    document.getElementById("demo").innerHTML=returnPrice;
    finalPriceAdd = returnPrice;
    }
    
  }
 }
 
}

function finalPriceMedical()
{
  const stateArray = ["AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"];
  const medArray = [.09,0,.086,.105,.15,.029,.0635,0,.06,"Illegal",.04,"Illegal",.01,"Illegal",.06,"Illegal","Illegal",0,.15,0,0,.06,0,"Illegal",.04,.04,"Illegal",.0685,0,.0865,.0513,.11,"Illegal",.05,.0575,.115,.17,0,"Illegal","Illegal",0,"Illegal","Illegal",0,0,"Illegal",.065,0,"Illegal","Illegal"];
  var pos = true;
  var state = document.getElementById("statename").value;
  var price = document.getElementById("priceval").value;
  var x = parseFloat(price);
  var finalPrice;
  var returnPrice = parseFloat(price);
  var legal = false;
  var i;
  if(x < 0)
  {
    pos = false;
    document.getElementById("demo").innerHTML = "Product price can not be a negative number."
  }
  else{
    pos = true;
    document.getElementById("demo").innerHTML = "";
  }
  if(pos == true)
  {
  for(i = 0; i < 50; i++)
  {
    if(state == stateArray[i] && medArray[i] != "Illegal")
    {
      x = price * medArray[i];
      finalPrice = Math.round(x*100)/100;
      returnPrice += finalPrice;
      legal = true;
    document.getElementById("demo").innerHTML=returnPrice;
     finalPriceAdd = returnPrice;
    }
  }
  if(legal == false)
  {
    document.getElementById("demo").innerHTML="It is illegal in this state.";
     finalPriceAdd = 0;
  }
}
}

function finalPriceRec()
{
 
  const stateArray = ["AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"];
  
  const recArray = [.11,.05,.216,.105,.23,.179,.1635,"Illegal","Illegal","Illegal","Illegal","Illegal",.20,"Illegal","Illegal","Illegal","Illegal","Illegal",.18,"Illegal",.17,.16,"Illegal","Illegal","Illegal",.2,"Illegal",.1685,"Illegal","Illegal","Illegal","Illegal","Illegal","Illegal","Illegal","Illegal","Illegal",.11,"Illegal","Illegal",.19,"Illegal","Illegal","Illegal",.2,"Illegal",.43,"Illegal","Illegal","Illegal"];
  
  var pos = true;
  var state = document.getElementById("statename").value;
  var price = document.getElementById("priceval").value;
  var y = parseFloat(price);
  var finalPrice;
  var returnPrice = parseFloat(price);
  var legal = false;
  var i;
  if(y < 0)
  {
    pos = false;
    document.getElementById("demo").innerHTML = "Product price can not be a negative number."
  }
  else{
    pos = true;
    document.getElementById("demo").innerHTML = "";
  }
  if(pos == true){
  for(i = 0; i < stateArray.length; i++)
  {
    if(state == stateArray[i] && recArray[i] != "Illegal")
    {
      y = price * recArray[i];
      finalPrice = Math.round(y*100)/100;
      returnPrice += finalPrice;
      legal = true;
    document.getElementById("demo").innerHTML=returnPrice;
    finalPriceAdd = returnPrice;
    }
  }
  if(legal == false)
  {
    
    document.getElementById("demo").innerHTML="It is illegal in this state.";
    finalPriceAdd = 0;
  }
}
}

function addPrices()
{

  var priceAdd = holdFinal + finalPriceAdd;
  priceAdd = Math.round(priceAdd*100)/100;
  
  if(priceAdd == 0)
  {
    document.getElementById("addPrices").innerHTML= "No products have been entered."
    holdFinal = priceAdd;
  }
  else{
    document.getElementById("addPrices").innerHTML= priceAdd;
    holdFinal = priceAdd;
  }
}
