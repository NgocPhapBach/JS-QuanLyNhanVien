//Global (toàn cục)
const dsnv = new DanhSachNhanVien();
const validation = new Validation();

//Hàm rút gọn cú pháp getElementById
function getELE(id) {
  return document.getElementById(id);
}

function setLocalStorage() {
  localStorage.setItem("DSNV", JSON.stringify(dsnv.mangNV));
}

function getLocalStorage() {
  if (localStorage.getItem("DSNV") != null) {
    // lấy được localStorage
    dsnv.mangNV = JSON.parse(localStorage.getItem("DSNV"));
    hienThiNV(dsnv.mangNV);
  }
}
// lấy dsnv từ local khi load trang web
getLocalStorage();

function themNhanVien() {
  // lấy thông tin
  var taiKhoan = getELE("tknv").value.trim();
  var ten = getELE("name").value;
  var email = getELE("email").value;
  var matKhau = getELE("password").value;
  var ngay = getELE("datepicker").value;
  var luong = getELE("luongCB").value;
  var chucVu = getELE("chucvu").value;
  var gioLam = getELE("gioLam").value;

  // kết quả kiểm tra dữ liệu
  var isValid = true;
  // kiểm tra tài khoản
  isValid &=
    validation.kiemTraRong(taiKhoan, "tbTKNV", "Tài khoản không được trống") &&
    validation.kiemTraTK(taiKhoan, "tbTKNV", "Tài khoản phải từ 4-6 chữ số") &&
    validation.kiemTraTrung(
      taiKhoan,
      "tbTKNV",
      "Tài khoản không được trùng",
      dsnv.mangNV
    );
  // kiểm tra tên
  isValid &=
    validation.kiemTraRong(ten, "tbTen", "Tên nhân viên không được trống") &&
    validation.kiemTraTen(ten, "tbTen", "Tên nhân viên phải là chữ cái");
  // kiểm tra email
  isValid &=
    validation.kiemTraRong(email, "tbEmail", "Email không được trống") &&
    validation.kiemTraEmail(email, "tbEmail", "Email không đúng định dạng");
  // kiểm tra mật khẩu
  isValid &=
    validation.kiemTraRong(matKhau, "tbMatKhau", "Mật khẩu không được trống") &&
    validation.kiemTraPass(
      matKhau,
      "tbMatKhau",
      "Mật khẩu phải có ít nhất 1 ký tự chữ, 1 in hoa, 1 số,1 đặc biêt, và từ 6-8 kí tự"
    );
  // kiểm tra ngày làm
  isValid &=
    validation.kiemTraRong(ngay, "tbNgay", "Ngày làm không được trống") &&
    validation.kiemTraNgayLam(ngay, "tbNgay", "Ngày làm không đúng định dạng");
  // kiểm tra lương
  isValid &=
    validation.kiemTraRong(
      luong,
      "tbLuongCB",
      "Lương cơ bản không được trống"
    ) &&
    validation.kiemTraLuong(
      luong,
      "tbLuongCB",
      "Tiền lương cơ bản từ 1.000.000-20.000.000"
    );
  // kiểm tra chức vụ
  isValid &= validation.kiemTraCV("chucvu", "tbChucVu", "Hãy chọn chức vụ");
  // kiểm tra giờ làm
  isValid &=
    validation.kiemTraRong(gioLam, "tbGiolam", "Giờ làm không được trống") &&
    validation.kiemTraGL(gioLam, "tbGiolam", "Số giờ làm từ 80-200 giờ");
  if (isValid) {
    // tất cả dữ liệu hợp lệ
    // tạo thể hiện của lớp NhanVien
    var nv = new NhanVien(
      taiKhoan,
      ten,
      email,
      matKhau,
      ngay,
      Number(luong),
      chucVu,
      gioLam
    );
    nv.tinhLuong();
    nv.xepLoai();

    // thêm nv vào mảng
    dsnv.themNV(nv);
    // lưu trữ local storage
    setLocalStorage();

    // lấy dữ liệu từ local storage
    getLocalStorage();

    alert("Thêm nhân viên thành công");

    reset();
  }
}

