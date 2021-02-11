
window.onload = async function(event){

   const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value; 

  console.log(csrftoken)

  const results = await axios.get("/v1/notas")

  const container = document.getElementById("task-list")

  console.log(results)

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

