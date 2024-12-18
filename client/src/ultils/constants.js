export const path = {
  home: "/*",
  home__page: ":page",
  login: "login",
  HOME_PAGE: ":page",
  CHO_THUE_CAN_HO: "cho-thue-can-ho",
  CHO_THUE_MAT_BANG: "cho-thue-mat-bang",
  NHA_CHO_THUE: "nha-cho-thue",
  CHO_THUE_PHONG_TRO: "cho-thue-phong-tro",
  THONG_TIN_CA_NHAN: "quan-ly/thong-tin-ca-nhan",
  QUAN_LY_TIN_DANG: "/quan-ly/tin-dang",
  DANG_TIN_MOI: "quan-ly/dang-tin-moi",
  PHONG_TRO: "khu-vuc/:name",
  DETAIL_POST: "chi-tiet/:title/:postId",
};

export const title = {
  HOME_TITLE: "Tìm kiếm chỗ thuê ưng ý",
  SUB_TITLE:
    "Kênh thông tin Phòng trọ số 1 Việt Nam - Website đăng tin cho thuê phòng trọ, nhà nguyên căn, căn hộ, ở ghép nhanh, hiệu quả với 100.000+ tin đăng và 2.500.000 lượt xem mỗi tháng.",
};
export const titleNCT = {
  HOME_TITLE: "Tìm kiếm chỗ thuê ưng ý",
  SUB_TITLE: "Cho Thuê Nhà Nguyên Căn, Giá Rẻ, Chính Chủ, Mới Nhất 2024.",
};
export const titleCTPT = {
  HOME_TITLE: "Tìm kiếm chỗ thuê ưng ý",
  SUB_TITLE: "Cho Phòng Trọ, Phòng Trọ Giá Rẻ, Mới Nhất 2024.",
};
export const titleCTMB = {
  HOME_TITLE: "Tìm kiếm chỗ thuê ưng ý",
  SUB_TITLE: "Cho Thuê Mặt Bằng, Giá Rẻ, Chính Chủ, Mới Nhất 2024.",
};
export const titleCTCH = {
  HOME_TITLE: "Tìm kiếm chỗ thuê ưng ý",
  SUB_TITLE: "Cho Thuê Căn Hộ Chung Cư, Giá Rẻ, View Đẹp, Mới Nhất 2024.",
};
export const truncateText = (text, wordLimit) => {
  const wordsArray = text.split(" ");
  if (wordsArray.length > wordLimit) {
    return wordsArray.slice(0, wordLimit).join(" ") + "...";
  }
  return text;
};
export const formatVietNamtoString = (keyword) => {
  return keyword
    .toLowerCase() // Chuyển về chữ thường
    .normalize("NFD") // Tách các dấu tiếng Việt
    .replace(/[\u0300-\u036f]/g, "") // Loại bỏ dấu tiếng Việt
    .replace(/[^a-z0-9\s-]/g, "") // Loại bỏ các ký tự không phải chữ cái, số hoặc dấu cách, dấu '-'
    .replace(/\s+/g, "-") // Thay thế các khoảng trắng liên tiếp bằng dấu '-'
    .replace(/^-+|-+$/g, ""); // Loại bỏ dấu '-' ở đầu và cuối chuỗi
};

export const locationbtn = [
  {
    id: 1, // changed 'key' to 'id'
    name: "Phòng trọ Hồ Chí Minh",
    img: "https://cdn.tuoitre.vn/thumb_w/480/2018/11/19/photo-1-1542595734035976576209.jpg",
    value: 79,
  },
  {
    id: 2, // changed 'key' to 'id'
    name: "Phòng trọ Đà Nẵng",
    img: "https://ticotravel.com.vn/wp-content/uploads/2023/12/thoi-tiet-dong-nai-1.jpg",
    value: 48,
  },
  {
    id: 3, // changed 'key' to 'id'
    name: "Phòng trọ Hà Nội",
    img: "https://cdn-images.vtv.vn/Uploaded/lanchi/2013_09_19/10-hinh-anh-dac-trung-cua-ha-noi-0.jpg",
    value: 1,
  },
];
