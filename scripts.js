var authenticated = false;

var customer = {
    filterFlag: 'all',
    //theUrl: "https://qr.mnegosyo.com/customers",
    customers: [],
//    customers: [{"cust_id":444,"customername":"Aina","firstname":"Raina","lastname":"Vergara","balance":300000,"amount":400000},{"cust_id":333,"customername":"Rag","firstname":"Ragner","lastname":"Vergara","balance":300000,"amount":400000},{"cust_id":111,"customername":"Violeta","firstname":"Violeta","lastname":"Alcantara","balance":300000,"amount":400000},{"cust_id":222,"customername":"Alexandra","firstname":"Alexandre","lastname":"Cuyegkeng","balance":300000,"amount":50000}],
    loans: [{"loan_id":1234,"loancode":"Aina 1","amount":"10000","balance":"12000"},{"loan_id":1444,"loancode":"Mayec2","amount":"15000","balance": "8000"},{"loan_id":1434,"loancode":"Mags 1","amount":"100000","balance":"120000"},{"loan_id":4321,"loancode":"Ryzel 1","amount":"20000","balance":"22000"}],
    events: []
    };

customer.httpAsyncGet = function(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        //console.log(xmlHttp.responseText);
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
            //callback(xmlHttp.responseText);
            console.log(xmlHttp.responseText);
            
            customerStorage.save(xmlHttp.responseText);
            customer.customers = JSON.parse(customerStorage.retrieve());
            //customer.customers = JSON.parse(xmlHttp.responseText);
        }
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    //xmlHttp.setRequestHeader("Origin","*");
    //console.log("responseHeader: "+xmlHttp.getAllResponseHeaders());
    xmlHttp.send(null);
};

//customer.localstore = function(custdata){
//    customerStorage.save(custdata);
//}

customer.httpSyncGet = function(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    
    xmlHttp.open("GET", theUrl, false); // true for asynchronous 
    xmlHttp.send();
    customer.customers = xmlHttp.responseText;
};

//customer.customers = [{"cust_id":444,"customername":"Dondon","firstname":"Raina","lastname":"Vergara","balance":300000,"amount":400000},{"cust_id":333,"customername":"Rag","firstname":"Ragner","lastname":"Vergara","balance":300000,"amount":400000},{"cust_id":111,"customername":"Violeta","firstname":"Violeta","lastname":"Alcantara","balance":300000,"amount":400000},{"cust_id":222,"customername":"Alexandra","firstname":"Alexandre","lastname":"Cuyegkeng","balance":300000,"amount":50000}];


customer.savedata = function(data){
    customers.customer = data;
}

customer.qr_callback = function(data){
    console.log("QR_CALLBACK is executed");
    //var dataarray = data;
    
    console.log(typeof(data));
    console.log("This data is array:  "+Array.isArray(data));
    customerStorage.save(data);
    //return data;
    //var x = customerStorage.retrieve();
    //console.log(data[0]);
    
    //customer.customers = data;
    // customer.customers = customerStorage.retrieve();
    
}
console.log("This is executed 1");



