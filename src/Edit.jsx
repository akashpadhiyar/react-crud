import React from 'react'
import axios from 'axios';
import Swal from 'sweetalert2'
import { BASE_URL } from './Global';

import { useNavigate, useParams } from 'react-router-dom';

function Edit() {
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

    const submitValue = (event) => {
        var myform = new FormData();
        myform.append('todo_id', id);
        myform.append('todo_title', title);
        myform.append('todo_details', details);
        
        axios.post(`${BASE_URL}/todo-edit-api.php`,myform)
        .then(res => {
            console.log(res)
            if(res.data.flag==='1'){
               //alert('Record Updated Successfully')
               Swal.fire({
                icon: 'success',
                title: 'Record Updated Successfully',
                showConfirmButton: false,
                timer: 1500
            })
                navigate('/Display');
            }else{
                alert('Something went wrong');
            }
        })
        .catch(err => console.log(err));
        event.target.reset();
        
        event.preventDefault();
    }
    return ( <>
     <h3>Edit</h3>
            <form onSubmit={submitValue}>
            Title : <input type="text" value={title} onChange={e => setTitle(e.target.value)} /> <br/>
            Details : <input type="text" value={details} onChange={e => setDetails(e.target.value)} /><br/>
                 
                <input type="submit" />
            </form>
    </> );
}

export default Edit;