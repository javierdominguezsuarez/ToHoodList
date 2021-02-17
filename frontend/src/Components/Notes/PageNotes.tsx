import React, { useState } from 'react'
import CurrentDate from './General/CurrentDate';
import Note from './General/Note';

interface notas{
    complete : boolean,
    content : string,
    hour ?: string,
    id : number,
    pub ?: string,
    user ?: number


}

export default function PageNotes() {


    const [todoList, setTodoList] = useState<notas[]>([]);
    const [todo, setTodo] = useState<string>("");
    const time = new Date().toLocaleDateString()


    const addTodo = (todo : notas) => {

        setTodoList([...todoList, todo])

    }

    const removeTodo = (todo : notas) => {

        setTodoList(todoList.filter((x : notas) => x.id !== todo.id))

    }


    const style = {

        addTask : {
            
            display: "flex",
            justifyContent: "flex-start"
            

        } as React.CSSProperties,

        header : {
            display: "flex",
            justifyContent: "flex-start",
            marginBottom: 20
        } as React.CSSProperties
    } 

    


    return (

        <div className="body p-5" style={{padding: 10}}>
            <div>
                <div className = "header-box" style={style.header}>
                    <div>
                        <CurrentDate></CurrentDate>
                        <p style={{marginTop: 20, color:"grey", textAlign: "left"}} className = "tasks-actives-box">
                            3 Active Tasks
                        </p>
                    </div>
                </div>

                <div style={style.addTask} >
                    <input onChange={(e : any) => setTodo(e.target.value)} id="input-task" className = "input-task" placeholder = "Things to be done..."></input>
                    <button id="add-button" className = "add-button">Add Task</button>
                </div>
            </div>
            <main>
                <ul id="task-list" className = "task-list" style={{marginTop: 20}}>


                    <Note id={1} complete={false} content="Matar a una madre inocente" onDelete={() => console.log("eliminar")} onCheck={() => console.log("checked")}></Note>
                    <Note id = {2} complete={true} content="Matar a una madre inocente" onDelete={() => console.log("eliminar")} onCheck={() => console.log("checked")}></Note>




                </ul>
            </main>


            </div>
    )
}
