import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  Home,
  Login,
  CTCH,
  CTMB,
  CTPT,
  NCT,
  Homepage,
  DetailPost,
  Province,
  CreaterPost,
  ManagePost,
} from "./container/public";
import { path } from "./ultils/constants";
import Profile from "./container/public/Profile";
function App() {
  return (
    <Routes>
      <Route path={path.home} element={<Home />}>
        <Route path={"*"} element={<Homepage />} />
        <Route path={path.login} element={<Login />} />
        <Route path={path.CHO_THUE_CAN_HO} element={<CTCH />} />
        <Route path={path.CHO_THUE_MAT_BANG} element={<CTMB />} />
        <Route path={path.CHO_THUE_PHONG_TRO} element={<CTPT />} />
        <Route path={path.NHA_CHO_THUE} element={<NCT />} />
        <Route path={path.PHONG_TRO} element={<Province />} />
        <Route path={path.DETAIL_POST} element={<DetailPost />} />
      </Route>
      <Route path={path.THONG_TIN_CA_NHAN} element={<Profile />} />
      <Route path={path.DANG_TIN_MOI} element={<CreaterPost />} />
      <Route path={path.QUAN_LY_TIN_DANG} element={<ManagePost />} />
    </Routes>
  );
}

export default App;
