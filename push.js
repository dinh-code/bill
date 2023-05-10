var s = new URL(location.href).searchParams.get("bill");
var j = JSON.parse(decodeURIComponent(s));
var qrSize = 150;

document.title="["+j.key+"] Nha khoa SV - Hóa đơn";
//Khách hàng
document.getElementById("hoTen").innerText=j.hoTen;
document.getElementById("sdt").innerText=j.sdt;
document.getElementById("diaChi").innerText="Địa chỉ: "+j.diaChi;
//Thông tin đơn hàng
document.getElementById("key").innerText=j.key;
document.getElementById("ngayDat").innerText=j.ngayDat;
document.getElementById("tenDVVC").innerText=j.tenDVVC;
document.getElementById("maDon").innerText=j.maDon;
new QRCode(document.getElementById("keyQr"), {text: "https://nhakhoasv.com?orderKey="+j.key, width: qrSize, height: qrSize});
new QRCode(document.getElementById("momo"), {text: "2|99|0968747831|Dinh Phuoc An||0|0|"+j.tienHangN+"|"+j.key+" "+removeVietnameseTones(j.hoTen)+" "+j.sdt+"|transfer_myqr", width: qrSize, height: qrSize});
new QRCode(document.getElementById("gmap"), {text: "https://goo.gl/maps/WNVStknA7ZxCAQG48", width: qrSize, height: qrSize});
document.getElementById("vcb").src="https://img.vietqr.io/image/VCB-9968747831-qr_only.png?amount="+j.tienHangN+"&addInfo="+j.key+"%20"+j.hoTen+"%20"+j.sdt+"&accountName=Dinh phuoc an";
//Chi tiết
j.chiTiet.sort((a, b)=>{
    if(a[0] > b[0]) return -1;
}).forEach((item)=>{
    item[6] = item[6] != '0' ? item[6] : "";
    document.getElementById("chiTiet").insertRow(1).innerHTML=
    `<tr>
            <td class="text-center">${item[0]}</td>
            <td>
                <div class="card f-center flex h-fit">
                    <div class="card-body">${item[1]}</div>
                    <div class="card-header">${item[2]}</div>
                </div>
            </td>
            <td class="text-center">${item[3]}</td>
            <td class="text-right">${item[4]}</td>
            <td class="text-right">${item[5]}</td>
            <td class="text-center">${item[6]}</td>
            <td>${item[7]}</td>
        </tr>`;
});

document.getElementById("tongSoLg").innerText=j.tongSoLg;
document.getElementById("tienHang").innerText=j.tienHang;
document.getElementById("soKien").innerText=j.soKien;
document.getElementById("ghiChu").innerText=j.ghiChu;

var isShow = true;
document.getElementById("shop").addEventListener("click", ()=>{
    
    isShow = isShow ? false : true;
    if(isShow){
        document.getElementById("shop").style.visibility = "unset";
    } else {
        document.getElementById("shop").style.visibility = "collapse";
    }
});


