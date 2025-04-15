function addTask(){
    const newTaskInput=document.getElementById("newTask");
    const taskText= newTaskInput.value.trim();
    const taskItem=document.createElement('li');
    if(taskText !=="") {
        const taskSpan = document.createElement("span");
    
    taskSpan.textContent= taskText;
    taskItem.appendChild(taskSpan);
    const taskList=document.getElementById('taskList');
    taskList.appendChild(taskItem);
    newTaskInput.value="";
}}