import React, { useState, useEffect } from 'react'; 
import Sidebar from './sidebar';

const AllEnquiry = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const vendorId = localStorage.getItem('vendorId');
    if (!vendorId) {
      setMessage('Vendor ID not found');
      return;
    }

    fetch(`${process.env.REACT_APP_API_URL}/getAllEnquiry?vendorId=${vendorId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === 'ok') {
          setEnquiries(data.data);
        } else {
          console.error('Error:', data.message);
          setMessage('Error fetching enquiries: ' + data.message);
        }
      })
      .catch(error => {
        console.error('Fetch error:', error);
        setMessage('Error fetching enquiries');
      });
  }, []);

  return (
    <div>
      <Sidebar />
      <div className="add-category-container">
      <div className="content row mt-4">
        <div className="col-sm-12">
          <div className="title">
            <h2>All Enquiries</h2>
          </div>
          <div className='allenquiry'>
            {message && <p className="text-danger">{message}</p>}
            {enquiries.length > 0 ? (
              <table className="table">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Product Name</th>
                   
                    <th>Buyer Number</th>
                    <th>Buyer Name</th>
                    <th>Seller Name</th>
                    <th>Company Name</th>
                   
                    <th>Seller Email</th>
                  </tr>
                </thead>
                <tbody>
                  {enquiries.map((enquiry) => (
                    <tr key={enquiry._id}>
                      <td>
                        <img
                          src={enquiry.productImage ? 
                            `${process.env.REACT_APP_API_URL}/${enquiry.productImage.replace(/\\/g, '/')}` 
                            : '/placeholder.jpg'}
                          style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                          alt="Product"
                          onError={(e) => { e.target.src = '/placeholder.jpg'; }}
                        />
                      </td>
                      <td>{enquiry.productname}</td>
                    
                      <td>{enquiry.UserNumber}</td>
                      <td>{enquiry.Username}</td>
                      <td>{enquiry.vendorName || 'No Vendor'}</td>
                      <td>{enquiry.vendorBusiness || 'No Vendor'}</td>
                      <td>{enquiry.vendorEmail || 'No Email'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No Enquiries found</p>
            )}
          </div>
        </div>
      </div>
    </div>   </div>
  );
};

export default AllEnquiry;
