/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../features/UserDataSlice";
import axios from "axios";
import { useState } from "react";
import 'C:/Users/Faisal/Desktop/client/src/LoginForm.css';
import { useNavigate } from "react-router-dom";
import Todos from "./Todos";
import { Button } from "antd";

export default function Home ()  {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
   

    try {
      const response = await axios.post('https://api.freeapi.app/v1/users/login', {
        username: username,
        password: password
      }).finally(()=> {
        console.log("response")
      });
      navigate("/todos");
      


      setUserData(response.data);
      setError('');
    } catch (error) {
      setError('Invalid username or password.');
      console.error('API Error:', error);
    }

  };


    const data = useSelector((state) => state.app);
    console.log("data", data.users);
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(getUser());
    } 
    console.log({username, password})
    return(
        <>
            <div className="login-form-container">
      <form onSubmit={handleSubmit} className="form_wrapper">
        <input id="input"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input id="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="primary" onClick={handleSubmit}>Login</Button>
        {data?.user?.length > 0 ? data.users.map((element, key) => {
                    return(
                        <>
                            <h1>{element.name}</h1>
                        </>
                    )
                }): ""}
      </form>

      {userData && (
        <div className="user-data">
          <h2>{userData.username}</h2>
          <p>{userData.email}</p>
          {/* Add other data fields from the API response */}
        </div>
      )}

      {error && <div className="error-message">{error}</div>}
    </div>
        </>
    );
}