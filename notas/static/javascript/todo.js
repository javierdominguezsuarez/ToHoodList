
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

   //making first request to get all todos
  const results = await axios.get("/v1/notas")


  //iterating throw all this todos 
  results.data.map((x) => 
    container.innerHTML += `<h1>${x.content}</h1>`
  )


  console.log(results)

  document.getElementById("add-button").addEventListener("click", async function(){

      const text = document.getElementById("input-task").value

      if(text === "")
          return

      const results = await axios.post("/v1/notas/", {user : 1, content : text}, { headers : {'X-CSRFToken' : csrftoken}})

      console.log(results)

      const lastInner = container.innerHTML

      container.innerHTML = `<h1>${text}</h1>`  + lastInner

      console.log(text)
    
  })


}

const renderTodo = (todo) => {
  const html =  

  `

  hello


  `

  return html
}

