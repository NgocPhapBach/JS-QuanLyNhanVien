function DanhSachNhanVien() {
    this.mangNV = [];

    this.themNV = function (nv) {
        this.mangNV.push(nv);
    }
    this.timViTri = function (id) {
        var viTri = -1;
        this.mangNV.map(function(nv,index){
            // duyệt từng nhân viên
            // kiểm tra nhân viên nào đang có taiKhoan trùng với id cần tìm
            if(nv.taiKhoan === id){
                // tìm thấy
                viTri = index;
            }
        });
        return viTri;
    }
    this.xoaNV = function(id){
        var viTriXoa = this.timViTri(id);
        if(viTriXoa > -1){
            // tìm thấy
            this.mangNV.splice(viTriXoa,1);
        }
    }
    this.capNhat = function(nv){
        var viTriCapNhat = this.timViTri(nv.taiKhoan);
        if(viTriCapNhat > -1){
            // tìm thấy
            this.mangNV[viTriCapNhat] = nv;
        }
    }
    
}

DanhSachNhanVien.prototype.timKiemLoai = function (loaiTK) {
    var mangTK = [];
    var loaiThuong = loaiTK.toLowerCase();
    this.mangNV.map(function (nv) {
        var tenLoai = nv.loai.toLowerCase();
        if(tenLoai.indexOf(loaiThuong) > -1){
            mangTK.push(nv)
        }
    })
    return mangTK;
}