function hienThiNV(mang) {
  var content = "";
  mang.map(function (nv, index) {
    var trELE = `<tr>
            <td>${nv.taiKhoan}</td>
            <td>${nv.tenNV}</td>
            <td>${nv.email}</td>
            <td>${nv.ngayLam}</td>
            <td>${nv.chucVu}</td>
            <td>${nv.tongLuong}</td>
            <td>${nv.loai}</td>
            <td>
                <button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="hienThiChiTiet('${nv.taiKhoan}')">Xem</button>
                <button class="btn btn-danger" onclick="xoaNhanVien('${nv.taiKhoan}')">Xóa</button>
            </td>
        </tr>`;
    content += trELE;
  });
  getELE("tableDanhSach").innerHTML = content;
}

function xoaNhanVien(id) {
  dsnv.xoaNV(id);

  // lưu trữ local storage
  setLocalStorage();

  // lấy dữ liệu từ local storage
  getLocalStorage();
}

function hienThiChiTiet(id) {
  var viTri = dsnv.timViTri(id);
  if (viTri > -1) {
    var arrSpanTB = document.getElementsByClassName("sp-thongbao");
    for (var i = 0; i < arrSpanTB.length; i++) {
      arrSpanTB[i].innerHTML = "";
      arrSpanTB[i].style.display = "none";
    }
    // document.getElementsByClassName(".form-gropp span").style.display = "none"

    getELE("btnThemNV").disabled = true;
    getELE("btnCapNhat").disabled = false;

    getELE("tknv").value = dsnv.mangNV[viTri].taiKhoan;
    getELE("tknv").disabled = true;

    getELE("name").value = dsnv.mangNV[viTri].tenNV;
    getELE("email").value = dsnv.mangNV[viTri].email;
    getELE("password").value = dsnv.mangNV[viTri].matKhau;
    getELE("datepicker").value = dsnv.mangNV[viTri].ngayLam;
    getELE("luongCB").value = dsnv.mangNV[viTri].luongCB;
    getELE("chucvu").value = dsnv.mangNV[viTri].chucVu;
    getELE("gioLam").value = dsnv.mangNV[viTri].gioLam;
  }
}

function capNhatNhanVien() {
  // lấy thông tin
  var taiKhoan = getELE("tknv").value.trim();
  var ten = getELE("name").value;
  var email = getELE("email").value;
  var matKhau = getELE("password").value;
  var ngay = getELE("datepicker").value;
  var luong = getELE("luongCB").value;
  var chucVu = getELE("chucvu").value;
  var gioLam = getELE("gioLam").value;

  // kết quả kiểm tra dữ liệu
  var isValid = true;
  // kiểm tra tên
  isValid &=
    validation.kiemTraRong(ten, "tbTen", "Tên nhân viên không được trống") &&
    validation.kiemTraTen(ten, "tbTen", "Tên nhân viên phải là chữ cái");
  // kiểm tra email
  isValid &=
    validation.kiemTraRong(email, "tbEmail", "Email không được trống") &&
    validation.kiemTraEmail(email, "tbEmail", "Email không đúng định dạng");
  // kiểm tra mật khẩu
  isValid &=
    validation.kiemTraRong(matKhau, "tbMatKhau", "Mật khẩu không được trống") &&
    validation.kiemTraPass(
      matKhau,
      "tbMatKhau",
      "Mật khẩu phải có ít nhất 1 ký tự chữ, 1 in hoa, 1 số,1 đặc biêt, và từ 6-8 kí tự"
    );
  // kiểm tra ngày làm
  isValid &=
    validation.kiemTraRong(ngay, "tbNgay", "Ngày làm không được trống") &&
    validation.kiemTraNgayLam(ngay, "tbNgay", "Ngày làm không đúng định dạng");
  // kiểm tra lương
  isValid &=
    validation.kiemTraRong(
      luong,
      "tbLuongCB",
      "Lương cơ bản không được trống"
    ) &&
    validation.kiemTraLuong(
      luong,
      "tbLuongCB",
      "Tiền lương cơ bản từ 1.000.000-20.000.000"
    );
  // kiểm tra chức vụ
  isValid &= validation.kiemTraCV("chucvu", "tbChucVu", "Hãy chọn chức vụ");
  // kiểm tra giờ làm
  isValid &=
    validation.kiemTraRong(gioLam, "tbGiolam", "Giờ làm không được trống") &&
    validation.kiemTraGL(gioLam, "tbGiolam", "Số giờ làm từ 80-200 giờ");
  if (isValid) {
    // tất cả dữ liệu hợp lệ
    // tạo thể hiện của lớp NhanVien
    var nv = new NhanVien(
      taiKhoan,
      ten,
      email,
      matKhau,
      ngay,
      Number(luong),
      chucVu,
      gioLam
    );
    nv.tinhLuong();
    nv.xepLoai();

    // thêm nv vào mảng
    dsnv.capNhat(nv);

    // lưu trữ local storage
    setLocalStorage();

    // lấy dữ liệu từ local storage
    getLocalStorage();

    alert("Cập nhật nhân viên thành công");
    $('#myModal').modal('hide');
  }
}

