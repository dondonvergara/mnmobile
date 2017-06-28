//console.log('This triggered');
var customer = {
    filterFlag: 'all',
    base_url: "https://api.cloudpeddler.com",
    customers: [],
    loans: [],
    payments: [],
    lpc: [],
    custevents: [],
    loanevents: []
//    customers: [{"cust_id":444,"customername":"Aina","firstname":"Raina","lastname":"Vergara","balance":300000,"amount":400000},{"cust_id":333,"customername":"Rag","firstname":"Ragner","lastname":"Vergara","balance":300000,"amount":400000},{"cust_id":111,"customername":"Violeta","firstname":"Violeta","lastname":"Alcantara","balance":300000,"amount":400000},{"cust_id":222,"customername":"Alexandra","firstname":"Alexandre","lastname":"Cuyegkeng","balance":300000,"amount":50000}],
    //loans: [{"loan_id":1234,"loancode":"Aina 1","amount":"10000","balance":"12000"},{"loan_id":1444,"loancode":"Mayec2","amount":"15000","balance": "8000"},{"loan_id":1434,"loancode":"Mags 1","amount":"100000","balance":"120000"},{"loan_id":4321,"loancode":"Ryzel 1","amount":"20000","balance":"22000"}]
    //events: []
       //custevents: []
    };


customer.httpAsyncGet = function(theUrl,requesttyp,params)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        //console.log(xmlHttp.responseText);
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
            //callback(xmlHttp.responseText);
            console.log(xmlHttp.responseText);
            
            //customerStorage.save(xmlHttp.responseText);
            //customer.customers = JSON.parse(customerStorage.retrieve());
            //customer.customers = JSON.parse(xmlHttp.responseText);
        }
    }
    xmlHttp.open(requesttype, theUrl, true); // true for asynchronous 
    //xmlHttp.setRequestHeader("Origin","*");
    //console.log("responseHeader: "+xmlHttp.getAllResponseHeaders());
    xmlHttp.send(params);
};

customer.qr_callback = function(data){
    customerStorage.save(data);
    //console.log("We are online. qr_callback executed.");
    customer.displayconnectstatus("ONLINE");
};


customer.qr_call = function(){
    var s = document.createElement("script");
    s.src = customer.base_url+"/customers?q=custlist";
    //if(s.src=='Unauthorized'){
    //  console.log("The call was unauthorized!!!: "+s.src);
    //}
    document.body.appendChild(s);
};

customer.qr_callbackloanspercust = function(data){
    //console.log(data);
    customerStorage.savelpc(data);
};

customer.qr_callloanspercust = function(customer_id){
    var customer_id = customer_id;
    //console.log("LOAN ID:"+loan_id);
    var s = document.createElement("script");
    s.src = customer.base_url+"/customers/"+customer_id+"?q=loanlistpercustomer";
    document.body.appendChild(s);
    //customer.payments = callback(loan_id);
    //callback(evttarget,customerStorage.retrieve(loan_id));
};

customer.qr_callbackloans = function(data){
    customerStorage.saveloan(data);
};

customer.qr_callloans = function(){
    var s = document.createElement("script");
    s.src = customer.base_url+"/loans?q=loanlist";
    document.body.appendChild(s);
};

customer.qr_callbackpayments = function(data){
    //console.log(data);
    customerStorage.savepayment(data);
};

customer.qr_callpayments = function(loan_id){
    var loan_id = loan_id;
    //console.log("LOAN ID:"+loan_id);
    var s = document.createElement("script");
    s.src = customer.base_url+"/loans/"+loan_id+"?q=paymentlist";
    document.body.appendChild(s);
    //customer.payments = callback(loan_id);
    //callback(evttarget,customerStorage.retrieve(loan_id));
};

