// import { lazy } from "react";
// import { Navigate } from "react-router-dom";

// const AuthLayout = lazy(() => import("@/components/layouts/Auth.layout"));
// const SignIn = lazy(() => import("@/features/auth/components/SignIn"));

// // Loader ngăn truy cập nếu đã login
// const alreadyAuthLoader = async () => {
//     const isLoggedIn = /* check token/session */ false;
//     if (isLoggedIn) {
//         throw new Response("Already authenticated", {
//             status: 302,
//             headers: { Location: "/dashboard" },
//         });
//     }
//     return null;
// };

// export default [
//     {
//         path: "/auth",
//         element: <AuthLayout />,
//         loader: alreadyAuthLoader,
//         children: [
//             { index: true, element: <Navigate to="sign-in" replace /> },
//             { path: "sign-in", element: <SignIn /> },
//         ],
//     },
// ];
