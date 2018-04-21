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
const AWS = require('aws-sdk');
const Alexa = require('alexa-sdk');


const APP_ID = 'amzn1.ask.skill.54cd8c79-dd8c-4147-850f-22b94cf4e446';

var from=0;
var to=0;
const handlers = {
    
    'LaunchRequest': function () {
        this.emit(':ask', 'welcome to Bhuvan Multiplication Table');
    },
  'rangeintent':function() {
         from=this.event.request.intent.slots.numberfrom.value;
         to=this.event.request.intent.slots.numberto.value;
         this.emit(':ask','Your range is set');
  },
  'showbhuvantableintent': function () {
        if(from!=0 && to!=0)
        {
        var docClient = new AWS.DynamoDB.DocumentClient();
        var tablenumber = this.event.request.intent.slots.number.value;  
        var params = {
             TableName: "TablePictures",
             Key:{
                  "pictureId": 0,
                 },
                 
         UpdateExpression: "set pictureToShow = :newImageNumber",
         ExpressionAttributeValues: {
        ":newImageNumber" : tablenumber
    }
};
docClient.update(params, (() => {
    var tablevoice="";
    
        for(var i=parseInt(from);i<=parseInt(to);i++)
        {
            tablevoice=tablevoice+" "+i+" times "+tablenumber+" is "+(tablenumber*i)+".";
        }
        this.emit(':ask',tablevoice);
       
}));
}
else
{
    this.emit(':ask','Please set the range of tables, by using this phrase set range from this number to this number');
}
        
    },
  
    'AMAZON.HelpIntent': function () {
       this.emit(':tell', 'you want any help from Bhuvan table');
    },
    'AMAZON.CancelIntent': function () {
      this.emit(':tell', 'Bye,Have a nice day . Be happy');
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', 'Bye have a nice day');
    },
    'Unhandled' : function() {
            this.emit(':tell','Hi i am bhuvana vignesh')
   }

};

exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.appId = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
