import axios from "axios";
import { BASE_URL } from "../../config";

// load user
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadUserRequest",
    });
    const { data } = await axios.get(`${BASE_URL}/user/getuser`, {
      withCredentials: true,
    });
    dispatch({
      type: "LoadUserSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "LoadUserFail",
      payload: error.response.data.message,
    });
  }
};
// load shop / seller
export const loadSeller = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadSellerRequest",
    });
    const { data } = await axios.get(`${BASE_URL}/shop/getshop`, {
      withCredentials: true,
    });
    dispatch({
      type: "LoadSellerSuccess",
      payload: data.shop,
    });
  } catch (error) {
    dispatch({
      type: "LoadSellerFail",
      payload: error.response.data.message,
    });
  }
};

// update user information
export const updateUserInfomation =
  ({ email, password, phoneNumber, name }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: "updateUserInfoRequest",
      });

      const { data } = await axios.put(
        `${BASE_URL}/user/update-user-info`,
        {
          email,
          password,
          phoneNumber,
          name,
        },
        { withCredentials: true }
      );

      dispatch({
        type: "updateUserSuccess",
        payload: data.user,
      });
    } catch (error) {
      dispatch({
        type: "updateUserFailed",
        payload: error.response.data.message,
      });
    }
  };
