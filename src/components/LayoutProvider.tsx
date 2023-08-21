"use client";
import React from "react";
import { Toaster } from "react-hot-toast";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { SetCurrentUser } from "@/redux/usersSlice";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import Spinner from "./Spinner";
import { SetLoading } from "@/redux/loadersSlice";
import { useRouter } from "next/navigation";

function LayoutProvider({ children }: { children: React.ReactNode }) {
  const { currentUser } = useSelector((state: any) => state.users);
  const { loading } = useSelector((state: any) => state.loaders);
  const pathname = usePathname();
  const router = useRouter();
  const isPublicRoute = pathname === "/login" || pathname === "/register";
  const dispatch = useDispatch();
  const getData = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await axios.get("/api/users/currentuser");
      dispatch(SetCurrentUser(response.data.data));
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      dispatch(SetLoading(false));
    }
  };

  const onLogout = async () => {
    try {
      dispatch(SetLoading(true));
      await axios.post("/api/users/logout");
      dispatch(SetCurrentUser(null));
      router.push("/login");
      toast.success("Logout successful");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      dispatch(SetLoading(false));
    }
  };

  useEffect(() => {
    if (!isPublicRoute) {
      getData();
    }
  }, [pathname]);

  return (
    <html lang="en">
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css"
          rel="stylesheet"
        ></link>
      </head>
      <body>
        {loading && <Spinner />}
        <Toaster position="top-center" reverseOrder={false} />

        {!isPublicRoute ? (
          <div>
            <div className="lg:mx-10 bg-primary text-white p-5 flex justify-between items-center rounded-b">
              <h1
                className="text-2xl font-bold cursor-pointer"
                onClick={() => router.push("/")}
              >
                Next-TM
              </h1>

              <div className="flex gap-5">
                <h1 className="underline cursor-pointer">
                  {currentUser?.username}
                </h1>
                <i
                  className="ri-logout-box-r-line text-white cursor-pointer"
                  onClick={onLogout}
                ></i>
              </div>
            </div>
            <div className="h-[85vh] lg:mx-10 mx-3 mt-5 ">{children}</div>
          </div>
        ) : (
          <div>{children}</div>
        )}
      </body>
    </html>
  );
}

export default LayoutProvider;
