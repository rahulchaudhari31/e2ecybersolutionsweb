import { Route, Routes } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import Layout from "./components/layout/Layout";

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Routes>
        <Route path="*" element={<Layout />} />
      </Routes>
    </MotionConfig>
  );
}