document.addEventListener('init', function(event) {
  var page = event.target;
  //var auth = this.auth;
  //console.log("This is executed 2");
  //if(!auth.authenticated()){
    //  document.querySelector("#myNavigator").resetPage("signin.html");
      //ons.notification.alert("NULL value");
      //tokenStorage.setToken('Yeah');
      //document.querySelector("#signin");
  //}; 
  //if(authenticated){
//      if(tokenStorage.getToken()){
//        document.getElementById('myNavigator').replacePage('main.html');
 //     }
//    }
 //   customer.refreshdata();
    
  if(page.id === 'signin'){
      console.log("This is executed 3");

      if(tokenStorage.validToken()){
          document.getElementById('myNavigator').replacePage('main.html');
      }else{
      document.querySelector('#signin-button').addEventListener('click', function(){
          var username = document.getElementById("username").value;
          var password = document.getElementById("password").value;
 //         
          var token = auth.login(username,password);
          tokenStorage.setToken(token);
 //      ons.notification.alert("Hello: "+token);
 //           if(!token === null){
 //               tokenStorage.setToken(token);
 //               document.querySelector(".center").innerHTML = token;
 //           }
 //         ons.notification.alert("Token from storage: "+ tokenStorage.getToken());
          //ons.notification.alert("Hello");
          document.getElementById('myNavigator').replacePage('main.html');
    //   document.querySelector("#splitter-menu").open();
      
  });
}
} 
else if (page.id === 'custlist') {
    console.log("This is executed 4");
    //customer.qr_callback();
    //customer.qr_callback();
    //customer.customers = customerStorage.retrieve();
    //page.querySelector('#custpush-button').onclick = function() {
    //  document.querySelector('#myNavigator').pushPage('customerdetails.html', {data: {title: 'Page 2'}});
    //};
        //customer.customers = customer.retrieve();
        customer.qr_callback();
        console.log("This is executed 5");
        customer.customers = customerStorage.retrieve();
        console.log("This is executed 6");
        customer.listInit(event.target);  
        console.log("This is executed 7");
        
  }else if(page.id === 'loanlist'){
    //  page.querySelector('#loanpush-button').onclick = function() {
    //  document.querySelector('#myNavigator').pushPage('loandetails.html', {data: {title: 'Page 2'}});
    //};
   
    customer.loanInit(event.target);  
  } else if (page.id === 'custdetails') {
    page.querySelector('ons-toolbar .center').innerHTML = page.data.customername;
    page.querySelector('#detalye #cust_id').innerHTML = page.data.cust_id;
    page.querySelector('#detalye #firstname').innerHTML = page.data.firstname;
    page.querySelector('#detalye #customername').innerHTML = page.data.customername;
    page.querySelector('#detalye #lastname').innerHTML = page.data.lastname;
    //page.data.lastname+" Hello "+page.data.customername;
    //    .replace('{{firstname}}', page.data.firstname)
    //    .replace('{{customername}}', page.data.customername);
    //= page.data.title+" Hello "+page.data.customername;
  } else if (page.id === 'loandetails') {
    page.querySelector('ons-toolbar .center').innerHTML = page.data.loancode;
    page.querySelector('#loandetalye #loan_id').innerHTML = page.data.loan_id;
    page.querySelector('#loandetalye #loancode').innerHTML = page.data.loancode;
    page.querySelector('#loandetalye #amount').innerHTML = page.data.amount;
    page.querySelector('#loandetalye #balance').innerHTML = page.data.balance;
    //page.data.lastname+" Hello "+page.data.customername;
    //    .replace('{{firstname}}', page.data.firstname)
    //    .replace('{{customername}}', page.data.customername);
    //= page.data.title+" Hello "+page.data.customername;
  }
//}
});

customer.listInit = function(target){
    this.list = document.querySelector('#customer-list');
    
    //target.querySelector('#splitter-toggle').addEventListener('click', function(){
    //   document.querySelector("#splitter-menu").open(); 
    //});
    
    // target.querySelector('#add').addEventListener('click', this.addItemPrompt.bind(this));
    //target.querySelector('#myNavigator').pushPage('customerdetails.html', {data: {title: 'Page 2'}});
    
    //customerStorage.init();
    this.refresh();
};

customer.loanInit = function(target){
    this.loanlist = document.querySelector('#loan-list');
    
    //target.querySelector('#splitter-toggle').addEventListener('click', function(){
    //   document.querySelector("#splitter-menu").open(); 
    //});
    
    // target.querySelector('#add').addEventListener('click', this.addItemPrompt.bind(this));
    //target.querySelector('#myNavigator').pushPage('customerdetails.html', {data: {title: 'Page 2'}});
    
    //customerStorage.init();
    this.loanrefresh();
};

