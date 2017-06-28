var tokenStorage = {};

tokenStorage.getToken = function(){
    return localStorage.getItem('token');
};

tokenStorage.validToken = function(){
    return tokenStorage.validate(tokenStorage.getToken());
}


tokenStorage.validate = function(token){
    return true;
}

tokenStorage.setToken = function(token){
    return localStorage.setItem('token', token);
};

tokenStorage.removeToken = function(){
    return localStorage.removeItem('token');
};


var customerStorage = {
    collection: []
};

customerStorage.init = function(){
    this.collection = JSON.parse(localStorage.getItem('customer') || '[]');
};

customerStorage.notify = function(){
    if(typeof(Storage)){
        console.log("LocalStorage is supported");
    }else{
        console.log("LocalStorage is NOT supported");
    }
}
    


customerStorage.hasItem = function(label){
    return this.collection.some(function(item){
        return item.label === label;
    });
};


customerStorage.saverefreshdate = function(){
    var d = new Date();

    localStorage.setItem("refreshdate",d);  
};

customerStorage.getrefreshdate = function(){
    return localStorage.getItem("refreshdate");  
};


customerStorage.save = function(data){
    //for(var i=0; i < data.length; i++){
    //console.log(JSON.stringify(data));
    var customerArray =  [];
    console.log(typeof(data));
    if(Array.isArray(data)){
        customerArray = data;
        console.log("data is Array inside localstorage.save function");
    }else{
        //console.log("data is undefined ");
        console.log("data is NOT Array inside localstorage.save function");
    }
    //"["+JSON.stringify(data)+"]";
    
    for(i=0;i<customerArray.length;i++){
        localStorage.setItem("customer" + i.toString(),JSON.stringify(customerArray[i])) ;
        //console.log(typeof(customerArray[i].id));
    };
    for(j=0;j<customerArray.length;j++){
        //console.log(localStorage.getItem("customer" + customerArray[j]));
    };
    
    console.log(customerArray.length);
    localStorage.setItem("customercount",customerArray.length.toString());
    //localStorage.customers = JSON.stringify(data); 
    //console.log(localStorage.customers);
    // }
    //localStorage.setItem('customer', JSON.stringify(this.collection));
};


customerStorage.saveloan = function(data){
    //for(var i=0; i < data.length; i++){
    //console.log(JSON.stringify(data));
    var loanArray =  [];
    console.log(typeof(data));
    if(Array.isArray(data)){
        loanArray = data;
        console.log("data is Array inside localstorage.saveloan function");
    }else{
        //console.log("data is undefined ");
        console.log("data is NOT Array inside localstorage.saveloan function");
    }
    //"["+JSON.stringify(data)+"]";
    
    for(i=0;i<loanArray.length;i++){
        localStorage.setItem("loan" + i.toString(),JSON.stringify(loanArray[i])) ;
        //console.log(typeof(customerArray[i].id));
    };
    for(j=0;j<loanArray.length;j++){
        //console.log(localStorage.getItem("customer" + customerArray[j]));
    };
    
    console.log(loanArray.length);
    localStorage.setItem("loancount",loanArray.length.toString());
    //localStorage.customers = JSON.stringify(data); 
    //console.log(localStorage.customers);
    // }
    //localStorage.setItem('customer', JSON.stringify(this.collection));
};


customerStorage.savelpc = function(data){
    //for(var i=0; i < data.length; i++){
    //console.log(JSON.stringify(data));
    var lpcArray =  [];

    //console.log("This is the type of payment data:"+typeof(data));
    if(Array.isArray(data)){
        lpcArray = data;
        //var load_id = paymentArray;
        //console.log("data is Array inside localstorage.savepayment function");
        //console.log("loan ID in savepayment: "+paymentArray[0].loan_id);
    
    //"["+JSON.stringify(data)+"]";
        console.log(lpcArray);
        if(lpcArray.length>0){
        for(i=0;i<lpcArray.length;i++){
            localStorage.setItem("lpc-"+lpcArray[0].customer_id+"-"+i.toString(),JSON.stringify(lpcArray[i])) ;
        //console.log(typeof(customerArray[i].id));
            //console.log(JSON.stringify(paymentArray[i]));
            };

        //for(j=0;j<paymentArray.length;j++){
        //console.log(localStorage.getItem("customer" + customerArray[j]));
        //};
    
        //console.log(paymentArray.length);
            localStorage.setItem(lpcArray[0].customer_id+"-lpccount",lpcArray.length.toString());
        }else{
            console.log("No loan")
        };
        //console.log("From localstorage: "+localStorage.getItem(paymentArray[0].loan_id+"-paymentcount"));
        //console.log(localStorage.getItem("payment-842-1"))
    }else{
        //console.log("data is undefined ");
        console.log("data is NOT Array inside localstorage.savepayment function");
    }
    //localStorage.customers = JSON.stringify(data); 
    //console.log(localStorage.customers);
    // }
    //localStorage.setItem('customer', JSON.stringify(this.collection));
};

