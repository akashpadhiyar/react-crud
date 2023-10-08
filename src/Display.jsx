import axios from 'axios';
import React from 'react'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import { BASE_URL } from './Global';

function Display() {
    const [mydata, setData] = React.useState([]);
    React.useEffect(() => {
        getData();
    }, [])

    const getData = () => {
        axios.get(`${BASE_URL}/todo-list-api.php`)
            .then(res => {
                console.log(res.data);
                setData(res.data.todo_list);
            }).catch((error) => {
                alert("Error Ocurred :" + error);
                console.log(error)
            })
    }
    const deleteData = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                var myform = new FormData();
                myform.append('todo_id', id);
                axios.post(`${BASE_URL}/todo-delete-api.php`, myform)
                    .then((res) => {
                        console.log(res.data)
                        //alert(res.data.message);
                        Swal.fire({
                            icon: 'success',
                            title: 'Record deleted successfully!',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        getData();
                    }).catch((error) => {
                        //alert("Error Ocurred :" + error);
                        Swal.fire({
                            icon: 'error',
                            title: 'An Error Occured!',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        console.log(error)
                    })
            }
        });

    }
    return (
        <>
            <h3>Display</h3>
            <table border='1'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Mobile</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {mydata &&
                        mydata.length ? (mydata.map((values, i) =>
                            <>
                                <tr key={i + 1}>
                                    <td key={values.todo_id}>{i + 1}</td>
                                    <td>{values.todo_title}</td>
                                    <td>{values.todo_details}</td>
                                    <td>{values.created_at}</td>
                                    <td>
                                        <Link to={'/Edit/' + values.todo_id}>Edit</Link> |
                                        <Link to={'/Show/' + values.todo_id}>Show</Link> |
                                        <input type='button' onClick={() => deleteData(values.todo_id)} value='X' /></td>
                                </tr>
                            </>
                        )) : "No Record Found"}
                </tbody>
            </table>
        </>
    );

}
export default Display;
