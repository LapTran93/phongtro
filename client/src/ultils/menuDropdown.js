import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faFile, faUser } from "@fortawesome/free-solid-svg-icons";
const menuDropdown = [
  {
    id: 1,
    text: "Đăng tin cho thuê",
    path: "/quan-ly/dang-tin-moi",
    icon: <FontAwesomeIcon icon={faPen} />,
  },
  {
    id: 2,
    text: "Quản lý tin đăng",
    path: "/quan-ly/tin-dang",
    icon: <FontAwesomeIcon icon={faFile} />,
  },
  {
    id: 3,
    text: "Thông tin cá nhân",
    path: "/quan-ly/thong-tin-ca-nhan",
    icon: <FontAwesomeIcon icon={faUser} />,
  },
];
export default menuDropdown;
