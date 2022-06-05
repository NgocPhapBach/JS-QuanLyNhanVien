function NhanVien(taiKhoan, ten, email, matKhau, ngay, luong, chucVu, gioLam) {
    //Property
    this.taiKhoan = taiKhoan;
    this.tenNV = ten;
    this.email = email;
    this.matKhau = matKhau;
    this.ngayLam = ngay;
    this.luongCB = luong;
    this.chucVu = chucVu;
    this.gioLam = gioLam;
    this.tongLuong = 0;
    this.loai = "";
    //Method
    this.tinhLuong = function(){
        switch (this.chucVu) {
            case "Giám đốc":
                this.tongLuong = (this.luongCB * 3).toLocaleString();
                break;
            case "Trưởng phòng":
                this.tongLuong = (this.luongCB * 2).toLocaleString();
                break;
            case "Nhân viên":
                this.tongLuong = (this.luongCB).toLocaleString();
                break;
            default:
                break;
        }
    }
    this.xepLoai = function () {
        if(this.gioLam >= 192){
            this.loai = "Xuất sắc";
        } else if(this.gioLam >= 176 && this.gioLam < 192){
            this.loai = "Giỏi";
        } else if(this.gioLam >= 160 && this.gioLam < 176){
            this.loai = "Khá";
        } else if(this.gioLam >= 80 && this.gioLam < 160){
            this.loai = "Trung bình";
        }
    }
}
