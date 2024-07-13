import React, { useState } from 'react';
import Header from './Header';
import { ToastContainer, toast } from 'react-toastify';

const AddContact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        toast.success("Contact added")
        setFormData({
          name: '',
          email: '',
          phone: '',
        })
      } else {
        console.log('Form submission failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
    <Header/>
    <h1>ADD CONTACTS</h1>
      <div className='form-container'>
        <form className='form' onSubmit={handleSubmit}>
          <div className='text'>
            <label>
              Name: <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </label>
          </div>
          <div>
            <label>
              Email: <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </label>
          </div>
          <div>
            <label>
              Phone: <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
            </label>
          </div>
          <div>

          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
      <ToastContainer/>
    </>
  );
};

export default AddContact;
