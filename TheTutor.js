/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit.
 * This sample supports multiple lauguages. (en-US, en-GB, de-DE).
 * The Intent Schema, Custom Slots and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/alexa/skill-sample-nodejs-fact
 **/

'use strict';
const Alexa = require('alexa-sdk');
const AWS = require('aws-sdk');
AWS.config.update({
  region: "us-east-1"
});


//=========================================================================================================================================
//TODO: The items below this comment need your attention.
//=========================================================================================================================================

//Replace with your app ID (OPTIONAL).  You can find this value at the top of your skill's page on http://developer.amazon.com.
//Make sure to enclose your value in quotes, like this: const APP_ID = 'amzn1.ask.skill.bb4045e6-b3e8-4133-b650-72923c5980f1';
const APP_ID = 'amzn1.ask.skill.2c607f99-8e34-4f98-b058-cee337d1671d';

//=========================================================================================================================================
//Editing anything below this line might break your skill.
//=========================================================================================================================================
var classname=null;
var institutionname=null;
const handlers = {
    'LaunchRequest': function () {
        //this.emit('GetNewFactIntent');
        
        this.emit(':ask','Welcome to The Tutor , Register your institution by using this phrase my institution name is this institution');
    },
    'get_institution_name':function(){
       institutionname=this.event.request.intent.slots.institutename.value;
       institutionname=institutionname.toUpperCase();
               // Create the DynamoDB service object
         var dynamodb = new AWS.DynamoDB();

var params = {
    TableName : institutionname,
    KeySchema: [       
        { AttributeName: "Class", KeyType: "HASH"},  //Partition key
        { AttributeName: "Rollno", KeyType: "RANGE" }  //Sort key
    ],
    AttributeDefinitions: [       
        { AttributeName: "Class", AttributeType: "S" },
        { AttributeName: "Rollno", AttributeType: "N" }
    ],
    ProvisionedThroughput: {       
        ReadCapacityUnits: 5, 
        WriteCapacityUnits: 5
    }
};
dynamodb.createTable(params,(()=>{
        this.emit(':ask','Your institution is stored');
}));
/*dynamodb.createTable(params, function(err, data) {
    if (err) {
        this.emit(':tell','There is Some Error, contact admin');
        console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        this.emit(':ask','Your institution is Stored');
        console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
    }
});*/
       //this.emit(':ask','Your institution '+institutionname+' is stored');
    },
    'take_attendance':function(){
    
       var classname1=this.event.request.intent.slots.classname.value;
       var classnumber1=this.event.request.intent.slots.ordinalnum.value;
        classname1=classname1.toUpperCase();
        classnumber1=classnumber1.toUpperCase();
        if(classnumber1=="SECOND" || classnumber1=="2ND")
           classname="2"+classname1;
        if(classnumber1=="FIRST" || classnumber1=="1ST")
           classname="1"+classname1;
        if(classnumber1=="THIRD" || classnumber1=="3RD")
           classname="3"+classname1;
        if(classnumber1=="FOURTH" || classnumber1=="4TH")
           classname="4"+classname1;
        if(classnumber1=="FIFTH" || classnumber1=="5TH")
           classname="5"+classname1;
        if(classnumber1=="SIXTH" || classnumber1=="6TH")
           classname="6"+classname1;
        if(classnumber1=="SEVENTH" || classnumber1=="7TH")
           classname="7"+classname1;
        if(classnumber1=="EIGHTH" || classnumber1=="8TH")
           classname="8"+classname1;
        if(classname!=null)
          this.emit(':ask','Attendance for '+classnumber1+'  '+classname1);  
        else
          this.emit(':ask','Please tell the Classname clearly');
     
    },
    'taking_attendance':function()
    {
     var present=[];
     var absent=[];
     
     /*var flag=true;
      while(flag)
      {
          temp.push(parseInt(this.event.request.intent.slots.numberone.value));
      } */
      if(this.event.request.intent.slots.statusone.value=='present')
      present.push(parseInt(this.event.request.intent.slots.numberone.value,10));
      else if(this.event.request.intent.slots.statusone.value=='absent')
      absent.push(parseInt(this.event.request.intent.slots.numberone.value,10));
      
      if(this.event.request.intent.slots.statustwo.value=='present')
      present.push(parseInt(this.event.request.intent.slots.numbertwo.value,10));
      else if(this.event.request.intent.slots.statustwo.value=='absent')
      absent.push(parseInt(this.event.request.intent.slots.numbertwo.value,10));
      
       if(this.event.request.intent.slots.statusthree.value=='present')
      present.push(parseInt(this.event.request.intent.slots.numberthree.value,10));
      else if(this.event.request.intent.slots.statusthree.value=='absent')
      absent.push(parseInt(this.event.request.intent.slots.numberthree.value,10));
      
       if(this.event.request.intent.slots.statusfour.value=='present')
      present.push(parseInt(this.event.request.intent.slots.numberfour.value,10));
      else if(this.event.request.intent.slots.statusfour.value=='absent')
      absent.push(parseInt(this.event.request.intent.slots.numberfour.value,10));
      
       if(this.event.request.intent.slots.statusfive.value=='present')
      present.push(parseInt(this.event.request.intent.slots.numberfive.value,10));
      else if(this.event.request.intent.slots.statusfive.value=='absent')
      absent.push(parseInt(this.event.request.intent.slots.numberfive.value,10));
      
       if(this.event.request.intent.slots.statussix.value=='present')
      present.push(parseInt(this.event.request.intent.slots.numbersix.value,10));
      else if(this.event.request.intent.slots.statussix.value=='absent')
      absent.push(parseInt(this.event.request.intent.slots.numbersix.value,10));
      
       if(this.event.request.intent.slots.statusseven.value=='present')
      present.push(parseInt(this.event.request.intent.slots.numberseven.value,10));
      else if(this.event.request.intent.slots.statusseven.value=='absent')
      absent.push(parseInt(this.event.request.intent.slots.numberseven.value,10));
      
       if(this.event.request.intent.slots.statuseight.value=='present')
      present.push(parseInt(this.event.request.intent.slots.numbereight.value,10));
      else if(this.event.request.intent.slots.statuseight.value=='absent')
      absent.push(parseInt(this.event.request.intent.slots.numbereight.value,10));
      
       if(this.event.request.intent.slots.statusnine.value=='present')
      present.push(parseInt(this.event.request.intent.slots.numbernine.value,10));
      else if(this.event.request.intent.slots.statusnine.value=='absent')
      absent.push(parseInt(this.event.request.intent.slots.numbernine.value,10));
      
       if(this.event.request.intent.slots.statusten.value=='present')
      present.push(parseInt(this.event.request.intent.slots.numberten.value,10));
      else if(this.event.request.intent.slots.statusten.value=='absent')
      absent.push(parseInt(this.event.request.intent.slots.numberten.value,10));
      
       if(this.event.request.intent.slots.statuseleven.value=='present')
      present.push(parseInt(this.event.request.intent.slots.numbereleven.value,10));
      else if(this.event.request.intent.slots.statuseleven.value=='absent')
      absent.push(parseInt(this.event.request.intent.slots.numbereleven.value,10));
      
       if(this.event.request.intent.slots.statustwelve.value=='present')
      present.push(parseInt(this.event.request.intent.slots.numbertwelve.value,10));
      else if(this.event.request.intent.slots.statustwelve.value=='absent')
      absent.push(parseInt(this.event.request.intent.slots.numbertwelve.value,10));
      
       if(this.event.request.intent.slots.statusthirteen.value=='present')
      present.push(parseInt(this.event.request.intent.slots.numberthirteen.value,10));
      else if(this.event.request.intent.slots.statusthirteen.value=='absent')
      absent.push(parseInt(this.event.request.intent.slots.numberthirteen.value,10));
      
       if(this.event.request.intent.slots.statusfourteen.value=='present')
      present.push(parseInt(this.event.request.intent.slots.numberfourteen.value,10));
      else if(this.event.request.intent.slots.statusfourteen.value=='absent')
      absent.push(parseInt(this.event.request.intent.slots.numberfourteen.value,10));
      
       if(this.event.request.intent.slots.statusfifteen.value=='present')
      present.push(parseInt(this.event.request.intent.slots.numberfifteen.value,10));
      else if(this.event.request.intent.slots.statusfifteen.value=='absent')
      absent.push(parseInt(this.event.request.intent.slots.numberfifteen.value,10));
    //  var status2 = this.event.request.intent.slots.statustwo.value;
    /*  var test1  = this.event.request.intent.slots.number.value[0];
      var test2  = this.event.request.intent.slots.number.value[1];
      var test3 = this.event.request.intent.slots.number.value[2]; */
     var presentees=present.toString();
     //presentees=presentees.replace(/,/g," ");  
     
     var absentees=absent.toString();
     //absentees=absentees.replace(/,/g," ");
  
  if(institutionname!=null)
   {
             if(classname != null )
             {
              var d = new Date();
              var currentdate = d.getUTCDate().toString()+"."+(d.getUTCMonth()+1).toString()+"."+d.getUTCFullYear().toString();
              currentdate=currentdate.trim();
              classname=classname.trim();
              var docClient = new AWS.DynamoDB.DocumentClient();
              present.forEach(function (element){
                var params = {
                     TableName: institutionname,
                     Key:{
                          
                          "Class" : classname,
                          "Rollno" : parseInt(element,10),
                         },
                         
                 UpdateExpression: "set #attriName = :newDate",
                 ExpressionAttributeNames: {
                 //  "#nameoftheclass" : classname ,
                   "#attriName" : currentdate
                 },
                 ExpressionAttributeValues: {
                
                ":newDate" : "present"
            }
        };
       /* docClient.update(params,  function (err, data)  {
           
           //this.emit(':ask',' Absentees are '+absent+', Presentees are '+present+', Number of absentees are '+absent.length) ;
            if (err)
                console.log(JSON.stringify(err, null, 2));
            else
                console.log(JSON.stringify(data, null, 2));
            
        });*/
        docClient.update(params, (() => {
        
        //this.emit(':ask','Hi i am bhuvan');
        
       
}));
        });
          absent.forEach(function (element1){
                var params = {
                     TableName: institutionname,
                     Key:{
                          
                          "Class" : classname,
                          "Rollno" : parseInt(element1,10),
                         },
                         
                 UpdateExpression: "set #attriName = :newDate",
                 ExpressionAttributeNames: {
                 //  "#nameoftheclass" : classname ,
                   "#attriName" : currentdate
                 },
                 ExpressionAttributeValues: {
                
                ":newDate" : "absent"
            }
        };
       /* docClient.update(params,  function (err, data)  {
           
           //this.emit(':ask',' Absentees are '+absent+', Presentees are '+present+', Number of absentees are '+absent.length) ;
            if (err)
                console.log(JSON.stringify(err, null, 2));
            else
                console.log(JSON.stringify(data, null, 2));
            
        });*/
        docClient.update(params, (() => {
        
        //this.emit(':ask','Hi i am bhuvan');
        
       
}));
        });
     //   if(flag!="NONE")
           this.emit(':ask','Absentees are '+absentees+' Presentees are '+presentees+'. Number of Absentees are '+absent.length+'. Number of presentees are '+present.length);
    //    else
       //    this.emit(':ask','Error occured Contact Admin');
            }
      else
      {
        this.emit(':ask','Please tell which class name clearly, by using this phrase take entry for this class');
      }
   }    
   else
   {
      this.emit(':ask','Please give the institution name by using this phrase my institution name is this institution');
    
   }
   },
    /*'GetNewFactIntent': function () {
        const factArr = data;
        const factIndex = Math.floor(Math.random() * factArr.length);
        const randomFact = factArr[factIndex];
        const speechOutput = GET_FACT_MESSAGE + randomFact;

        this.response.cardRenderer(SKILL_NAME, randomFact);
        this.response.speak(speechOutput);
        this.emit(':responseReady');
    },*/
    'AMAZON.HelpIntent': function () {
      /*  const speechOutput = HELP_MESSAGE;
        const reprompt = HELP_REPROMPT;

        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady'); */
        this.emit(':tell','Any help contact 8870984909');
    },
    'AMAZON.CancelIntent': function () {    
        /*
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady'); */
        this.emit(':tell','Thanks for using The tutor')
    },
    'AMAZON.StopIntent': function () {
        /*
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
        */
        this.emit(':tell','Thanks for using The Tutor');
    },
};

exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.appId = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
