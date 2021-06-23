const getButton = document.getElementById("get-button");
const sendButton = document.getElementById("send-button");

const sendRequest = function(method,url,data){

    const promise = new Promise((resolve,reject) =>
    {
        const xhr = new XMLHttpRequest();

        xhr.open(method,url); 
        xhr.responseType= "json";
        xhr.setRequestHeader = ("Content-Type","application/json")
        xhr.send(data);
        xhr.onload = function(){

            if(xhr.status >= 400){
                reject(xhr.response)
            }else{
                resolve(xhr.response);
            } 
        };

        xhr.onerror = function (){
            reject("Something was wrong ! ")
        }
    });

  return promise;

};

const getData = function(){

    sendRequest("GET","https://jsonplaceholder.typicode.com/todos")
    .then(responseData => {
        // console.log(responseData);

        var table = document.getElementById('myTable')
        for(var i = 0; i< responseData.length; i++){
            var row =  `<tr>
                            <td>${responseData[i].userId}</td>
                            <td>${responseData[i].id}</td>
                            <td>${responseData[i].title}</td>
                            <td>${responseData[i].completed}</td>
                        </tr>`
                        table.innerHTML += row
        }
    }).catch(err => {
        console.log(err);
    })
    
};

const sendData = function(){

    sendRequest("POST","https://jsonplaceholder.typicode.com/posts",JSON.stringify({
            title: 'foo',
            body: 'bar',
            userId: 1,
        })).then(responseData => {
        console.log(responseData);
    })

};


getButton.addEventListener("click", getData);
sendButton.addEventListener("click", sendData);