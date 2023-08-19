import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FormPage: React.FC = () => {
    const history = useNavigate();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = () => {
        if (name && phone && email) {
            const userDetails = {
                name,
                phone,
                email,
            };
            localStorage.setItem('userDetails', JSON.stringify(userDetails));
            history('/second');
        } else {
            alert('Please enter all details');
        }
    };

    return (
        <div>
            <h2>Enter Your Details</h2>
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="tel" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
};

export default FormPage;
