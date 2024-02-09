import React, { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, authActions } from "./store";
import NavBar from "./components/NavBar"
import { Flex } from "rebass";

const App = () => {

  const navigate = useNavigate();
  const accessToken = useSelector((state: RootState) => (state.authReducer.accessToken))
  const dispatch = useDispatch();

  useEffect( () => {
    if (accessToken) {

      dispatch(authActions.setuser({accessToken}))
  }

  }, [])

  return (
    accessToken ? (
      <Flex height={"100vh"} >
        <NavBar />
        <Outlet />
      </Flex>
    
    ) : <Navigate to='/login' replace={true} />
    
  )
};

export default App;
