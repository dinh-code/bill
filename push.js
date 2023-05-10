const bill = {
    container: () => _container(),
    info: () => _info(),
    detail: () => _detail(),
    shop: () => _shop(),
    build: () => _build(),
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

function _info(id = 1){
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
function _detail(id = 1){
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
                <td id="tongSoLg" class="text-center">---</td>
                <td></td>
                <td id="tienHang" class="text-right" style="padding-right: 2mm;">---</td>
                <td id="soKien" class="text-center">---</td>
                <td id="ghiChu" class="text-center t-upper">---</td>
            </tr>
        </table>`;
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
    let container = bill.container();
    let info = bill.info();
    let detail = bill.detail();
    let shop = bill.shop();
    
    container.appendChild(info);
    container.appendChild(detail);
    container.appendChild(shop);
    document.body.appendChild(container);
}

bill.build();
bill.build();
bill.build();