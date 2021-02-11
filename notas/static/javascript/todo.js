
window.onload = async function(event){

    /*

    onload():

    Executed when the screen is loaded


    */


    //==============================

    // SETTING UP ALL HTML ELEMENTS

    //==============================
   const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value; 
   const container = document.getElementById("task-list")

    const loadAllTodos = async () => {
      const results = await axios.get("/v1/notas")

      results.data.map((x) => 
        container.innerHTML += renderTodo(x)
      )
      
    }
    //making first request to get all todos

    await loadAllTodos()

  //iterating throw all this todos 


  console.log(results)

  document.getElementById("add-button").addEventListener("click", async function(){

      const text = document.getElementById("input-task").value

      if(text === "")
          return

      const results = await axios.post("/v1/notas/", {user : 1, content : text}, { headers : {'X-CSRFToken' : csrftoken}})

      console.log(results)

      const lastInner = container.innerHTML

      container.innerHTML = renderTodo(results.data)  + lastInner

      console.log(text)
    
  })


}


const renderTodo = (todo) => {
  const html =  

  `
    <div class = "task-box" > <!-- display flex, direction : flex row,  justify content : space between , align-items: center -->
        <div> <!-- display flex, direction : flex row -->
            <i class = "fas fa-check-circle"></i>
            <li class = "task-content">${todo.content}</li> <!-- margin-left : 10px --> 
        </div>

        
        <i class = "fas fa-trash-alt"></i>
    </div>

  `

  return html
}

