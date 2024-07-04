import React, { useState, useEffect } from "react";
import axios from './axiosConfig';

const DoneTodoList = () => {
    const [donetodos, setDonetodos] = useState([])

    useEffect(() => {
        axios.get('/done/')
            .then(response => {setDonetodos(response.data)})
            .catch(error => {console.error('fetching 과정에서 에러가 났습니다!', error)})
    }, []);

    return (
        <div className="">
            <h1>완료된 Todolist</h1>
            <ul>
                {donetodos.map(donetodo => (
                    <li key={donetodo}>
                        {donetodo.title}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default DoneTodoList;