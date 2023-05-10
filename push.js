const bill = {
    qrSize: 150,
    mHPre: '$',

    matHang: {},
    donHang: [],
    thongTin: [],
    dataImport: () => _dataImport(),

    container: () => _container(),
    info: () => _info(),
    detail: (id, data) => _detail(id, data),
    shop: () => _shop(),

    build: () => _build(),

    priceFormat: (n) => _priceFormat(n),
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
function _info(id = 0, data=[]){
    //let soLg = data[1];
    //let tienHang = bill.priceFormat(data[2]*1000);
    //let ghiChu = data[3];
    //let ds = data[0];

    let info = document.createElement('div');
    info.classList.add("info");
    info.innerHTML =
        `<div class="info-top">
            <div class="info-top-left">
                <div class="card h">
                    <div class="card-header"><i class="material-icons">person</i> Khách hàng (anh / chị):&nbsp;
                        <div id="hoTen" class="card-body">---</div>
                    </div>
                </div>
                <div class="card h">
                    <div class="card-header"><i class="material-icons">phone</i>Điện thoại:&nbsp;
                        <div id="sdt" class="card-body">---</div>
                    </div>
                </div>
                <div class="card">
                    <div class="card-header">
                        <i class="material-icons">pin_drop</i>
                        <!--div class="card-body dc" style="width: 16mm;">Địa chỉ:&nbsp;</div-->
                        <div id="diaChi" class="card-body dc">---</div>
                    </div>
                </div>
            </div>
            <div class="info-top-right">
                <div class="info-top-right-col1">
                    <div class="card">
                        <div class="card-header">Số hóa đơn</div>
                        <div id="key" class="card-body-sm">---</div>
                    </div>
                    <div class="card">
                        <div class="card-header">Ngày đặt</div>
                        <div id="ngayDat" class="card-body-sm">---</div>
                    </div>        
                </div>
                <div class="info-top-right-col2">
                    <div class="card text-right">
                        <div class="card-header text-j-end">Vận chuyển</div>
                        <div id="tenDVVC" class="card-body-sm">---</div>
                    </div>
                    <div class="card text-right">
                        <div class="card-header text-j-end">Mã vận đơn</div>
                        <div id="maDon" class="card-body-sm">---</div>
                    </div>        
                </div>
                <div class="info-top-right-qrcode w17" id="keyQr">
                </div>
            </div>
        </div>
    `;
    return info;
}
function _detail(id = 0, data=[]){
    let soLg = data[1];
    let tienHang = bill.priceFormat(data[2]*1000);
    let ghiChu = data[3];
    let ds = data[0];

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
        detail.firstChild.insertRow(1).innerHTML =
        `<tr>
            <td class="text-center">${ds[i+0]}</td>
            <td>
                <div class="card f-center flex h-fit">
                    <div class="card-body">${bill.matHang[bill.mHPre+ds[i+0]].ten}</div>
                    <div class="card-header">${bill.matHang[bill.mHPre+ds[i+0]].bill}</div>
                </div>
            </td>
            <td class="text-center">${ds[i+1]}</td>
            <td class="text-right">${bill.priceFormat(ds[i+2]*1000)}</td>
            <td class="text-right">${bill.priceFormat(ds[i+3]*1000)}</td>
            <td class="text-center">${ds[i+4]}</td>
            <td>${ds[i+5]}</td>
        </tr>`;
    }
    



    return detail;
}
function _shop(id = 1){
    let shop = document.createElement('div');
    shop.classList.add("shop");
    shop.innerHTML =
        `<div class="col">
            <div class="info-top-right-qrcode">
                <img id="vcb" src="">
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
            <div class="info-top-right-qrcode" id="momo">
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
            <div class="info-top-right-qrcode" id="gmap"></div>
        </div>`;
    return shop;
}
function _build(){
    bill.donHang.forEach(d => {
        let container = bill.container();
        let info = bill.info();
        let detail = bill.detail(0, d);
        let shop = bill.shop();
        
        container.appendChild(info);
        container.appendChild(detail);
        container.appendChild(shop);
        document.body.appendChild(container);
    });
}
function _dataImport(){
    let s = new URL(location.href).searchParams.get("bill");
    let j = JSON.parse(decodeURIComponent(s));

    let mhArr = j.mh;
    let mh = {};

    for (let i = 0; i < mhArr.length; i+=4){
        mh[bill.mHPre+mhArr[i]] = {"ten":mhArr[i+1], "donVi": mhArr[i+2], "moTa": mhArr[i+3], "bill": mhArr[i+3]+' ('+mhArr[i+2]+')'};
    }

    bill.matHang = mh;
    bill.donHang = j.dh;
    bill.thongTin = j.tt;
}
function _priceFormat(n = 0){
    //return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(n);
    return n.toLocaleString('vi-VN') + ' đ';
}

bill.dataImport();
bill.build();
