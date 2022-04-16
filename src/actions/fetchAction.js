import store from "../store";

export const fetch_post = () => {
  return {
    type: "FETCH_USER",
  };
};
export const receive_post = (post) => {
  return {
    type: "FETCHED_USER",
    data: post,
  };
};
export const receive_error = () => {
  return {
    type: "RECEIVE_ERROR",
  };
};

export const thunk_action_creater = (username) => {
  const user = username.replace(/\s/g, ""); //ตัดช่องว่างออกจาก username
  store.dispatch(fetch_post());
  //dispatch, getState เป็น method ของ redux store 
  //จะต้องรับมาด้วยเพื่อทำการ dispatch action ไปยัง store จะได้รับข้อมูลมาใช้งานได้
  return function (dispatch, getState) {
    return fetch(`https://api.github.com/users/${user}`)
      .then((data) => data.json())
      .then((data) => {
        if (data.message === "Not Found") {
          throw new Error("No such user found!");
        } else {
          dispatch(receive_post(data));
          //ถ้าอยากเปลี่ยนข้อมูลจะต้องทำการ เรียก dispatch และส่ง action ไปให้ store
        }
      })
      .catch((err) => dispatch(receive_error()));
  };
};
