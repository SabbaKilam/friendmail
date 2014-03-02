window.onload = function(){
  //===================================
  //data
    var rawRecordsData = "";
    var assocArrayOfRecords = [];
    var ajax = new XMLHttpRequest();
    
  //===================================
  //event handlers
    //select dropdown box handler
    id('selEmail').onchange = mailOrNot;    
    //double click on Select options element
    id('selEmail').ondblclick = mailOrNot;

  //ajax event handler
  ajax.onload = function(){
    if( ajax.status === 200 || ajax.status === 0){
      rawRecordsData = ajax.responseText;
      makeAssocArrayOfRecords(rawRecordsData);
      populateDropdownList(assocArrayOfRecords);
    }
    else{
      alert("You got Ajax problems");
    }
  }
  //===================================  
  //functions
    function makeAssocArrayOfRecords(rawData){
      var arrayRecords = rawData.split('\r');
      //pull out the header and alphabetize
      arrayRecords.splice(0, 1);  //At index=0, remove 1 array element
      arrayRecords.sort(); //alphabetize array elements
      for(var i=0; i< arrayRecords.length; i++){
        var arrayNextRecord = arrayRecords[i].split(',');
        assocArrayOfRecords[i] = {
            lastname: arrayNextRecord[0].replace("\n",""),
            firstname: arrayNextRecord[1],
            email: arrayNextRecord[2]
        };
        //arrayNextRecord[0].replace(/(\r\n|\n|\r)/,"") also works
      }
    }
  
    //get ID wrapper
    function id(identifier){
      return document.getElementById(identifier);
    }
    
    //emails seleced person
    function sendEmail(emailID){
        window.location.assign("mailto:" + " " + emailID);
    }
    
    //to mail or not to mail
    function mailOrNot(){        
        if( id('selEmail').selectedIndex !== 0 ){
            var i = id('selEmail').selectedIndex - 1;
            var aar = assocArrayOfRecords;
            var chosenPersonEmail = aar[i].firstname + " " + aar[i].lastname + " " + aar[i].email;
            var chosenPerson = aar[i].firstname + " " + aar[i].lastname;
            var yes = confirm('Okay to Email '+ chosenPerson  +'?');   
            if(yes){
               sendEmail(chosenPersonEmail);
            }
        }      
    }
    
    //populate the Select option dropdown list
    function populateDropdownList(aar){
      for(var i = 0; i < aar.length; i++){//start at idex = 1, which is below the heading
        var textNode = document.createTextNode(aar[i].lastname + ", " + aar[i].firstname);
        var optElem = document.createElement('option');
        optElem.appendChild(textNode);
        //Don't use innerHTML!!! optElem.innerHTML = oneRecord;
        id('selEmail').appendChild(optElem);
      }
    }
  //===============================    
  //main actions
  ajax.open('GET','friendMail.csv',true);
    try{
        ajax.send(null);
    }
    catch(e){
        alert("Connection issue\n" +e);
    }
}//end of window.onload handler