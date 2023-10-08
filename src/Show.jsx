import React from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { BASE_URL } from './Global';

function Show() {
    const [title, setTitle] = React.useState("");
    const [details, setDetails] = React.useState("");
    const navigate = useNavigate();
    let {id} = useParams();
    React.useEffect(() =>{
        getData();
    },[])

    const getData = () =>{
        console.log(id);
        axios.get(`${BASE_URL}/todo-detail-api.php?todo_id=${id}`)
        .then(res => {
            console.log(res.data); 
            setTitle(res.data.todo_title);
            setDetails(res.data.todo_details);
             
        }).catch((error) => {
            alert("Error Ocurred :"+ error);
            console.log(error)
        })
    }

 
    return ( <>
     <h3>Show</h3>
             <table border={1}>
                <tr>
                    <th>ID :</th>
                    <td>{id}</td>
                </tr>
                <tr>
                    <th>Title:</th>
                    <td>{title}</td>
                </tr>
                <tr>
                    <th>Details:</th>
                    <td>{details}</td>
                </tr>
             </table>
            
            <input type='button' onClick={()=>navigate('/')} value='Back'/>
                 
               
            
    </> );
}

export default Show;