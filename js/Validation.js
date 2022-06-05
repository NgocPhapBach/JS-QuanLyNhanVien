// chức các phương thức kiểm tra dữ liệu
function Validation() {
  this.kiemTraRong = function (value, spanID, message) {
    if (value.trim() == "") {
      // không hợp lệ
      document.getElementById(spanID).innerHTML = message;
      document.getElementById(spanID).style.display = "block";
      return false;
    }
    // hợp lệ
    document.getElementById(spanID).innerHTML = "";
    document.getElementById(spanID).style.display = "none";
    return true;
  };
  this.kiemTraTrung = function (value, spanID, message, mangNV) {
    //  some() => return true/false
    // map() => return 1 mảng mới

    var isExist = mangNV.some(function (nv) {
      //từng đối tượng sv trong mảng
      //? đk kiểm tra => return
      // return điều kiện kiểm tra
      return value === nv.taiKhoan;
    });

    if (isExist) {
      //có sv bị trùng mã
      document.getElementById(spanID).innerHTML = message;
      document.getElementById(spanID).style.display = "block";
      return false;
    }

    //hợp lệ
    document.getElementById(spanID).innerHTML = "";
    document.getElementById(spanID).style.display = "none";
    return true;
  };
  this.kiemTraTK = function (value, spanID, message) {
    var pattern = /^\d{4,6}$/;
    if (value.match(pattern)) {
      // hợp lệ
      document.getElementById(spanID).innerHTML = "";
      document.getElementById(spanID).style.display = "none";
      return true;
    }
    // không hợp lệ
    document.getElementById(spanID).innerHTML = message;
    document.getElementById(spanID).style.display = "block";
    return false;
  };
  this.kiemTraTen = function (value, spanID, message) {
    var pattern =
      /^[a-z A-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\\s]+$/;
    if (value.match(pattern)) {
      // hợp lệ
      document.getElementById(spanID).innerHTML = "";
      document.getElementById(spanID).style.display = "none";
      return true;
    }
    // không hợp lệ
    document.getElementById(spanID).innerHTML = message;
    document.getElementById(spanID).style.display = "block";
    return false;
  };
  this.kiemTraEmail = function (value, spanID, message) {
    var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (value.match(pattern)) {
      // hợp lệ
      document.getElementById(spanID).innerHTML = "";
      document.getElementById(spanID).style.display = "none";
      return true;
    }
    // không hợp lệ
    document.getElementById(spanID).innerHTML = message;
    document.getElementById(spanID).style.display = "block";
    return false;
  };
  this.kiemTraPass = function (value, spanID, message) {
    var pattern =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,10}$/;

    if (value.match(pattern)) {
      //đúng với biểu mẫu
      //hợp lệ
      document.getElementById(spanID).innerHTML = "";
      document.getElementById(spanID).style.display = "none";
      return true;
    }

    //không hợp lệ
    document.getElementById(spanID).innerHTML = message;
    document.getElementById(spanID).style.display = "block";
    return false;
  };
  this.kiemTraNgayLam = function(value, spanID, message){
    var pattern = /^(0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-]\d{4}$/;
    var comp = value.split('/');
    var m = parseInt(comp[0], 10);
    var d = parseInt(comp[1], 10);
    var y = parseInt(comp[2], 10);
    var date = new Date(y,m-1,d);
    if (value.match(pattern) && date.getMonth() +1 == m && date.getDate() == d && date.getFullYear() == y){
      // hợp lệ
      document.getElementById(spanID).innerHTML = "";
      document.getElementById(spanID).style.display = "none";
      return true;
    }
    //không hợp lệ
    document.getElementById(spanID).innerHTML = message;
    document.getElementById(spanID).style.display = "block";
    return false;
  }
  this.kiemTraLuong = function (value, spanID, message) {
    var pattern = /^(\d{7,8}(\.\d{7,8})?)$/;

    if (value.match(pattern) && value >= 1e6 && value <= 20e6) {
      // hợp lệ
      document.getElementById(spanID).innerHTML = "";
      document.getElementById(spanID).style.display = "none";
      return true;
    }
    // không hợp lệ
    document.getElementById(spanID).innerHTML = message;
    document.getElementById(spanID).style.display = "block";
    return false;
  };
  this.kiemTraCV = function (selectID, spanID, message) {
    var optionIndex = document.getElementById(selectID).selectedIndex;
    if (optionIndex !== 0) {
      //hợp lệ
      document.getElementById(spanID).innerHTML = "";
      document.getElementById(spanID).style.display = "none";
      return true;
    }
    //không hợp lệ
    document.getElementById(spanID).innerHTML = message;
    document.getElementById(spanID).style.display = "block";
    return false;
  };
  this.kiemTraGL = function (value, spanID, message) {
    var pattern = /^(\d{2,3}(\.\d{2,3})?)$/;

    if (value.match(pattern) && value >= 80 && value <= 200) {
      // hợp lệ
      document.getElementById(spanID).innerHTML = "";
      document.getElementById(spanID).style.display = "none";
      return true;
    }
    // không hợp lệ
    document.getElementById(spanID).innerHTML = message;
    document.getElementById(spanID).style.display = "block";
    return false;
  };
}
