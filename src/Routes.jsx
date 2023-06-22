
import { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Progress from "./view/components/progress";

export default function UrlRoutes() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Progress />}>
        <Routes>
          <Route index element={<><h1>Página Home</h1></>} />
          <Route path="blogs" element={<><h1>Página de blogs</h1></>} />
          <Route path="contact" element={<><h1>página de contato</h1></>} />
          <Route path="*" element={<><h1>Ops, você está perdido...</h1></>} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