document.addEventListener('init', function(event) {
  var page = event.target;

  console.log("Init triggered");
  customer.customers = [];

  if(page.id==='signout'){
    document.getElementById("signout-button").addEventListener("click", app.onSignoutClick, false);
  }else if(page.id === 'signin'){
      console.log("Signin Page is init ");
      if(auth.authenticated()){
      	document.getElementById('myNavigator').replacePage('main.html');
      }else{
      	 document.getElementById("signin-button").addEventListener("click", function(){
    //  	app.onClick, false);
    //  document.querySelector('#signin-button').addEventListener('click', function(){
          var username = document.getElementById("username").value;
          var password = document.getElementById("password").value;
 //         
          auth.loginrequest(username,password);
  //        token = tokenStorage.getToken();
  //        if(token){
            //tokenStorage.setToken(token);
            //console.log("token: "+token);
 //           document.getElementById('myNavigator').replacePage('main.html');

 //         }else{
            //console.log("No token");

     //       document.getElementById('myNavigator').replacePage('signin.html');
          }
       //   console.log("Signin Click Triggered");	
      		);
  	}
	}else if (page.id === 'custlist') {
    console.log("Custlist is init ");
    
        customer.qr_call();
        //customer.displayconnectstatus("THISISSTATUS");
        //console.log("This is executed 5");
        customer.customers = customerStorage.retrieve();
        //console.log("This is executed 6");
        customer.listInit(event.target);  
        //console.log("This is executed 7");
        //document.getElementById("add").addEventListener("click", app.onReloadClick(), false);
        document.getElementById("reload").addEventListener("click", app.onReloadClick, false);
        
  }else if (page.id === 'custdetails') {

    customer.qr_callloanspercust(page.data.cust_id);

    page.querySelector('ons-toolbar .center').innerHTML = page.data.customername;
    page.querySelector('#detalye #cust_id').innerHTML = page.data.cust_id;
    page.querySelector('#detalye #customername').innerHTML = page.data.customername;
    page.querySelector('#detalye #fullname').innerHTML = page.data.fullname;
    page.querySelector('#detalye #contactno').innerHTML = page.data.contactno;
    page.querySelector('#detalye #amount').innerHTML = page.data.amount;
    page.querySelector('#detalye #balance').innerHTML = page.data.balance;

    document.getElementById("viewloans-button").addEventListener("click", function(){
    console.log("View Loans per Customer Triggered");  
    customer.lpcInit(event.target,customerStorage.retrievelpc(page.data.cust_id));
    });
    


    console.log("Customer.lpc: "+Array.isArray(customer.lpc)+" "+customer.lpc);
  }else if(page.id === 'loanlist'){
    //  page.querySelector('#loanpush-button').onclick = function() {
    //  document.querySelector('#myNavigator').pushPage('loandetails.html', {data: {title: 'Page 2'}});
    //};
    customer.qr_callloans();
    customer.loans = customerStorage.retrieveloans();
    customer.loanInit(event.target);  

  }else if (page.id === 'loandetails') {

    customer.qr_callpayments(page.data.loan_id);

    page.querySelector('ons-toolbar .center').innerHTML = page.data.loancode;
    page.querySelector('#loandetalye #loan_id').innerHTML = page.data.loan_id;
    page.querySelector('#loandetalye #loancode').innerHTML = page.data.loancode;
    page.querySelector('#loandetalye #amount').innerHTML = page.data.amount;
    page.querySelector('#loandetalye #balance').innerHTML = page.data.balance;
    //page.data.lastname+" Hello "+page.data.customername;
    //    .replace('{{firstname}}', page.data.firstname)
    //    .replace('{{customername}}', page.data.customername);
    //= page.data.title+" Hello "+page.data.customername;
    
    //customer.payments = customerStorage.retrievepayments(page.data.loan_id);
    document.getElementById("viewpayments-button").addEventListener("click", function(){
    //    app.onClick, false);
    //  document.querySelector('#signin-button').addEventListener('click', function(){
          console.log("View Payments Triggered");  
          customer.paymentInit(event.target,customerStorage.retrievepayments(page.data.loan_id));
          });

       document.getElementById("save-button").addEventListener("click", function(){
    //    app.onClick, false);
    //  document.querySelector('#signin-button').addEventListener('click', function(){
          console.log("Save Payment Triggered");  
          // customer.paymentAdd(event.target,customerStorage.retrievepayments(page.data.loan_id));
          page.querySelector('#loandetalye #amount').innerHTML = "88888";

          console.log(onlineStorage.getLoan("139"));
          });


    console.log("Customer.Payments: "+Array.isArray(customer.payments)+" "+customer.payments);
    //customer.paymentInit(event.target,customerStorage.retrievepayments(page.data.loan_id));
  } 
});

