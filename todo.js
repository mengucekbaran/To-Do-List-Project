
//Elementleri Seçme
const form=document.querySelector("#todo-form");
const toDoInput=document.querySelector("#todo");
const toDoLıst=document.querySelector(".list-group");
const firstCardBody=document.querySelectorAll(".card-body")[0];
const secondCardBody=document.querySelectorAll(".card-body")[1];
const filter=document.querySelector("#filter");
const clearButton=document.querySelector("#clear-todos");

eventListeners();

function eventListeners(){
    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",LoadAllTodosToUI); //DOMContentLoaded sayfa yüklendiginde calışır
    secondCardBody.addEventListener("click",deleteTodo);
    filter.addEventListener("keyup",filterTodos);
    clearButton.addEventListener("click",clearAllTodos);
}
function clearAllTodos(){
    if(confirm("Tümünü silmek istediginize emin misiniz ?")){
        //Arayüzden todoları temizleme
        // toDoLıst.innerHTML=""; //Yavaş
        while(toDoLıst.firstElementChild!=null){
            toDoLıst.removeChild(toDoLıst.firstElementChild);
        }
        localStorage.removeItem("todos"); //Storageden silmek
    }


}
function filterTodos(e){
    const filterValue=e.target.value.toLowerCase(); //toLowerCase metnin tamamını kücük harfe çevirir
    const listItems=document.querySelectorAll(".list-group-item");
    listItems.forEach(function(listItem){
        const text=listItem.textContent.toLowerCase();// karsılastırabilmek için li nin içindekini de kucuk harfe cevirdik
        if(text.indexOf(filterValue)===-1){ //index of içine yazılan bulunursa indexi bulunamazsa -1 i geri döndürür
            //Bulunamadı
            listItem.setAttribute("style","display: none !important");
        }
        else{
            listItem.setAttribute("style","display: block ");
        }
    })

}
function deleteTodo(e){     //Arayüzden Todo Silme
    if(e.target.className==="fa fa-remove"){
        e.target.parentElement.parentElement.remove();  // iki üstü li yi gösteriyor
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
        showAlert("success","Todo Başarıyla Silindi");
    }
}
function deleteTodoFromStorage(deletetodo){
    let todos=getTodosFromStorage();
    todos.forEach(function(todo,index){
        if(todo===deletetodo){
            todos.splice(index,1); //Arrayden degeri silebilirz
        }
    })
    localStorage.setItem("todos",JSON.stringify(todos));
}
function LoadAllTodosToUI(){
   let todos= getTodosFromStorage();

todos.forEach(function(todo){
    addTodoToUI(todo);
})
}
function addTodo(e){
    const newTodo= toDoInput.value.trim();
    if(newTodo===""){
        
        showAlert("danger","Lütfen Bir Todo Girin");
    }
    else{
         addTodoToUI(newTodo); 
         addTodoToStorage(newTodo);
         showAlert("success","Todo Başarıyla Eklendi");
    }
   



    e.preventDefault();
}
function getTodosFromStorage(){  //Storagedan Todoları Alma
    let todos;
    if(localStorage.getItem("todos")===null){
        todos=[];
    }
    else{
        todos=JSON.parse(localStorage.getItem("todos")); //Stringi arraye çevirdi
    }
    return todos;
}
function addTodoToStorage(newTodo){
 let todos=getTodosFromStorage();
 todos.push(newTodo);
 //Local Storage e ekleme 
 localStorage.setItem("todos",JSON.stringify(todos));  //JSON.stringify arrayi stringe çevirir
}
function showAlert(type,message){
    const alert=document.createElement("div");
    alert.className=`alert alert-${type}`;
    alert.textContent=message;
    firstCardBody.appendChild(alert);
    
   //SetTimeOut
   setTimeout(function(){
       alert.remove();

   },1000) //foksiyon 1000 ms sonra yani 1 saniye sonra çalışacak




}


function addTodoToUI(newTodo){ //girilen String degerini list item olarak Arayüze(UI) ekle

//List Item Olusturma
const listItem=document.createElement("li");
listItem.className="list-group-item d-flex justify-content-between";
//Link Olusturma
const link=document.createElement("a");
link.href="#";
link.className="delete-item";
link.innerHTML= "<i class = 'fa fa-remove'></i>";

//Text Node Ekleme
listItem.appendChild(document.createTextNode(newTodo)); //newTodo list item a eklendi
listItem.appendChild(link);  //link list item a eklendi

//Todo Liste List Item'ı Ekleme
toDoLıst.appendChild(listItem); //list item toDoList e eklendi
toDoInput.value="";  //Inputun içi temizlendi
}




