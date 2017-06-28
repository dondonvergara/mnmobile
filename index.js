/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
        //console.log("This is executed 1");
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {

        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.getElementById("enter-button").addEventListener("click", this.onEnterClick, false);
        //document.getElementById("signout-button").addEventListener("click", this.onSignoutClick, false);


        //document.getElementById("signin-button").addEventListener("click", this.onClick, false);
        //document.getElementById("btn").addEventListener('click', this.onClick, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },

    onSignInLoad: function() {
        app.receivedSignInLoad('load');
        //console.log("Hello");
    },

    onClick: function() {
        app.receivedClick('click');
        //console.log("Hello");
    },

    onSignoutClick: function() {
        app.receivedSignoutClick('signoutclick');
        //console.log("Hello");
    },

    onReloadClick: function() {
        app.receivedReloadEvent('reloadclick');
        //console.log("Hello");
    },

    onEnterClick: function() {
        app.receivedEnterClick('enterclick');
        //console.log("Hello");
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        console.log('Received Event: ' + id);
    },

    receivedReloadEvent: function(id) {
        console.log('Received Event: ' + id);
        customer.qr_call();
        //customer.customers = customerStorage.retrieve();
        document.getElementById('myNavigator').resetToPage('main.html');
        //console.log('Received Event: ' + id);
    },

    receivedSignInLoad: function(id) {
        //var parentElement = document.getElementById(id);
        //var listeningElement = parentElement.querySelector('.listening');
        //var receivedElement = parentElement.querySelector('.received');

        //listeningElement.setAttribute('style', 'display:none;');
        //receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);

        //console.log('Received Event: ' + id);
        
    },

    receivedClick: function(id) {
        //var parentElement = document.getElementById(id);
        //var listeningElement = parentElement.querySelector('.listening');
        //var receivedElement = parentElement.querySelector('.received');

        //listeningElement.setAttribute('style', 'display:none;');
        //receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);

        //console.log('Received Event: ' + id);
        

        
    },

    receivedSignoutClick: function(id) {
        //var parentElement = document.getElementById(id);
        //var listeningElement = parentElement.querySelector('.listening');
        //var receivedElement = parentElement.querySelector('.received');

        //listeningElement.setAttribute('style', 'display:none;');
        //receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
        console.log('Token value1: ' + tokenStorage.getToken());
        tokenStorage.removeToken();
        console.log('Token value2: ' + tokenStorage.getToken());

        //document.getElementById('myNavigator').resetToPage('enter.html');
        //app.initialize();
        window.location.reload(false); 

        //console.log('Received Event: ' + id);
        

        
    },

    receivedEnterClick: function(id) {


        //console.log('Received Event: ' + id +" "+auth.authenticated());
        if(auth.authenticated()){
            document.getElementById('myNavigator').replacePage('main.html');
        }else{
            document.getElementById('myNavigator').replacePage('signin.html');
        }

 //       if(tokenStorage.validToken()){
 //         document.getElementById('myNavigator').replacePage('main.html');
 //       else
 //           document.querySelector('#signin-button').addEventListener('click', function(){
 //           var username = document.getElementById("username").value;
 //           var password = document.getElementById("password").value;
 
 //           var token = auth.login(username,password);
 //           tokenStorage.setToken(token);
 //         document.getElementById('myNavigator').replacePage('main.html');
      
 // });
//}

        
    },

    //hello: function(id){
    //    console.log("Hello");
    //}

    selectpm: function (event) {
              document.getElementById('paymentmode').removeAttribute('modifier');
              document.getElementById('paymentmode').setAttribute('modifier', event.target.value);
              console.log("picked: "+event.target.value);
              }
};