customerStorage.retrievelpc = function(cust_id){
    var lpccount;
    var lpcArray = [];
    //var loan_id = loan_id;
    //console.log("Retrieve from loanID:"+loan_id+" "+typeof(loan_id));
    //console.log("Payment count from Localstorage argument: "+loan_id+"-paymentcount");
    lpccount = localStorage.getItem(cust_id+"-lpccount");
    //console.log("Payment count from Localstorage: "+typeof(paymentcount)+localStorage.getItem(loan_id+"-paymentcount"));
    
    for(i=0;i<lpccount;i++){
        item = localStorage.getItem("lpc-"+cust_id+"-"+i.toString());
        //console.log("From localStorage: "+typeof(item));
        lpcArray.push(JSON.parse(item));        
    };
    console.log("This is lpcArray: "+lpcArray.length);
    return lpcArray;
    //return localStorage.customers;
};

customerStorage.savepayment = function(data){
    //for(var i=0; i < data.length; i++){
    //console.log(JSON.stringify(data));
    var paymentArray =  [];

    //console.log("This is the type of payment data:"+typeof(data));
    if(Array.isArray(data)){
        paymentArray = data;
        //var load_id = paymentArray;
        //console.log("data is Array inside localstorage.savepayment function");
        //console.log("loan ID in savepayment: "+paymentArray[0].loan_id);
    
    //"["+JSON.stringify(data)+"]";
        console.log(paymentArray);
        if(paymentArray.length>0){
        for(i=0;i<paymentArray.length;i++){
            localStorage.setItem("payment-"+paymentArray[0].loan_id+"-"+i.toString(),JSON.stringify(paymentArray[i])) ;
        //console.log(typeof(customerArray[i].id));
            //console.log(JSON.stringify(paymentArray[i]));
            };

        //for(j=0;j<paymentArray.length;j++){
        //console.log(localStorage.getItem("customer" + customerArray[j]));
        //};
    
        //console.log(paymentArray.length);
            localStorage.setItem(paymentArray[0].loan_id+"-paymentcount",paymentArray.length);
        }else{
            console.log("No payment")
        };
        //console.log("From localstorage: "+localStorage.getItem(paymentArray[0].loan_id+"-paymentcount"));
        //console.log(localStorage.getItem("payment-842-1"))
    }else{
        //console.log("data is undefined ");
        console.log("data is NOT Array inside localstorage.savepayment function");
    }
    //localStorage.customers = JSON.stringify(data); 
    //console.log(localStorage.customers);
    // }
    //localStorage.setItem('customer', JSON.stringify(this.collection));
};

customerStorage.retrievepayments = function(loan_id){
    var paymentcount;
    var paymentArray = [];
    //var loan_id = loan_id;
    //console.log("Retrieve from loanID:"+loan_id+" "+typeof(loan_id));
    //console.log("Payment count from Localstorage argument: "+loan_id+"-paymentcount");
    paymentcount = localStorage.getItem(loan_id+"-paymentcount");
    //console.log("Payment count from Localstorage: "+typeof(paymentcount)+localStorage.getItem(loan_id+"-paymentcount"));
    
    for(i=0;i<paymentcount;i++){
        item = localStorage.getItem("payment-"+loan_id+"-"+i.toString());
        //console.log("From localStorage: "+typeof(item));
        paymentArray.push(JSON.parse(item));        
    };
    console.log("This is paymentArray: "+paymentArray.length);
    return paymentArray;
    //return localStorage.customers;
};


customerStorage.retrieve = function(){
    var customercount;
    var custArray = [];
    customercount = localStorage.getItem("customercount");
    console.log("Customer count from Localstorage: "+customercount);
    
    for(i=0;i<customercount;i++){
        item = localStorage.getItem("customer" + i.toString());
        //console.log("From localStorage: "+typeof(item));
        custArray.push(JSON.parse(item));        
    };
    return custArray;
    //return localStorage.customers;
};

customerStorage.retrieveloans = function(){
    var loancount;
    var loanArray = [];
    loancount = localStorage.getItem("loancount");
    console.log("Loan count from Localstorage: "+loancount);
    
    for(i=0;i<loancount;i++){
        item = localStorage.getItem("loan" + i.toString());
        //console.log("From localStorage: "+typeof(item));
        loanArray.push(JSON.parse(item));        
    };
    return loanArray;
    //return localStorage.customers;
};


customerStorage.add = function(label){
    if(this.hasItem(label)){
        return false;
    }
    
    this.collection.push({
        label: label,
        status: 'uncompleted'
    });
    
    this.save();
    return true;
};

customerStorage.remove = function(label){
    if(!this.hasItem(label)){
        return false;
    }
    
    this.collection.forEach(function(item, i){
        if(item.label === label){
            this.collection.splice(i,1);
        }
    }.bind(this));
    
    this.save();
    return true;
};

customerStorage.toggleStatus = function(label){
    if(!this.hasItem(label)){
        return false;
    }
    
    this.collection.forEach(function(item, i){
        if(item.label === label){
            this.status = item.status === 'completed' ? 'uncompleted' : 'completed';
        }
    });
    
    this.save();
    return true;
};

customerStorage.filter = function(status){
    if(status === 'all'){
        return this.collection;
    }
    
    return this.collection.filter(function(item){
        return item.status === status;
    });
};