customer.paymentAdd = function(target,payments){
    this.paymentlist = document.querySelector('#payment-list');
    var paymentitems = payments;
    //target.querySelector('#splitter-toggle').addEventListener('click', function(){
    //   document.querySelector("#splitter-menu").open(); 
    //});
    //var inputwindow = <div id="addpayment" >
    //        <p><ons-input id="username" modifier="underbar" placeholder="Username" float></ons-input> </p>
    //        <p><ons-input id="password" modifier="underbar" type="password" placeholder="Password" float></ons-input></p>
    //        <p style="margin-top: 30px;"><ons-button id="signin-button">Sign in</ons-button></p>
    //    </div>
    document.getElementById("paydate").value = (new Date()).toDateString();
    this.paymentlist.innerHTML = paymentitems.map(function(item){
      return document.querySelector('#payment-list-item').innerHTML
      .replace('{{amount}}', item.amount)
      .replace('{{paymentmode}}', item.paymentmode)
      .replace('{{datepaid}}', (new Date(item.datepaid)).toDateString());
    }).join('');
    // target.querySelector('#add').addEventListener('click', this.addItemPrompt.bind(this));
    //target.querySelector('#myNavigator').pushPage('customerdetails.html', {data: {title: 'Page 2'}});
    
    //customerStorage.init();
    //console.log("paymentInit Triggered: "+customer.payments.length);
    
    //customer.paymentrefresh();
};

customer.lpcInit = function(target,lpc){
    this.lpclist = document.querySelector('#loan-list2');
    var lpcitems = lpc;
    //target.querySelector('#splitter-toggle').addEventListener('click', function(){
    //   document.querySelector("#splitter-menu").open(); 
    //});
    this.lpclist.innerHTML = lpcitems.map(function(item){
      return document.querySelector('#loan-list2-item').innerHTML
      .replace('{{loancode}}', item.loancode)
      .replace('{{balance}}', item.balance)
      .replace('{{status}}', item.status);
    }).join('');
    // target.querySelector('#add').addEventListener('click', this.addItemPrompt.bind(this));
    //target.querySelector('#myNavigator').pushPage('customerdetails.html', {data: {title: 'Page 2'}});
    
    //customerStorage.init();
    //console.log("paymentInit Triggered: "+customer.payments.length);
    
    //customer.paymentrefresh();
};

customer.paymentInit = function(target,payments){
    this.paymentlist = document.querySelector('#payment-list');
    var paymentitems = payments;
    //target.querySelector('#splitter-toggle').addEventListener('click', function(){
    //   document.querySelector("#splitter-menu").open(); 
    //});
    this.paymentlist.innerHTML = paymentitems.map(function(item){
      return document.querySelector('#payment-list-item').innerHTML
      .replace('{{amount}}', item.amount)
      .replace('{{paymentmode}}', item.paymentmode)
      .replace('{{datepaid}}', (new Date(item.datepaid)).toDateString());
    }).join('');
    // target.querySelector('#add').addEventListener('click', this.addItemPrompt.bind(this));
    //target.querySelector('#myNavigator').pushPage('customerdetails.html', {data: {title: 'Page 2'}});
    
    //customerStorage.init();
    //console.log("paymentInit Triggered: "+customer.payments.length);
    
    //customer.paymentrefresh();
};


customer.paymentrefresh = function() {
  // NOT USED at this time
  var paymentitems = customer.payments;

  this.paymentlist.innerHTML = paymentitems.map(function(item){
      return document.querySelector('#payment-list-item').innerHTML
      .replace('{{amount}}', item.amount)
      .replace('{{paymentmode}}', item.paymentmode)
      .replace('{{datepaid}}', item.datepaid);
  }).join('');

  
};

