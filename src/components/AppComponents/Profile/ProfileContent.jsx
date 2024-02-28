import React, { useEffect, useState } from "react";
import {
  AiOutlineArrowRight,
  AiOutlineCamera,
  AiOutlineDelete,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import { MdTrackChanges } from "react-icons/md";
import Visa from "../../../assets/images/svg/Payment-Methods/Visa.svg";
import styles from "../../../styles/style";
import { updateUserInfomation } from "../../../redux/actions/user";
import { toast } from "react-toastify";
import axios from "axios";
import { BASE_URL } from "../../../config";

const ProfileContent = ({ active }) => {
  const { user, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [phoneNumber, setPhoneNumber] = useState(user && user.phoneNumber);
  const [password, setPassword] = useState(user && user.password);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // dispatch(updateUserInfomation(email, password, phoneNumber, name));
    axios
      .put(
        `${BASE_URL}/user/update-user-info`,
        {
          email,
          password,
          phoneNumber,
          name,
        },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.data.success === true) {
          toast.success(res.data.message);
          window.location.reload(true);
        } else {
          toast.error("Login failed. Please try again.");
        }
      })
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a non-2xx status code
          if (error.response.status === 404) {
            toast.error(error.response.data.message);
          } else if (error.response.status === 401) {
            toast.error(error.response.data.message);
          } else if (error.response.status === 400) {
            toast.error(error.response.data.message);
          } else {
            toast.error(`Server error: ${error.response.data.message}`);
          }
        } else if (error.request) {
          // The request was made but no response was received
          toast.error("Network error. Please check your internet connection.");
        } else {
          // Something happened in setting up the request that triggered an error
          toast.error("Request failed. Please try again later.");
        }
      });
  };

  return (
    <div className="w-full">
      {/* Profile Page  */}
      {active === 1 && (
        <>
          <div className="flex justify-center w-full">
            <div className="relative">
              <img
                src={user?.avatar.url}
                alt=""
                className="w-[150px] h-[150px] object-cover rounded-full border-[3px] border-[#3ad132]"
              />
              <div className="absolute flex items-center cursor-pointer rounded-full bg-[#e3e9ee] w-[30px] h-[30px] bottom-[10px] right-[10px]">
                <AiOutlineCamera size={20} className="relative left-1" />
              </div>
            </div>
          </div>
          <br />
          <br />
          <div className="w-full px-5 flex">
            <form
              className="w-full px-5"
              onSubmit={handleSubmit}
              aria-required={true}
            >
              <div className="flex flex-col justify-center items-center">
                <div className="w-full sm:flex block pb-3">
                  <div className="w-[100%] sm:w-[50%]">
                    <label className="block pb-2">Full Names</label>
                    <input
                      type="text"
                      name=""
                      id=""
                      className={`${styles.input} !w-[95%] mb-4 sm:mb-0`}
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="w-[100%] sm:w-[50%]">
                    <label className="block pb-2">Email Address</label>
                    <input
                      type="email"
                      name=""
                      id=""
                      disabled
                      className={`${styles.input} !w-[95%] mb-1 sm:mb-0`}
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="w-full flex pb-3">
                  <div className="w-full sm:flex block pb-3">
                    <div className="w-[100%] sm:w-[50%]">
                      <label className="block pb-2">Phone Number</label>
                      <input
                        type="number"
                        name=""
                        id=""
                        className={`${styles.input} !w-[95%] mb-4 sm:mb-0`}
                        required
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                      />
                    </div>
                    <div className="w-[100%] sm:w-[50%] ">
                      <label className="block pb-2">Enter Your Password</label>
                      <div className={`mt-1 relative`}>
                        <input
                          type={visible ? "text" : "password"}
                          name=""
                          id=""
                          className={`${styles.input} !w-[95%] mb-1 sm:mb-0`}
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        {visible ? (
                          <AiOutlineEye
                            className="absolute right-8 top-1 cursor-pointer"
                            size={25}
                            onClick={() => setVisible(false)}
                          />
                        ) : (
                          <AiOutlineEyeInvisible
                            className="absolute right-8 top-1 cursor-pointer"
                            size={25}
                            onClick={() => setVisible(true)}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div className="w-full flex pb-3">
                <div className="w-full sm:flex block pb-3">
                  <div className="w-[100%] sm:w-[50%]">
                    <label className="block pb-2">Address 1</label>
                    <input
                      type="address"
                      name=""
                      id=""
                      className={`${styles.input} !w-[95%] mb-4 sm:mb-0`}
                      required
                      value={address1}
                      onChange={(e) => setAddress1(e.target.value)}
                    />
                  </div>
                  <div className="w-[100%] sm:w-[50%]">
                    <label className="block pb-2">Address 2</label>
                    <input
                      type="address"
                      name=""
                      id=""
                      className={`${styles.input} !w-[95%] mb-4 sm:mb-0`}
                      required
                      value={address2}
                      onChange={(e) => setAddress2(e.target.value)}
                    />
                  </div>
                </div>
              </div> */}
                <button
                  type="submit"
                  className="mt-7 group relative w-[250px] h-[40px] flex justify-center py-2 px-4 border border-transparent text-md font-medium rounded-md text-white bg-blue-700 hover:bg-blue-600 uppercase"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </>
      )}

      {/* Order*/}
      {active === 2 && (
        <div>
          <AllOrders />
        </div>
      )}
      {/* Refund Order  */}
      {active === 3 && (
        <div>
          <AllRefundOrders />
        </div>
      )}
      {/* Order  */}
      {active === 4 && <div>{/* <AllOrders /> */}</div>}
      {/* Track Order  */}
      {active === 5 && (
        <div>
          <TrackOrder />
        </div>
      )}
      {/* Payment methods */}
      {active === 6 && (
        <div>
          <PaymentMethod />
        </div>
      )}
      {/* Address */}
      {active === 7 && (
        <div>
          <MyAddress />
        </div>
      )}
    </div>
  );
};

