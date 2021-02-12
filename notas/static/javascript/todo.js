



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

      results.data.map((x) => {
          container.innerHTML += renderTodo(x);


        }
      )
      

      results.data.map((x) => {
          document.getElementById(`${x.id}-todo-delete`).addEventListener("click", async (data) => { 
            
            document.getElementById(`${x.id}-todo-delete`).parentElement.remove()


            const results = await axios.delete("/v1/notas/" + x.id, {headers : {'X-CSRFToken' : csrftoken}})



          })
        }
      )


    }
    //making first request to get all todos


    await loadAllTodos()


    //iterating throw all this todos 

    document.getElementById("add-button").addEventListener("click", async function(){

    const textComponent = document.getElementById("input-task")
    const text = textComponent.value

    if(text === "")
        return

    const results = await axios.post("/v1/notas/", {user : 1, content : text}, {headers : {'X-CSRFToken' : csrftoken}})

    console.log(results)


      const element = document.createElement(`todo`)
      element.innerHTML=renderTodo(results.data)

    container.insertAdjacentElement('afterbegin', element)

    textComponent.value = ""

    document.getElementById(`${results.data.id}-todo-delete`).addEventListener("click", (data) => { 
      
      document.getElementById(`${results.data.id}-todo-delete`).parentElement.remove()

      axios.delete("/v1/notas/" + results.data.id, {headers : {'X-CSRFToken' : csrftoken}})



    })
  

  })

}


const renderTodo = (todo) => {
  const html =  
  `
    <div class ="task-box" > <!-- display flex, direction : flex row,  justify content : space between , align-items: center -->

        <div> <!-- display flex, direction : flex row -->
            <i class = "fas fa-check-circle"></i>
            <li class = "task-content">${todo.content}</li> <!-- margin-left : 10px --> 
        </div>

        <i class = "fas fa-trash-alt" id="${todo.id}-todo-delete" ></i>

    </div>
  `

  return html
}