getELE("btnTimNV").onclick = function () {
  var loaiTK = getELE("searchName").value;
  var mangTK = [];

  mangTK = dsnv.timKiemLoai(loaiTK);
  hienThiNV(mangTK);
};

getELE("tknv").onkeyup = function () {
  var taiKhoan = getELE("tknv").value.trim();
  validation.kiemTraRong(taiKhoan, "tbTKNV", "Tài khoản không được trống") &&
    validation.kiemTraTK(taiKhoan, "tbTKNV", "Tài khoản phải từ 4-6 chữ số") &&
    validation.kiemTraTrung(
      taiKhoan,
      "tbTKNV",
      "Tài khoản không được trùng",
      dsnv.mangNV
    );
};

getELE("name").onkeyup = function () {
  var ten = getELE("name").value;
  validation.kiemTraRong(ten, "tbTen", "Tên nhân viên không được trống") &&
    validation.kiemTraTen(ten, "tbTen", "Tên nhân viên phải là chữ cái");
};

getELE("email").onkeyup = function () {
  var email = getELE("email").value;
  validation.kiemTraRong(email, "tbEmail", "Email không được trống") &&
    validation.kiemTraEmail(email, "tbEmail", "Email không đúng định dạng");
};

getELE("password").onkeyup = function (){
  var matKhau = getELE("password").value;
  validation.kiemTraRong(matKhau, "tbMatKhau", "Mật khẩu không được trống") &&
    validation.kiemTraPass(
      matKhau,
      "tbMatKhau",
      "Mật khẩu phải có ít nhất 1 ký tự chữ, 1 in hoa, 1 số,1 đặc biêt, và từ 6-8 kí tự"
    );
}

getELE("datepicker").onkeyup = function (){
  var ngay = getELE("datepicker").value;
  validation.kiemTraRong(ngay, "tbNgay", "Ngày làm không được trống") &&
    validation.kiemTraNgayLam(ngay, "tbNgay", "Ngày làm không đúng định dạng");
}

getELE("luongCB").onkeyup = function (){
  var luong = getELE("luongCB").value;
  validation.kiemTraRong(
    luong,
    "tbLuongCB",
    "Lương cơ bản không được trống"
  ) &&
  validation.kiemTraLuong(
    luong,
    "tbLuongCB",
    "Tiền lương cơ bản từ 1.000.000-20.000.000"
  );
}

getELE("chucvu").onchange = function (){
  validation.kiemTraCV("chucvu", "tbChucVu", "Hãy chọn chức vụ");
}

getELE("gioLam").onkeyup = function (){
  var gioLam = getELE("gioLam").value;
  validation.kiemTraRong(gioLam, "tbGiolam", "Giờ làm không được trống") &&
    validation.kiemTraGL(gioLam, "tbGiolam", "Số giờ làm từ 80-200 giờ");
}

getELE("searchName").onkeyup = function () {
  var loaiTK = getELE("searchName").value;
  var mangTK = [];

  mangTK = dsnv.timKiemLoai(loaiTK);
  hienThiNV(mangTK);
};

function reset() {
  var arrSpanTB = document.getElementsByClassName("sp-thongbao");
  for (var i = 0; i < arrSpanTB.length; i++) {
    arrSpanTB[i].innerHTML = "";
    arrSpanTB[i].style.display = "none";
  }

  getELE("btnThemNV").disabled = false;
  getELE("btnCapNhat").disabled = true;
  getELE("tknv").disabled = false;

  getELE("formNV").reset();
}
