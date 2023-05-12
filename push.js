const qrSize = 150;
const mHPre = '$';
var s = new URL(location.href).searchParams.get("bill");
var j = JSON.parse(decodeURIComponent(s));

const bill = {
    matHang: {},
    donHang: [],
    thongTin: [],
    dataImport: () => _dataImportBill(),

    container: () => _container(),
    info: (data) => _info(data),
    detail: (data) => _detail(data),
    shop: (data) => _shop(data),

    build: () => _build(),

    priceFormat: (n) => _priceFormat(n),
}

const qr = {
    qrSize: qrSize,

}

function _container(id = 1){
    let container = document.createElement('div');
    container.classList.add("container");
    container.innerHTML =
        `<div class="head">
            <div id="brand">
                <div id="brand-logo">
                    <img src="/logo-blue.svg">
                    <img src="/logo.svg">
                </div>
                <div>
                    <div id="brand-title" class="blue-text">NHA KHOA SV</div>
                    <div id="brand-site" class="blue-text">www.nhakhoasv.com</div>
                </div>
            </div>
            <div id="title">HÓA ĐƠN</div>
        </div>`;
    return container;
}
function _info({id = 0, data=[], no = '---', ten = '---', showInfo = false}){
    //let maVanDon = 'Mã vận đơn';
    //let maVanDonValue = data[6];
    let maVanDon = 'Khách hàng';
    let maVanDonValue = ten.length > 20 ? '...' + ten.substring(ten.length - 17) : ten;
    //let sdt = data[1].length > 0 ? data[1] : '---';
    let sdt = data[1].length > 0 ? '********' + data[1].substring(data[1].length - 2) : '---';
    let diaChi = '********' + data[2].substring(8);

    let info = document.createElement('div');
    info.classList.add("info");
    info.innerHTML =
        `<div class="info-top">
            <div class="info-top-left">
                <div class="card h">
                    <div class="card-header"><i class="material-icons">person</i> Đại lý (anh / chị):&nbsp;
                        <div class="card-body hoTen">${data[0]}</div>
                    </div>
                </div>
                <div class="card h">
                    <div class="card-header"><i class="material-icons">phone</i>Điện thoại:&nbsp;
                        <div id="sdt" class="card-body">${sdt}</div>
                    </div>
                </div>
                <div class="card">
                    <div class="card-header">
                        <i class="material-icons">pin_drop</i>
                        <!--div class="card-body dc" style="width: 16mm;">Địa chỉ:&nbsp;</div-->
                        <div id="diaChi" class="card-body dc">Địa chỉ: ${diaChi}</div>
                    </div>
                </div>
            </div>
            <div class="info-top-right">
                <div class="info-top-right-col1">
                    <div class="card">
                        <div class="card-header">Số hóa đơn</div>
                        <div id="key" class="card-body-sm">${no}</div>
                    </div>
                    <div class="card">
                        <div class="card-header">Ngày đặt</div>
                        <div id="ngayDat" class="card-body-sm">${data[4]}</div>
                    </div>        
                </div>
                <div class="info-top-right-col2">
                    <div class="card text-right">
                        <div class="card-header text-j-end">Vận chuyển</div>
                        <div id="tenDVVC" class="card-body-sm">${data[5]}</div>
                    </div>
                    <div class="card text-right">
                        <div class="card-header text-j-end">${maVanDon}</div>
                        <div id="maDon" class="card-body-sm">${maVanDonValue}</div>
                    </div>        
                </div>
                <div class="info-top-right-qrcode w17" id="keyQr${id}"></div>
            </div>
        </div>
    `;
    
    return info;
}
function _detail(data=[]){
    let soLg = data[1];
    let tienHang = bill.priceFormat(data[2]*1000);
    let ghiChu = data[3];
    let ds = data[0];
    let ds_sort = [];

    let detail = document.createElement('div');
    detail.classList.add("detail");
    detail.innerHTML =
        `<table id="chiTiet">
            <thead>
                <tr>
                    <th>#</th>
                    <th>SẢN PHẨM</th>
                    <th>SỐ LG</th>
                    <th>ĐƠN GIÁ</th>
                    <th>THÀNH TIỀN</th>
                    <th>#</th>
                    <th>GHI CHÚ</th>
                </tr>
            </thead>
            <tr class="blue-text">
                <td></td>
                <td class="text-center">TỔNG</td>
                <td id="tongSoLg" class="text-center">${soLg}</td>
                <td></td>
                <td id="tienHang" class="text-right" style="padding-right: 2mm;">${tienHang}</td>
                <td id="soKien" class="text-center">${ds.length/6}</td>
                <td id="ghiChu" class="text-center t-upper">${ghiChu}</td>
            </tr>
        </table>`;
    
    for (let i = 0; i < ds.length; i+=6){
        ds_sort[ds_sort.length] = {
            'ma': ds[i+0],
            'ten': bill.matHang[mHPre+ds[i+0]].ten,
            'moTa': bill.matHang[mHPre+ds[i+0]].bill,
            'soLg': ds[i+1],
            'gia': bill.priceFormat(ds[i+2]*1000),
            'thanhTien': bill.priceFormat(ds[i+3]*1000),
            'dongGoi': ds[i+4],
            'ghiChu': ds[i+5],
        };
    }

    ds_sort.sort((a, b)=>{
        if(a.ma > b.ma) return -1;
    }).forEach((item)=>{
        detail.firstChild.insertRow(1).innerHTML =
        `<tr>
            <td class="text-center">${item.ma}</td>
            <td>
                <div class="card f-center flex h-fit">
                    <div class="card-body">${item.ten}</div>
                    <div class="card-header">${item.moTa}</div>
                </div>
            </td>
            <td class="text-center">${item.soLg}</td>
            <td class="text-right">${item.gia}</td>
            <td class="text-right">${item.thanhTien}</td>
            <td class="text-center">${item.dongGoi}</td>
            <td>${item.ghiChu}</td>
        </tr>`;
    });

    /*for (let i = 0; i < ds.length; i+=6){
        detail.firstChild.insertRow(1).innerHTML =
        `<tr>
            <td class="text-center">${ds[i+0]}</td>
            <td>
                <div class="card f-center flex h-fit">
                    <div class="card-body">${bill.matHang[mHPre+ds[i+0]].ten}</div>
                    <div class="card-header">${bill.matHang[mHPre+ds[i+0]].bill}</div>
                </div>
            </td>
            <td class="text-center">${ds[i+1]}</td>
            <td class="text-right">${bill.priceFormat(ds[i+2]*1000)}</td>
            <td class="text-right">${bill.priceFormat(ds[i+3]*1000)}</td>
            <td class="text-center">${ds[i+4]}</td>
            <td>${ds[i+5]}</td>
        </tr>`;
    }*/
    



    return detail;
}
function _shop({id = 0, data = [], showInfo = true}){
    //let vcb = "https://img.vietqr.io/image/VCB-9968747831-qr_only.png?amount="+data[2]*1000+"&addInfo="+"23050500"+"%20"+removeVietnameseTones(data[3])+"%20"+bill.thongTin[1]+"&accountName=Dinh phuoc an";

    let shop = document.createElement('div');
    shop.classList.add("shop");
    shop.innerHTML = showInfo ?
        `<div class="col">
            <div class="info-top-right-qrcode">
                <img src="${"https://img.vietqr.io/image/VCB-9968747831-qr_only.png?amount="+data[2]*1000+"&addInfo="+"23050500"+"%20"+removeVietnameseTones(data[3])+"%20"+bill.thongTin[1]+"&accountName=Dinh phuoc an"}">
            </div>
            <div class="payInfo">
                <div class="headImg">
                    <img src="/vcb247.svg">
                </div>
                <div class="headInfo">
                    ĐINH PHƯỚC AN<br>9968 747 831
                </div>    
            </div>
        </div>
        <div class="col">
            <div class="info-top-right-qrcode" id="momo${id}">
            </div>
            <div class="payInfo">
                <div class="headImg">
                    <img src="/momo.svg">
                </div>
                <div class="headInfo">
                    ĐINH PHƯỚC AN<br>0968 747 831
                </div>
            </div>
        </div>
        <div class="col" style="justify-content: flex-end;">
            <div class="payInfo">
                <div class="headImg">
                    <img src="/gmap.svg">
                </div>
                <div class="headInfo" style="font-weight: bold;">
                    Mua hàng & tư vấn<BR>05696 08118 (Zalo)
                </div>
            </div>
            <div class="info-top-right-qrcode" id="gmap${id}"></div>
        </div>`:
        `<div class="col">
            <div class="info-top-right-qrcode" id="shopee${id}"></div>
            <div class="payInfo">
                <div class="headImg">
                    <img src="/shopee.svg">
                </div> 
                <div class="headInfo" style="visibility: hidden;">
                    ĐINH PHƯỚC AN<br>0968 747 831
                </div>
            </div>
        </div>
        <div class="col">
            <div class="info-top-right-qrcode" id="zalo${id}">
            </div>
            <div class="payInfo">
                <div class="headImg">
                    <img src="/zalo.svg">
                </div>
                <div class="headInfo">
                Mua hàng & tư vấn<BR>05696 08118
                </div>
            </div>
        </div>
        <div class="col" style="justify-content: flex-end;">
            <div class="payInfo">
                <div class="headImg">
                    <img src="/gmap.svg">
                </div>
                <div class="headInfo" style="font-weight: bold;">
                    49/24/5 Trịnh Đình Trọng<BR>Phú Trung, Tân Phú, HCM
                </div>
            </div>
            <div class="info-top-right-qrcode" id="gmap${id}"></div>
        </div>`;
    return shop;
}
function _build(){
    let id = 1;

    //Tổng đơn id = 0, bán hàng chi tiết thêm cột GIÁ IN HÓA ĐƠN


    let showInfo = bill.donHang.length > 1 ? false : true;
    bill.donHang.forEach(d => {
        let container = bill.container();
        let info = bill.info({"id": id, "data": bill.thongTin, "no": d[4], "ten": d[3].toUpperCase()});
        let detail = bill.detail(d);
        let shop = bill.shop({"id": id, "data": d, "showInfo": showInfo});
        
        container.appendChild(info);
        container.appendChild(detail);
        container.appendChild(shop);
        document.body.appendChild(container);

        new QRCode(document.getElementById("keyQr" + id), {text: bill.thongTin[3]+'', width: qrSize, height: qrSize});
        new QRCode(document.getElementById("gmap" + id), {text: "https://goo.gl/maps/WNVStknA7ZxCAQG48", width: qrSize, height: qrSize});
        //new QRCode(document.getElementById("momo" + id), {text: "2|99|0968747831|Dinh Phuoc An||0|0|"+d[2]*1000+"|"+bill.thongTin[3]+" "+bill.thongTin[0]+" "+bill.thongTin[1]+"|transfer_myqr", width: qrSize, height: qrSize});
        if (showInfo) {

        } else {
            new QRCode(document.getElementById("zalo" + id), {text: "https://zalo.me/0569608118", width: qrSize, height: qrSize});
            new QRCode(document.getElementById("shopee" + id), {text: "https://shopee.vn/nhakhoasinhvien", width: qrSize, height: qrSize});
        }

        id++;
    });
}
function _dataImportBill(){
    bill.matHang = _matHangGet(j.mh);
    bill.donHang = j.dh;
    bill.thongTin = j.tt;
    bill.thongTin[6] = bill.thongTin[6].length > 0 ? bill.thongTin[6] : '---';
}
function _priceFormat(n = 0){
    //return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(n);
    return n.toLocaleString('vi-VN') + ' đ';
}

function _matHangGet(data = []){
    let mh = {};

    for (let i = 0; i < data.length; i+=4){
        mh[mHPre+data[i]] = {"ten":data[i+1], "donVi": data[i+2], "moTa": data[i+3], "bill": data[i+3]+' ('+data[i+2]+')'};
    }
    return mh;
}

bill.dataImport();
bill.build();
