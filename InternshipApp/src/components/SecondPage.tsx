import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import axios from 'axios';
import { Post } from './models';
import DepartmentComponent from './Department';
import { Department } from './Department';

interface UserDetails {
    name: string;
    phone: string;
    email: string;
}

const SecondPage: React.FC = () => {
    const history = useNavigate();
    const userDetailsString = localStorage.getItem('userDetails');

    if (!userDetailsString) {
        alert('Please enter your details before accessing this page.');
        history('/');
        return null;
    }

    const userDetails: UserDetails = JSON.parse(userDetailsString);

    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        axios.get<Post[]>('https://jsonplaceholder.typicode.com/posts')
            .then(response => {
                setPosts(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'title', headerName: 'Title', width: 300 },
        { field: 'body', headerName: 'Body', width: 500 },
    ];


    const sampleDepartments: Department[] = [
        {
            department: 'customer_service',
            sub_departments: [
                { name: 'support', selected: false },
                { name: 'customer_success', selected: false },
                { name: 'customer_', selected: false },
            ],
            selected: false,
        },
        {
            department: 'design',
            sub_departments: [
                { name: 'graphic_design', selected: false },
                { name: 'product_design', selected: false },
                { name: 'web_design', selected: false },
            ],
            selected: false,
        },
    ];

    return (
        <div>
            <h2>Welcome to the Second Page</h2>
            <p>Name: {userDetails.name}</p>
            <p>Phone: {userDetails.phone}</p>
            <p>Email: {userDetails.email}</p>
            <div style={{ height: 300, width: '100%' }}>
                <DataGrid rows={posts} columns={columns} />
            </div>
            <h2>Departments</h2>
            <DepartmentComponent departments={sampleDepartments} />
        </div>
    );
};

export default SecondPage;
