import React, { useState, useEffect, useContext } from 'react';
import { Table, Divider, Input, Menu, Dropdown, Checkbox, Button } from 'antd';
import { SearchOutlined, FilterOutlined, SortAscendingOutlined } from '@ant-design/icons';
import './index.css';
import { Link as RouterLink } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../axios'
import Sidenavbar from '../../layout/Sidenavbar-Manager';
import { ApiContext } from '../../apicontext/ApiContext';
import Navbar from '../../layout/Navbar';


const Appliedloan = () => {
    const [showSearch, setShowSearch] = useState(false);
    const [searchCustomerId, setSearchCustomerId] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [sortedColumn, setSortedColumn] = useState('fullname'); // Default sort column
    const [showFilter, setShowFilter] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState([]); // Added selectedStatus state
    const [data, setData] = useState([]);

    const { selectedApplicationNumber, setSelectedApplicationNumber } = useContext(ApiContext);

    const handleViewClick = (applicationNumber) => {
        setSelectedApplicationNumber(applicationNumber);
    };

    console.log(selectedApplicationNumber);

    useEffect(() => {
        getData();
    }, []);

    const columns = [
        {
            title: 'CustomerId',
            dataIndex: 'customerid',
            key: 'customerid',
            align: 'center',
        },
        {
            title: 'Fullame',
            dataIndex: 'fullname',
            key: 'fullname',
            align: 'center',
            sorter: (a, b) => a.fullname.localeCompare(b.fullname),
            sortOrder: 'fullname', // Default sorted column key
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Loan Type',
            dataIndex: 'loantype',
            key: 'loantype',
            align: 'center',
        },
        {
            title: 'Application Number',
            dataIndex: 'applicationnumber',
            key: 'applicationnumber',
            align: 'center',

        },
        {
            title: 'Loan Amount',
            dataIndex: 'loanamount',
            key: 'loanamount',
            align: 'center',
        },
        {
            title: 'Application Date',
            dataIndex: 'applicationdate',
            key: 'applicationdate',
            align: 'center',
        },
        {

            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            align: 'center',

            render: (text) => {
                let color = '';
                switch (text) {
                    case 'Accept':
                        color = 'green';
                        break;
                    case 'Reject':
                        color = 'red';
                        break;
                    case 'Pending':
                        color = 'orange';
                        break;
                    case 'Closed':
                        color = 'grey';
                        break;
                    default:
                        break;
                }
                return (
                    <div style={{ backgroundColor: color, padding: '5px 10px', borderRadius: '6px', color: 'white' }}>
                        {text}
                    </div>
                );
            },
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            align: 'center',
            render: (text, record) => (
                <Button
                    type="default"
                    shape="round"
                    onClick={() => handleViewClick(record.applicationnumber)}
                    // disabled={record.status !== 'Pending'}
                    >
                    <Link component={RouterLink} to="/approval">
                        View
                    </Link>
                </Button>),
        },
    ];

    const getData = async () => {
        try {
            const res = await axios.get('/loans/AppliedLoans', {
                responseType: 'json',
            });
            const formattedData = res.data.map(item => {
                const appliedDate = new Date(item.appliedDate);

                const year = appliedDate.getFullYear();
                const month = appliedDate.getMonth() + 1;
                const day = appliedDate.getDate();
                const formattedAppliedDate = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;

                return {
                    customerid: item.customerId,
                    fullname: item.fullname,
                    loantype: item.loanCategory,
                    applicationnumber: item.loanId,
                    loanamount: item.status === 'Pending' ? item.appliedAmount : item.approvedAmount,
                    applicationdate: formattedAppliedDate,
                    status: item.status

                };
            });
            setData(formattedData);
        }
        catch (error) {
            console.log(error);
        }
    }

    const toggleSearch = () => {
        setShowSearch(!showSearch);
    };

    const handleSearchChange = (event) => {
        const value = event.target.value;
        setSearchCustomerId(value);
    };

    const sortedData = data.slice().sort((a, b) => {
        const aValue = a[sortedColumn];
        const bValue = b[sortedColumn];
        return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);

    });

    const columnsWithSort = columns.map(column => {
        if (column.key === 'fullname') {
            return {
                ...column,
                sorter: (a, b) => a.fullname.localeCompare(b.fullname),
                sortOrder: sortedColumn === 'fullname' ? sortOrder : false,
            };
        }
        return column;
    });

    const handleSort = (columnKey, e) => {
        const direction = e.key;
        if (sortedColumn === columnKey) {
            setSortOrder(direction);
        } else {
            setSortedColumn(columnKey);
            if (direction === 'asc') {
                setSortOrder('asc');
            } else {
                setSortOrder('desc');
            }
        }
    };

    const handleStatusChange = (selectedValues) => {
        setSelectedStatus(selectedValues);
    };

    const filteredData = sortedData
        .filter(item => (item.customerid !== null && item.customerid !== undefined) && item.customerid.toString().includes(searchCustomerId))

        .filter(item => selectedStatus.length === 0 || selectedStatus.includes(item.status));

    return (
        <div className="main-container">
            <Sidenavbar />
            <div className="appliedloan-container">
            <Navbar />
                <div>
                    <p>Loan Accelerator | Applied Loans</p>
                </div>
                <p className="appliedloan-title">Applied Loans</p>
                <Divider />
                <div className="search-container">
                    <span> <span className='icn'>{<FilterOutlined />}</span>  Filter </span> &nbsp;&nbsp;&nbsp;
                    <span onClick={toggleSearch} > {<SearchOutlined />} Search </span> &nbsp;&nbsp;&nbsp;&nbsp;
                    <Dropdown
                        overlay={
                            <Menu onClick={(e) => handleSort('fullname', e)}>
                                <Menu.Item key="asc">Sort Ascending</Menu.Item>
                                <Menu.Item key="desc">Sort Descending</Menu.Item>
                            </Menu>
                        }
                        trigger={['click']}
                    >
                        <span>
                            {<SortAscendingOutlined />} Sort
                        </span>
                    </Dropdown>
                    {showFilter && (
                        <Checkbox.Group style={{ marginLeft: '10px' }} onChange={handleStatusChange}>
                            <Checkbox value="Pending">Pending</Checkbox>
                            <Checkbox value="Approved">Approved</Checkbox>
                            <Checkbox value="Closed">Closed</Checkbox>
                        </Checkbox.Group>
                    )}

                    {showSearch && (
                        <Input
                            className="search-input"
                            placeholder="Search..."
                            value={searchCustomerId}
                            onChange={handleSearchChange}
                        />
                    )}
                </div>
                <Table columns={columnsWithSort} dataSource={filteredData} pagination={{ pageSize: 7 }} />
            </div>

        </div>
    );
};

export default Appliedloan;
