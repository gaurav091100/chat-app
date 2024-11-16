import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Auth from "./pages/auth";
import Chat from "./pages/chat";
import Profile from "./pages/profile";
import PageNotFound from "./pages/404";
import { useAppStore } from "./store";
import { ReactNode, useEffect, useState } from "react";
import { apiClient } from "./lib/api-client";
import { GET_USER_INFO } from "./utils/constants";

const loader = () => {
  return <div>laodinng.....</div>;
};

interface RouteProps {
  children: ReactNode; // This ensures any valid React element can be passed as children
}

const PrivateRoute:React.FC<RouteProps> = ({ children }) => {
  const { userInfo } = useAppStore();
  const isAuthenticated = !!userInfo;
  return isAuthenticated ? children : <Navigate to="/auth" />;
};

const AuthRoute:React.FC<RouteProps> = ({ children }) => {
  const { userInfo } = useAppStore();
  const isAuthenticated = !!userInfo;
  return isAuthenticated ? <Navigate to="/chat" /> : children;
};
function App() {
  const { userInfo, setUserInfo } = useAppStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const response = await apiClient.get(GET_USER_INFO, {
          withCredentials: true,
        });        
        if(response.status === 200 && response.data.data.id){
          setUserInfo(response?.data?.data)
        }else{
          setUserInfo({});
        }
      } catch (error) {
        console.error(error);
        setUserInfo({});
      } finally{
        setLoading(false);
      }
    };
    if (!userInfo) {
      getUserInfo();
    } else {
      setLoading(false);
    }
  }, [userInfo, setUserInfo]);

  if (loading) {
    return <div>loading....</div>;
  }
  const router = createBrowserRouter([
    {
      path: "/auth",
      element: (
        <AuthRoute>
          <Auth />
        </AuthRoute>
      ),
      loader: loader,
      children: [],
    },
    {
      path: "/chat",
      element: (
        <PrivateRoute>
          <Chat />
        </PrivateRoute>
      ),
      loader: loader,
      children: [],
    },
    {
      path: "/profile",
      element: (
        <PrivateRoute>
          <Profile />
        </PrivateRoute>
      ),
      loader: loader,
      children: [],
    },
    {
      path: "*",
      element: <PageNotFound />,
      loader: loader,
      children: [],
    },
  ]);
  return (
    <RouterProvider router={router} fallbackElement={<div>loaderrrrrrr</div>} />
  );
}

export default App;
