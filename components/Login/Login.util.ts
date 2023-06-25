import User from "../../interfaces/User";
import { setCookie } from "typescript-cookie";
const doLogin = async (
  credentials: User,
  handleOpen: any,
  handleClose: any
) => {
  try {
    const data = await fetch(
      "https://dull-puce-badger-tux.cyclic.app/user/login",
      {
        cache: "no-store",
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      }
    );
    const res = await data.json();
    if (res.success) {
      setCookie("token", res.token, { expires: 1 / 24 });
      handleClose();
    } else {
      alert("Login failed, Please Try Again");
      handleOpen();
    }
  } catch (err) {
    alert("Login failed, Please Try Again");
  }
};

export default doLogin;
