import axios from 'axios';
import React from 'react'
import Swal from 'sweetalert2'
import { BASE_URL } from './Global';

function Register() {
    const [title, setTitle] = React.useState("");
    const [details, setDetails] = React.useState("");
    
    
    const submitValue = (event) => {
        var myform = new FormData();
        myform.append('todo_title', title);
        myform.append('todo_details', details);
        
        axios.post(`${BASE_URL}/todo-add-api.php`,myform)
        .then(res => {
            console.log(res)
            if(res.data.flag==='1'){
                //alert('Done' + res.data.message)
                Swal.fire({
                    icon: 'success',
                    title: 'Record Added Successfully',
                    showConfirmButton: false,
                    timer: 1500
                })
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'An Error Occured!',
                    showConfirmButton: false,
                    timer: 1500
                })
                //alert('Something went wrong'+  res.data.message);
            }
        })
        .catch((error) => {
            alert("Error Ocurred :"+ error);
            console.log(error)
        })
        event.target.reset();
        event.preventDefault();
    }
    return (
        <>
            <h3>Add</h3>
            <form onSubmit={submitValue}>
                Title : <input type="text" onChange={e => setTitle(e.target.value)} /> <br/>
                Details : <input type="text" onChange={e => setDetails(e.target.value)} /><br/>
                
                <input type="submit" />
            </form>
        </>
    )
}
export default Register;