var onlineStorage = {};

onlineStorage.httpAsyncGet = function(theUrl,requesttype,params)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        //console.log(xmlHttp.responseText);
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
            //callback(xmlHttp.responseText);
            console.log(xmlHttp.responseText);
            return xmlHttp.responseText;
            //customerStorage.save(xmlHttp.responseText);
            //customer.customers = JSON.parse(customerStorage.retrieve());
            //customer.customers = JSON.parse(xmlHttp.responseText);
        }
    }
    xmlHttp.open(requesttype, theUrl, true); // true for asynchronous 
    xmlHttp.setRequestHeader("Authorization","JWT "+tokenStorage.getToken());
    xmlHttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xmlHttp.setRequestHeader("cache-control", "no-cache");
    //console.log("responseHeader: "+xmlHttp.getAllResponseHeaders());
    xmlHttp.send(params);
};

onlineStorage.getLoan = function(loan_id){
	var url = customer.base_url+"/loans/"+loan_id;
	var requesttype = "GET";
	var params = "loan_id="+loan_id; 
	return onlineStorage.httpAsyncGet(url,requesttype,params);
};
