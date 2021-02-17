import axios from 'axios';
import React, { useEffect, useState } from 'react'
import apiTodo from '../../api/apiTodo';
import CurrentDate from './General/CurrentDate';
import Note from './General/Note';
import Placeholder from './General/Placeholder';
import logo from './logo.svg';

interface notas{
    complete : boolean,
    content : string,
    hour ?: string,
    id : number,
    pub ?: string,
    user ?: number


}

export default function PageNotes() {


    const [todoList, setTodoList] = useState<notas[]>([])
    const [todo, setTodo] = useState<string>("")
    const time = new Date().toLocaleDateString()

    const BaseUrl = 'http://127.0.0.1:8000/v1/'

    const getTodoList = async () => {
        
        const result : any = await apiTodo.getTodo()

        setTodoList(result.data)


    }

    const addTodo = async (content : string) => {

        if(content.replace(/\s+/g, '') == "")
            return

        const result = await apiTodo.addTodo(content)

        setTodoList([result.data, ...todoList])

    }

    const removeTodo = async (id : number) => {

        await apiTodo.removeTodo(id);

        setTodoList(todoList.filter((x : notas) => x.id !== id))

    }
    const checkTodo = async (todo : notas) => {

        const result = await apiTodo.patchTodo({...todo, complete : !todo.complete});

        setTodoList(todoList.map((x : notas) => {
            if(x.id === todo.id){

                return {...x, complete : !x.complete}
            
            }else{
                return x
            }
        
        }))


    }

    useEffect(() => {

        getTodoList()

    }, [])


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

    

    console.log(todoList)

    return (

        <div className="body p-5" style={{padding: 10}}>
            <div>
                <div className = "header-box" style={style.header}>
                    <div>
                        <CurrentDate></CurrentDate>
                        <p style={{marginTop: 20, color:"grey", textAlign: "left"}} className = "tasks-actives-box">
                            {todoList.length} Active Tasks
                        </p>
                    </div>
                </div>

                <div style={style.addTask} >
                    <input onChange={(e : any) => setTodo(e.target.value)} value={todo} id="input-task" className = "input-task" placeholder = "Things to be done..."></input>
                    <button id="add-button" className = "add-button" onClick={() => {addTodo(todo); setTodo("")}}>Add Task</button>
                </div>
            </div>
            <main>
                <ul id="task-list" className = "task-list" style={{marginTop: 20}}>

                    {  
                      todoList.length == 0 ?  
                      <div style={{marginTop: 130}}> 
                        <Placeholder></Placeholder>
                        <h1 style={{color: "white", marginTop: 20, textAlign: "center"}}>No hay tareas <div style={{transform : "rotate(90deg)", fontSize: 50}}>{":)"}</div></h1>
                      </div>
                      : null
                    
                    
                    }

                    <div>
                    {todoList.filter((x : notas) => x.complete === false).length > 0 ? <h4 style={{color: "white", marginTop: 20, marginBottom : 20, textAlign: "left"}}>{todoList.filter((x : notas) => x.complete === false).length} Tareas sin completar:</h4> : null}
                    {
                        todoList.length > 0 ?
                            todoList.filter((x : notas) => x.complete === false).map(
                                (x : notas) =>  <Note id = {x.id} complete={x.complete} content={x.content} onDelete={() => removeTodo(x.id)} onCheck={() => checkTodo(x)}></Note>
                            )

                        :
                            null

                    }
                    </div>

                    <div>
                    {todoList.filter((x : notas) => x.complete === true).length > 0 ? <h4 style={{color: "white", marginTop: 20, marginBottom : 20, textAlign: "left"}}>{todoList.filter((x : notas) => x.complete === true).length} Tareas completadas:</h4> : null}
                    {
                        todoList.length > 0 ?
                            todoList.filter((x : notas) => x.complete === true).map(
                                (x : notas) =>  <Note id = {x.id} complete={x.complete} content={x.content} onDelete={() => removeTodo(x.id)} onCheck={() => checkTodo(x)}></Note>
                            )

                        :
                            null

                    }
                    </div>



                </ul>
            </main>


            </div>
    )
}