const AllOrders = () => {
  const orders = [
    {
      _id: "745gcgdje7464535",
      orderItems: [
        {
          name: "Iphone 14 pro max",
        },
      ],
      totalPrice: 120,
      orderStatus: "Processing",
    },
    {
      _id: "57575784584535",
      orderItems: [
        {
          name: "Iphone 14 pro max",
        },
      ],
      totalPrice: 120,
      orderStatus: "Cancelled",
    },
    {
      _id: "745gcgdje749964535",
      orderItems: [
        {
          name: "Iphone 14 pro max",
        },
        {
          name: "mac book air",
        },
      ],
      totalPrice: 420,
      orderStatus: "Delivered",
    },
  ];

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        total: "US$ " + item.totalPrice,
        status: item.orderStatus,
      });
    });

  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};

const AllRefundOrders = () => {
  const orders = [
    {
      _id: "745gcgdje7464535",
      orderItems: [
        {
          name: "Iphone 14 pro max",
        },
      ],
      totalPrice: 120,
      orderStatus: "Processing",
    },
    {
      _id: "57575784584535",
      orderItems: [
        {
          name: "Iphone 14 pro max",
        },
      ],
      totalPrice: 120,
      orderStatus: "Cancelled",
    },
    {
      _id: "745gcgdje749964535",
      orderItems: [
        {
          name: "Iphone 14 pro max",
        },
        {
          name: "mac book air",
        },
      ],
      totalPrice: 420,
      orderStatus: "Delivered",
    },
  ];

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        total: "US$ " + item.totalPrice,
        status: item.orderStatus,
      });
    });

  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};

