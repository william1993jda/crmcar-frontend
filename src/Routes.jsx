import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Progress from "./view/components/progress";
// import Auth from "./view/auth";
// import { Register } from "./view/components";

const Auth = lazy(() => import('./view/auth'))
const Register = lazy(() => import('./view/components/register/Register'))

export default function UrlRoutes() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Progress />}>
        <Routes>
          <Route index element={<Auth />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<><h1>Ops, você está perdido...</h1></>} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
