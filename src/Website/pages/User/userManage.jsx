import ReactPaginate from 'react-paginate';
import React, { useEffect, useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai'
import { BiMessageSquareEdit } from 'react-icons/bi'
import { FiTrash } from 'react-icons/fi'
// import { AdminService } from '../../../----services/admin';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../../utils/routes';
import { UserService } from '../../../services/user';

export const UserManage = () => {

    const { getAllUser } = UserService();
    const [data, setData] = useState([])

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = () => {
        getAllUser().then((res) => {
            console.log(res?.data, 'response');
            setData(res?.data?.data)
        }).catch((res) => {
            console.log(res, 'error');
        })
    }


    const [searchTerm, setSearchTerm] = useState('');
    const [pageNumber, setPageNumber] = useState(0);
    const handlePageClick = (data) => {
        const selectedPage = data.selected;
        setPageNumber(selectedPage);
    };
    const itemsPerPage = 8;
    const startIndex = pageNumber * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageCount = Math.ceil(data.length / itemsPerPage);
    const currentItems = data.filter((item) => {
        if (searchTerm === '') {
            return item;
        } else if (
            item.fullname.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
            return item;
        }
    }).slice(startIndex, endIndex);
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        setPageNumber(0);
    };

    return (
        <React.Fragment>
            <section className='mainSection'>
                <div className="container">
                    <div className="mainSectionWrapper">
                        <div className="heading">
                            <p>
                                MANAGE USER
                            </p>
                        </div>
                        <div className="card cardForm">
                            <div className="card-body">
                                <div className="tableSearch">
                                    {/* <div className="tableInnerHeading">
                            Physical Doctor
                        </div> */}
                                    <input type="text" placeholder="Search..."
                                        onChange={handleSearch}
                                    />
                                </div>
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">ID</th>
                                                <th scope="col">User Name</th>
                                                <th scope="col">Email</th>
                                                <th scope="col">Country</th>
                                                <th scope="col">Phone</th>
                                                {/* <th scope="col">Details</th> */}
                                                {/* <th scope="col">Actions</th> */}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentItems.map((item, keyId) => (

                                                <tr key={keyId}>
                                                    <td>{item._id}</td>
                                                    <td>{item.fullname}</td>
                                                    <td>{item.email}</td>
                                                    <td>{item.country}</td>
                                                    <td>{item.phonenumber}</td>
                                                    {/* <td><Link>Details</Link></td> */}
                                                    {/* <td>

                                                        <div className="actionButtons">
                                                            <Link>
                                                                <FiTrash />
                                                            </Link>
                                                        </div>

                                                    </td> */}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <ReactPaginate
                                    pageCount={pageCount}
                                    onPageChange={handlePageClick}
                                    containerClassName={'pagination'}
                                    activeClassName={'active'}
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}
