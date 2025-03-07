import React, { useState, useEffect } from 'react';  
import Sidebar from './sidebar';
import axios from 'axios';
import "../Vendors/table.css";

const Alluser = () => {
  const [vendors, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [expandedRows, setExpandedRows] = useState({});

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/allVendor`);
        const data = response.data;
        if (data.status === 'ok') {
          setUsers(data.data);
        } else {
          setMessage(data.message);
        }
      } catch (error) {
        setMessage('An error occurred: ' + error.message);
      }
    };
    fetchUsers();
  }, []);

  const handleView = (VendorId) => {
    window.location.href = `/SuperAdmin/ViewVendor/${VendorId}`;
  };

  const handleApproved = async (id, newStatus) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/updateApprovedVendor/${id}`,
        { approved: newStatus }
      );

      const data = response.data;
      if (data.status === 'ok') {
        setUsers(vendors.map(vendor =>
          vendor._id === id ? { ...vendor, approved: newStatus } : vendor
        ));
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage('An error occurred: ' + error.message);
    }
  };

  const toggleRow = (vendorId) => {
    setExpandedRows(prev => ({
      ...prev,
      [vendorId]: !prev[vendorId]
    }));
  };

  return (
    <div>
      <Sidebar />
      <div style={{ marginLeft: '250px' }} className='mt-5'>
        <h3>All Customers</h3>
        {message && <p>{message}</p>}
        {vendors.length > 0 ? (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>SI.No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Company Name</th>
                <th>Number</th>
                <th>Date Added</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {vendors.map((vendor, index) => (
                <tr key={vendor._id}>
                  <td>
                    <i 
                      className={expandedRows[vendor._id] ? 'far fa-minus-square' : 'far fa-plus-square'}
                      style={{ cursor: "pointer", marginRight: "8px" }}
                      onClick={() => toggleRow(vendor._id)}
                    ></i>
                    {index + 1}
                  </td>
                  <td>{vendor.fname}</td>
                  <td>{vendor.email}</td>
                  <td>{vendor.businessName}</td>
                  <td>{vendor.number}</td>
                  <td>{new Date(vendor.createdAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm mt-2 mb-2 width-100"
                      onClick={() => handleView(vendor._id)}
                    >
                      View
                    </button>
                    {expandedRows[vendor._id] && (
                      <div className='d-flex'>
                        <button
                          className={`btn ${vendor.approved ? 'btn-success' : 'btn-secondary'} me-2`}
                          onClick={() => handleApproved(vendor._id, true)}
                          disabled={vendor.approved === true}
                        >
                          Approved
                        </button>
                        <button
                          className={`btn ${vendor.approved === false ? 'btn-danger' : 'btn-secondary'}`}
                          onClick={() => handleApproved(vendor._id, false)}
                          disabled={vendor.approved === false}
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No vendors found</p>
        )}
      </div>
    </div>
  );
};

export default Alluser;
