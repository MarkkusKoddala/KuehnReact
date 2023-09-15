import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {headings} from "../utils/constants";
import {useLocation, useNavigate} from "react-router-dom";

export const DetailsPage = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const { state } = useLocation();
  const navigate = useNavigate();

  console.log(state)



  const [formData, setFormData] = useState(
      {orderNo: state.orderNo,
      date: state.date,
      customer: state.customer,
      trackingNo: state.trackingNo,
      status: state.status,
      consignee: state.consignee});

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    //here will be axios.put request that will be sent to back end.
  };

  const handleChange = (event) => {

    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  function handleBackClick() {
    navigate(-1)
  }

  return (
      <div className="container">
        <h3>Shipment details</h3>
        <form>
          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="orderNo" className="form-label">Order Number</label>
                <input type="text" className="form-control" id="orderNo" name="orderNo" value={formData.orderNo} onChange={handleChange} disabled={!isEditing}/>
              </div>
              <div className="mb-3">
                <label htmlFor="customer" className="form-label">Customer</label>
                <input type="text" className="form-control" id="customer" name="customer" value={formData.customer} disabled={!isEditing} onChange={handleChange}/>
              </div>
              <div className="mb-3">
                <label htmlFor="consignee" className="form-label">Consignee</label>
                <input type="text" className="form-control" id="consignee" name="consignee" value={formData.consignee} disabled={!isEditing} onChange={handleChange}/>
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="date" className="form-label">Date</label>
                <input type="text" className="form-control" id="date" name="date" value={formData.date} disabled={!isEditing} onChange={handleChange}/>
              </div>
              <div className="mb-3">
                <label htmlFor="trackingNo" className="form-label">Tracking Number</label>
                <input type="text" className="form-control" id="trackingNo" name="trackingNo" value={formData.trackingNo} disabled={!isEditing} onChange={handleChange}/>
              </div>
              <div className="mb-3">
                <label htmlFor="status" className="form-label">Status</label>
                <input type="text" className="form-control" id="status" name="status" value={formData.status} disabled={!isEditing} onChange={handleChange}/>
              </div>
            </div>
          </div>
          <div className="mb-3">

            {!isEditing ? (
                <div>
                <button type="button" className="btn btn-outline-info" onClick={handleBackClick}>Back</button>
                <button type="button" className="btn btn-primary " onClick={handleEditClick}>Edit</button>
                </div>
            ) : (
                <button type="button" className="btn btn-success" onClick={handleSaveClick}>Save</button>
            )}
          </div>
        </form>
      </div>
  );
};


