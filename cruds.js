let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let buttoncreate = document.getElementById('buttoncreate');
let mood ='create';
let helper;
//console.log(title,price,taxes,ads,discount,total,count,category,buttoncreate);
// get total
function getTotal(){
if(price.value!=''){
    let result = (+price.value+ +taxes.value+ +ads.value)- +discount.value;
    total.innerHTML=result;
    total.style.background='green';
}else{
    total.innerHTML="";
    total.style.background='rgb(211, 12, 12)';
}
}
//create 
// data related tp eachother then an object inner a function when i click on and all datas 
//one by one into an array then localstorage to save this array then a condition to work rigth
let arrayData ;
if(localStorage.product != null){
    arrayData=JSON.parse(localStorage.product);
}
else{
    arrayData=[];
}
buttoncreate.onclick= function(){
    let objectData={
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),

    }
    if(title.value!=''&& price.value!=''&& category.value!=''&&objectData.count<100){
    if(mood=='create'){
    if(objectData.count>1){
        for(let i=0; i<objectData.count;i++){
            arrayData.push(objectData);
        }
    }else{arrayData.push(objectData);}
    }
    else{
        arrayData[helper]=objectData;
        mood='create';
        buttoncreate.innerHTML='create';
        count.style.display='block';
    }
    clearData();}
localStorage.setItem('product',JSON.stringify(arrayData));

readData();//to show up when you click
}
//clear data within clickin on create 
let clearData = function(){
    title:title.value ="";
    price:price.value ="";
    ads:ads.value ="";
    taxes:taxes.value ="";
    discount:discount.value ="";
    total:total.innerHTML ="";
    count:count.value ="";
    category:category.value ="";
    

}
//read date needs loop from that array you did 

let readData = function(){
    getTotal();
    //declare a variable
    let table ='';
    //the loop 
    for(let i = 0 ; i<arrayData.length;i++){
        table+=`
        <tr>
                        <td>${i+1}</td>
                        <td>${arrayData[i].title}</td>
                        <td>${arrayData[i].price}</td>
                        <td>${arrayData[i].taxes}</td>
                        <td>${arrayData[i].ads}</td>
                        <td>${arrayData[i].discount}</td>
                        <td>${arrayData[i].total}</td>
                        <td>${arrayData[i].category}</td>
                        <td><button id="update" onclick="updateData(${i})" >update</button></td>
                        <td><button id="delete" onclick ="deleteElement(${i})">delete</button></td>

                    </tr>
        `;
        
    }
    // for delete all button
    let DeleteAll= document.getElementById('DeleteAll');
    document.getElementById('table').innerHTML=table;
    if(arrayData.length>0){
        DeleteAll.innerHTML=`<button onclick="deleteAll()">DeleteAll(${arrayData.length})</button>`;
       
    }else{
        DeleteAll.innerHTML='';
    }
}
//to show up even after reload 
readData();
//delete one element 
let deleteElement= function(i){//give it parameter cuz u need to delete one 
    arrayData.splice(i,1);
    localStorage.product=JSON.stringify(arrayData);
    //to show up within clicking (this with html )so call read function
readData();
}
let deleteAll = function(){
    arrayData.splice(0);
    localStorage.clear();
    readData();
}
//update
let updateData=function(i){
title.value=arrayData[i].title;
price.value=arrayData[i].price;
taxes.value=arrayData[i].taxes;
ads.value=arrayData[i].ads;
discount.value=arrayData[i].discount;
category.value=arrayData[i].category;
getTotal();
buttoncreate.innerHTML='update';
count.style.display='none';
mood='update';
helper=i;
scroll({
    top:0,behavior:"smooth",
})
}
//search
let searchmood='title';
let getSearch=function(id){
    let search= document.getElementById('search');
    if(id=='sbytitle'){
searchmood="title";
search.placeholder='search by title';
    }else{
searchmood="category";
search.placeholder='search by category';
    }
search.focus();
search.value='';
readData();
}
let typeSearch=function(value){
    let table='';
if(searchmood=='title'){
   for(let i =0; i<arrayData.length;i++){
    if(arrayData[i].title.includes((value).toLowerCase())){
        
        table+=`
        <tr>
                        <td>${i}</td>
                        <td>${arrayData[i].title}</td>
                        <td>${arrayData[i].price}</td>
                        <td>${arrayData[i].taxes}</td>
                        <td>${arrayData[i].ads}</td>
                        <td>${arrayData[i].discount}</td>
                        <td>${arrayData[i].total}</td>
                        <td>${arrayData[i].category}</td>
                        <td><button id="update" onclick="updateData(${i})" >update</button></td>
                        <td><button id="delete" onclick ="deleteElement(${i})">delete</button></td>

                    </tr>
        `;
    }}}else{
        for(let i =0; i<arrayData.length;i++){
            if(arrayData[i].category.includes((value).toLowerCase())){
                
                table+=`
                <tr>
                                <td>${i}</td>
                                <td>${arrayData[i].title}</td>
                                <td>${arrayData[i].price}</td>
                                <td>${arrayData[i].taxes}</td>
                                <td>${arrayData[i].ads}</td>
                                <td>${arrayData[i].discount}</td>
                                <td>${arrayData[i].total}</td>
                                <td>${arrayData[i].category}</td>
                                <td><button id="update" onclick="updateData(${i})" >update</button></td>
                                <td><button id="delete" onclick ="deleteElement(${i})">delete</button></td>
        
                            </tr>
                `;

    }

   }
    }
    document.getElementById('table').innerHTML=table;
}