customer.displayconnectstatus = function(status){
    var connectstatus = status;
    //if(connecstatus == "OFFLINE"){
    document.querySelector('#custlist #connectionstatus').innerHTML = connectstatus;
    document.querySelector('#loanlist #connectionstatus').innerHTML = connectstatus;
}

customer.listInit = function(target){
    this.list = document.querySelector('#customer-list');
    
    this.refresh();
};



customer.refresh = function() {
  // var items = customerStorage.filter(this.filterFlag);
  var items = this.customers;
  var refreshdate = customerStorage.getrefreshdate();
  //var events = [];
  
  //document.querySelector("#refreshdate").innerHTML.replace('{{refreshdate}}', refreshdate);
  
  this.list.innerHTML = items.map(function(item){
      return document.querySelector('#customer-list-item').innerHTML
      .replace('{{cust_id}}', item.id)
      .replace('{{customername}}', item.customername)
      .replace('{{amount}}', item.tal)
      .replace('{{balance}}', item.tab);
  }).join('');

  var children = this.list.children;

  //console.log("This is children: "+children[0].innerHTML);

  //console.log("This is customer.custevents: " + typeof(customer.custevents) +" "+customer.custevents.length);
  
  customer.custevents.forEach(function(event, i){
      event.element.removeEventListener('click', event.function);
  });
  
  customer.custevents = [];
  
  var event = {};
  //console.log("items value and length: "+ items[0].customername+" "+items.length);
  items.forEach(function(item,i){
      event = {
          element: children[i].querySelector('ons-button'),
          function: customer.showCustomerDetails.bind(this,item.id,item.customername,item.fullname,item.contactno,item.tal,item.tab)
          };
    //  customer.custevents.push(event);
    //console.log("Pop "+children[i].innerHTML);
      event.element.addEventListener('click', event.function);
    //children[i].querySelector('ons-button').addEventListener('click', customer.showCustomerDetails(item.cust_id,item.customername,item.amount,item.balance));
  });
  //.bind(customer);
  };

customer.showCustomerDetails = function(cust_id,customername,fullname,contactno,amount,balance) {
    //var x = document.getElementById("custlist")
    console.log("Show customer details function is triggered: " + cust_id);
    document.querySelector('#myNavigator').pushPage('customerdetails.html', {data: {title: 'Page 2', cust_id:cust_id, customername: customername,fullname:fullname, contactno:contactno, amount: amount,balance:balance}});
};

customer.loanInit = function(target){
    this.loanlist = document.querySelector('#loan-list');
    
    this.loanrefresh();
};

customer.loanrefresh = function() {
  // var items = customerStorage.filter(this.filterFlag);
  var items = this.loans;
  
  this.loanlist.innerHTML = items.map(function(item){
      return document.querySelector('#loan-list-item').innerHTML
      .replace('{{loan_id}}', item.id)
      .replace('{{loancode}}', item.loancode)
      .replace('{{amount}}', item.amount)
      .replace('{{balance}}', item.balance);
  }).join('');
  
  var children = this.loanlist.children;
  
  this.loanevents.forEach(function(event, i){
      event.element.removeEventListener('click', event.function);
  });
  
  this.loanevents = [];
  
  var event = {};
  items.forEach(function(item,i){
      event = {
          element: children[i].querySelector('ons-button'),
          function: this.showLoanDetails.bind(this, item.id,item.loancode,item.amount,item.balance)
      };
      this.loanevents.push(event);
      //console.log("Pop2");
      event.element.addEventListener('click', event.function);
  }.bind(customer));
};



customer.showLoanDetails = function(loan_id,loancode,amount,balance) {
    //var x = document.getElementById("custlist")
    console.log("Loan ID: "+loan_id)
    document.querySelector('#myNavigator').pushPage('loandetails.html', {data: {title: 'Page 2', loan_id:loan_id, loancode: loancode,amount: amount,balance:balance}});
};