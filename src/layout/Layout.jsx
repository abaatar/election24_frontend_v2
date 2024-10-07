import React, { useContext, Suspense, useEffect, lazy } from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";

//internal import
import { AdminContext } from "@/context/AdminContext";
import Main from "@/layout/Main";
import routes from "@/routes/index";
import Header from "@/components/header/Header";
import Sidebar from "@/components/sidebar/Sidebar";
import { SidebarContext } from "@/context/SidebarContext";
import ThemeSuspense from "@/components/theme/ThemeSuspense";
const Page404 = lazy(() => import("@/pages/404"));

const Layout = () => {
  const { state } = useContext(AdminContext);
  const { adminInfo } = state;

  console.log("adminInfo", adminInfo);

  const { isSidebarOpen, closeSidebar, navBar } = useContext(SidebarContext);
  let location = useLocation();

  const isOnline = navigator.onLine;

  // console.log('routes',routes)

  useEffect(() => {
    closeSidebar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <>
      {!isOnline && (
        <div className="flex justify-center bg-red-600 text-white">
          You are in offline mode!{" "}
        </div>
      )}
      <div
        className={`flex h-screen bg-gray-50 dark:bg-gray-900 ${
          isSidebarOpen && "overflow-hidden"
        }`}
      >
        {navBar && <Sidebar />}

        <div className="flex flex-col flex-1 w-full">
          <Header />
          <Main>
            <Suspense fallback={<ThemeSuspense />}>
              <Switch>
                {routes.map((route, i) => {
                  if (
                    route.path === "/dashboard" ||
                    route.path === "/coupons" ||
                    route.path === "/person"
                  ) {
                    // Allow everyone access to /dashboard
                    return route.component ? (
                      <Route
                        key={i}
                        exact={true}
                        path={`${route.path}`}
                        render={(props) => <route.component {...props} />}
                      />
                    ) : null;
                  } else {
                    return route.component && adminInfo.role === "Admin" ? (
                      <Route
                        key={i}
                        exact={true}
                        path={`${route.path}`}
                        render={(props) => <route.component {...props} />}
                      />
                    ) : null;
                  }
                })}
                <Redirect exact from="/" to="/dashboard" />
                <Route component={Page404} />
              </Switch>
            </Suspense>
          </Main>
        </div>
      </div>
    </>
  );
};

export default Layout;
