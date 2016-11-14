var express=require('express');
var app=express();
Date.prototype.valid = function() {
  return this.getTime() === this.getTime();
};

var port = process.env.PORT||8080;

app.get('/', function(req,res){
    res.send("Testing");
});

app.get('/:Date',function(req,res){
   var response={ "unix": null, "natural": null };
  
   if(isNaN(req.params.Date)){
      var d = new Date(req.params.Date);
     
      if(Date.parse(req.params.Date)){
        response.unix=d.getTime() / 1000;
        response.natural=req.params.Date;
      }
   }else{
      
      var d = new Date(req.params.Date*1000);
      if(d.getTime()!==null){
        var dateString=naturalDateString(d);
        response.natural=dateString;
        response.unix=req.params.Date;
      }
   }
    res.send(response);
});

function naturalDateString(d){
    var months={0:'January',1:'February',2:'March',3:'April',4:'May',5:'June',6:'July',7:'August',8:'September',9:'October',10:'November',11:'December'};
    return months[d.getMonth()]+" "+d.getDate()+", "+d.getFullYear();
}

app.listen(port,function(){
    console.log('serverstarted');
});