customer.addItemPrompt = function(){
  ons.notification.prompt('Insert new to-do item label.',{
      title: 'New Item',
      cancelable: true,
      
      callback: function(label){
          if(label === '' || label === null){
              return;
          }
          
          if(customerStorage.add(label)){
              this.refresh();
          }else{
              ons.notification.alert('Failed to add item to the to-do list!');
          }
      }.bind(this)
  });  
};


customer.loanrefresh = function() {
  // var items = customerStorage.filter(this.filterFlag);
  var items = this.loans;
  
  this.loanlist.innerHTML = items.map(function(item){
      return document.querySelector('#loan-list-item').innerHTML
      .replace('{{loan_id}}', item.loan_id)
      .replace('{{loancode}}', item.loancode);
  }).join('');
  
  var children = this.loanlist.children;
  
  this.events.forEach(function(event, i){
      event.element.removeEventListener('click', event.function);
  });
  
  this.events = [];
  
  var event = {};
  items.forEach(function(item,i){
      event = {
          element: children[i].querySelector('ons-button'),
          function: this.showLoanDetails.bind(this, item.loan_id,item.loancode,item.amount,item.balance)
      };
      this.events.push(event);
      event.element.addEventListener('click', event.function);
  }.bind(customer));
};

customer.refresh = function() {
  // var items = customerStorage.filter(this.filterFlag);
  var items = this.customers;
  var refreshdate = customerStorage.getrefreshdate();
  
  //document.querySelector("#refreshdate").innerHTML.replace('{{refreshdate}}', refreshdate);
  
  this.list.innerHTML = items.map(function(item){
      return document.querySelector('#customer-list-item').innerHTML
      .replace('{{cust_id}}', item.cust_id)
      .replace('{{customername}}', item.customername)
      .replace('{{amount}}', item.tal)
      .replace('{{balance}}', item.tab);
  }).join('');
  
  //var children = this.list.children;
  
  //this.events.forEach(function(event, i){
    //  event.element.removeEventListener('click', event.function);
  //});
  
  //this.events = [];
  
  //var event = {};
  //items.forEach(function(item,i){
//      event = {
  //        element: children[i].querySelector('ons-button'),
//          function: this.showCustomerDetails.bind(this, item.cust_id,item.customername,item.firstname,item.lastname)
//      };
//      this.events.push(event);
//      event.element.addEventListener('click', event.function);
//  }.bind(customer));
  
};


customer.showCustomerDetails = function(cust_id,customername,firstname,lastname) {
    //var x = document.getElementById("custlist")
    document.querySelector('#myNavigator').pushPage('customerdetails.html', {data: {title: 'Page 2', cust_id:cust_id, customername: customername,firstname: firstname,lastname:lastname}});
}

customer.showLoanDetails = function(loan_id,loancode,amount,balance) {
    //var x = document.getElementById("custlist")
    document.querySelector('#myNavigator').pushPage('loandetails.html', {data: {title: 'Page 2', loan_id:loan_id, loancode: loancode,amount: amount,balance:balance}});
}

customer.toggleStatus = function(label) {
    if(customerStorage.toggleStatus(label)){
        this.refresh();
    }else{
        on.notification.alert('Failed to change the status of the selected item');
    }
}

customer.removeItemPrompt = function(label){
    ons.notification.confirm('Are you sure you would like to remote '+ label + ' from the customer list?',{
        title: 'Remove Item?',
        
        callback: function(answer){
            if(answer === 1){
                if(customerStorage.remove(label)){
                    this.refresh();
                } else {
                    ons.notification.alert('Failed to remove item from customer list');
                }
            }
        }.bind(this)
    });
};

customer.menuInit = function(target) {
    target.querySelector('ons-list').addEventListener('click', this.filter.bind(this));
};

customer.filter = function(evt) {
    this.filterFlag = evt.target.parentElement.getAttribute('data-filter') || 'all';
    this.refresh();
};