import React, {useEffect, useState} from 'react';
import {headings} from "../utils/constants";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import remoteData from "../utils/Shipments.json";
import {Link, Navigate, useNavigate} from "react-router-dom";



const REMOTE_API_URL = "https://my.api.mockaroo.com/";

export const TablePage = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // State for error messages
    const navigate = useNavigate();

   useEffect(() => {
        const fetchDataAndHandleError = async () => {
            try {
                const response = await axios.get(REMOTE_API_URL+"shipments.json?key=5e0b62d0");
                setData(() => response.data)
                setLoading(false)

            } catch (error) {
                setError( "Failed to fetch data from server")
                console.error("Error fetching data from remote API:", error);
                console.log("Using local data:", remoteData);
                setData(() => remoteData)
                setLoading(false)

            }
        };

        fetchDataAndHandleError();
    }, []);


    const detailsButtonClickHandler = (item) => {
        console.log("vajutatud ")
        navigate("/details", {state: item})
    };

    const deleteButtonClickHandler = (itemToDelete) => {
        console.log("delete");
        const deleteAPIendpoint = 'XXX_API_ENDPOINT_URL';
        axios.delete(REMOTE_API_URL + deleteAPIendpoint) //it is an example how I would to the function to delete a row. Unfortunately I do not know the API endpoint URL and therefore it is getting error every time.
            .then((response) => {
                   if(response.status === 204) {
                       setData((prevData) => prevData.filter((item) => item.orderNo !== itemToDelete.orderNo));
                   }
            })
            .catch((error) => {
                console.error("Error deleting item:", error);
                setError("Failed to delete item. Please try again later.");
            });

        setData((prevData) => prevData.filter((item) => item.orderNo !== itemToDelete.orderNo)); // just to implement it works

    };

    if (loading) {
        return <p>Loading... It may take some time due to low API</p>;
    }

    return (
        <div className="m-5">
            {error && <p className="text-danger">{error}</p>}
            <div className="table-responsive">
                <table className="table table-striped table-bordered table-hover">
                    <thead>
                    <tr>
                        {headings.map((heading) => (
                            <th key={heading.key}>{heading.title}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            {headings.map((heading) => (
                                <td key={heading.key}>
                                    {heading.key === "button" ? (
                                        <div>
                                            <button type = "button" className = "btn btn-outline-info" onClick={() => detailsButtonClickHandler(item)}>Details</button>
                                            <span style={{ margin: '0 5px' }}></span>
                                            <button type = "button" className = "btn btn-outline-danger" onClick={() => deleteButtonClickHandler(item)}>Delete</button>
                                        </div>
                                    ) : (
                                        item[heading.key]
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