const TrackOrder = () => {
  const orders = [
    {
      _id: "745gcgdje7464535",
      orderItems: [
        {
          name: "Iphone 14 pro max",
        },
      ],
      totalPrice: 120,
      orderStatus: "Processing",
    },
    {
      _id: "57575784584535",
      orderItems: [
        {
          name: "Iphone 14 pro max",
        },
      ],
      totalPrice: 120,
      orderStatus: "Cancelled",
    },
    {
      _id: "745gcgdje749964535",
      orderItems: [
        {
          name: "Iphone 14 pro max",
        },
        {
          name: "mac book air",
        },
      ],
      totalPrice: 420,
      orderStatus: "Delivered",
    },
    {
      _id: "9hggx5645gcgdje749964535",
      orderItems: [
        {
          name: "Iphone 14 pro max",
        },
        {
          name: "mac book air",
        },
      ],
      totalPrice: 420,
      orderStatus: "Delivered",
    },
    {
      _id: "7ertvjjhyg45gcgdje749964535",
      orderItems: [
        {
          name: "Iphone 14 pro max",
        },
        {
          name: "mac book air",
        },
      ],
      totalPrice: 420,
      orderStatus: "Delivered",
    },
    {
      _id: "7turghdx45gcgdje749964535",
      orderItems: [
        {
          name: "Iphone 14 pro max",
        },
        {
          name: "mac book air",
        },
      ],
      totalPrice: 420,
      orderStatus: "Delivered",
    },
    {
      _id: "mfgdbd45gcgdje749964535",
      orderItems: [
        {
          name: "Iphone 14 pro max",
        },
        {
          name: "mac book air",
        },
      ],
      totalPrice: 420,
      orderStatus: "Delivered",
    },
    {
      _id: "989kg45gcgdje749964535",
      orderItems: [
        {
          name: "Iphone 14 pro max",
        },
        {
          name: "mac book air",
        },
      ],
      totalPrice: 420,
      orderStatus: "Delivered",
    },
    {
      _id: "45gbgf745gcgdje749964535",
      orderItems: [
        {
          name: "Iphone 14 pro max",
        },
        {
          name: "mac book air",
        },
      ],
      totalPrice: 420,
      orderStatus: "Delivered",
    },
    {
      _id: "4tg745gcgdje749964535",
      orderItems: [
        {
          name: "Iphone 14 pro max",
        },
        {
          name: "mac book air",
        },
      ],
      totalPrice: 420,
      orderStatus: "Delivered",
    },
    {
      _id: "745wqagcgdje749964535",
      orderItems: [
        {
          name: "Iphone 14 pro max",
        },
        {
          name: "mac book air",
        },
      ],
      totalPrice: 420,
      orderStatus: "Delivered",
    },
    {
      _id: "745dggcgdje749964535",
      orderItems: [
        {
          name: "Iphone 14 pro max",
        },
        {
          name: "mac book air",
        },
      ],
      totalPrice: 420,
      orderStatus: "Delivered",
    },
  ];

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/order/${params.id}`}>
              <Button>
                <MdTrackChanges size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        total: "US$ " + item.totalPrice,
        status: item.orderStatus,
      });
    });
  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};

const PaymentMethod = () => {
  return (
    <div className="w-full px-5">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-[25px] font-[600] text-[#000000ba]">
          Payment Methods
        </h1>
        <div className={`${styles.button} !rounded-md`}>
          <span className="text-[#fff]">Add New</span>
        </div>
      </div>
      <br />
      <div className="w-full bg-[#fff] h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10">
        <div className="flex items-center">
          <img src={Visa} alt="Visa Method" className="h-full w-10" />
          <h5 className="pl-5 font-[600]">Marcocholla Paul</h5>
        </div>
        <div className="pl-8 flex items-center">
          <h6>1234 **** **** ****</h6>
          <h5 className="pl-6">08/2023</h5>
        </div>
        <div className="min-w-[10%] flex justify-between pl-8">
          <AiOutlineDelete size={25} className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
};
const MyAddress = () => {
  return (
    <div className="w-full px-5">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-[25px] font-[600] text-[#000000ba]">My Address</h1>
        <div className={`${styles.button} !rounded-md`}>
          <span className="text-[#fff]">Add New</span>
        </div>
      </div>
      <br />
      <div className="w-full bg-[#fff] h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10">
        <div className="flex items-center">
          <h5 className="pl-5 font-[600]">Default Address</h5>
        </div>
        <div className="pl-8 flex items-center">
          <h6>00100 Nairobi, Kenya , Africa</h6>
        </div>
        <div className="pl-8 flex items-center">
          <h6>(+254) 742-275-513</h6>
        </div>
        <div className="min-w-[10%] flex justify-between pl-8">
          <AiOutlineDelete size={25} className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
};
export default ProfileContent;
