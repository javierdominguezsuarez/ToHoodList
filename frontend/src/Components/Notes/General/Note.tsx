import React from 'react'
import {FaTrash, FaCheckCircle} from 'react-icons/fa'


interface IProps{

    content : string,
    onDelete : () => void,
    onCheck : () => void,
    complete : boolean,
    id : number

}

export default function Note({content, onDelete, complete, onCheck, id} : IProps) {
    return (
            
            <div className ="task-box align-items-center" > 
                <div> 
                    <FaCheckCircle onClick={() => onCheck()} color={complete ? "#34eb8c" : "#6B7077"} size={20}></FaCheckCircle>
                    <li className = "task-content" style={{textDecoration: complete ? "line-through" : "", textDecorationColor: "#6B7077", textDecorationThickness: 1, color: complete ? "#6B7077" : "white"}}>{content}</li>
                </div>
                <FaTrash onClick={() => onDelete()} size={23} color={"#6B7077"} />
            </div>
    )
}
