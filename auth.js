// This is a JavaScript file
var auth = {};


auth.httpAsyncGet = function(theUrl,requesttype,params)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        //console.log(xmlHttp.responseText);
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
            //callback(xmlHttp.responseText);
            console.log(xmlHttp.responseText);
            //auth.flag=true;
            tokenStorage.setToken(xmlHttp.responseText.token);
            //customer.customers = JSON.parse(customerStorage.retrieve());
            //customer.customers = JSON.parse(xmlHttp.responseText);
        }
    }
    console.log(params);

    xmlHttp.open(requesttype, theUrl, true); // true for asynchronous 
    //xmlHttp.setRequestHeader("Origin","*");
    //console.log("responseHeader: "+xmlHttp.getAllResponseHeaders());

    xmlHttp.send(params);
};

auth.loginrequest=function(username, password){
  var data = "username="+username+"&password="+password;

  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4 && this.status == 200) {
    console.log(this.responseText);
    //console.log(JSON.parse(this.responseText).message);
    if(JSON.parse(this.responseText).message==="ok"){
      tokenStorage.setToken(JSON.parse(this.responseText).token);
      console.log("Token is stored");
      //app.onEnterClick();
    }
    app.onEnterClick();
  }
  });

  xhr.open("POST", "https://api.cloudpeddler.com/users/login");
  //xhr.setRequestHeader("cache-control", "no-cache");
  //xhr.setRequestHeader("postman-token", "13fbb1e9-c044-6edb-de33-d5cb3c9295fc");
  xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");

  //process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

  xhr.send(data);
};

auth.login = function(username, password) {
  //var username = document.getElementById('username').value;
  //var password = document.getElementById('password').value;
  var params = 'username='+username+'&password='+password;
  var url="https://qr.mnegosyo.com/users/login";
  var requesttype='POST';
  //console.log("Checkpoint 1");
  auth.loginrequest();
  var token = tokenStorage.getToken();
  return "token";
};

auth.authenticated = function(){
  var token = tokenStorage.getToken();
  
  if(token){
    console.log("What is token from tokenStorage: "+tokenStorage.getToken());
    return true;
  }else{
    return false;  
}
};