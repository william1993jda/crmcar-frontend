import { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Progress from "./view/components/progress";
import Auth from "./view/auth";

export default function UrlRoutes() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Progress />}>
        <Routes>
          <Route index element={<Auth />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/vehicles" element={<><h1>Veículos</h1></>} />
          <Route path="*" element={<><h1>Ops, você está perdido...</h1></>} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
