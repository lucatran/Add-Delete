function phoneIsValid(phone) {
    return /((09|03|07|08|05)+([0-9]{8})\b)/g.test(phone);
}
function emailIsValid(email) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
}
var danhSachCaNhan = [];
var danhSachCaNhanMoi = [];
let danhSach, fullName, email, phone, address;
var gender = "";
function Save() {
    validation();
    if (fullName && email && phone && address && gender) {
        danhSachCaNhan.push({
            fullName: fullName,
            email: email,
            phone: phone,
            address: address,
            gender: gender,
        });
        sweelalertSave();
    }
}
function validation() {
    fullName = document.getElementById("fullName").value;
    email = document.getElementById("email").value;
    phone = document.getElementById("phone").value;
    address = document.getElementById("address").value;

    if (document.getElementById("male").checked) {
        gender = document.getElementById("male").value;
    } else if (document.getElementById("female").checked) {
        gender = document.getElementById("female").value;
    }

    if (_.isEmpty(fullName)) {
        fullName = "";
        document.getElementById("fullName-error").innerHTML = "Vui lòng nhập họ tên!!";
        document.getElementById("fullName-error").style.color = "red";
        document.getElementById("fullName-error").style.marginLeft = "30px";
    }
    else {
        document.getElementById("fullName-error").innerHTML = "";
        document.getElementById("fullName-error").style.display = "none";

    }

    if (_.isEmpty(email)) {
        email = "";
        document.getElementById("email-error").innerHTML = "Vui lòng nhập email!!";
        document.getElementById("email-error").style.color = "red";
        document.getElementById("email-error").style.marginLeft = "30px";
    } else if (!emailIsValid(email)) {
        email = "";
        document.getElementById("email-error").innerHTML = "Email không đúng định dạng!!";
        document.getElementById("email-error").style.color = "red";
        document.getElementById("email-error").style.marginLeft = "30px";
    } else {
        document.getElementById("email-error").innerHTML = "";
        document.getElementById("email-error").style.display = "none";

    }

    if (_.isEmpty(phone)) {
        phone = "";
        document.getElementById("phone-error").innerHTML = "Vui lòng nhập số điện thoại!!";
        document.getElementById("phone-error").style.color = "red";
        document.getElementById("phone-error").style.marginLeft = "30px";
    } else if (!phoneIsValid(phone)) {
        phone = "";
        document.getElementById("phone-error").innerHTML = "Số điện thoại không đúng định dạng!!";
        document.getElementById("phone-error").style.color = "red";
        document.getElementById("phone-error").style.marginLeft = "30px";
    } else {
        document.getElementById("phone-error").innerHTML = "";
        document.getElementById("phone-error").style.display = "none";

    }

    if (_.isEmpty(address)) {
        address = "";
        document.getElementById("address-error").innerHTML = "Vui lòng nhập địa chỉ!!";
        document.getElementById("address-error").style.color = "red";
        document.getElementById("address-error").style.marginLeft = "30px";
    }
    else {
        document.getElementById("address-error").innerHTML = "";
        document.getElementById("address-error").style.display = "none";

    }

    if (_.isEmpty(gender)) {
        gender = "";
        document.getElementById("gender-error").innerHTML = "Vui lòng chọn giới tính!!";
        document.getElementById("gender-error").style.color = "red";
        document.getElementById("gender-error").style.marginLeft = "125px";
    }
    else {
        document.getElementById("gender-error").innerHTML = "";
        document.getElementById("gender-error").style.display = "none";

    }
}
function hienThiThongTin(danhSachCaNhan) {
    let content = "";
    danhSachCaNhan.forEach((danhSachCaNhan, index) => {
        indexDanhSach = index;
        var genderLabel = parseInt(danhSachCaNhan.gender) === 1 ? "Nam" : "Nữ";
        index++;
        content += `
    <tr>
        <td>${index}</td>
        <td>${danhSachCaNhan.fullName}</td>
        <td>${danhSachCaNhan.email}</td>
        <td>${danhSachCaNhan.phone}</td>
        <td>${danhSachCaNhan.address}</td>
        <td>${genderLabel}</td>
        <td>
            <button class="edit" onclick="loadThongTin(${indexDanhSach})">Sửa</button>
            <button class="delete" onclick="sweelalertDelete(${indexDanhSach})">Xóa</button>
        </td>
    </tr>
    `
    });
    document.getElementById("danhSach").innerHTML = content;
}

function luuDanhSach() {
    var jsonData = JSON.stringify(danhSachCaNhan);
    localStorage.setItem("DSCN", jsonData);
}

function layDanhSach() {
    var jsonData = localStorage.getItem("DSCN");
    if (jsonData !== null) {
        danhSachCaNhan = JSON.parse(jsonData);
        hienThiThongTin(danhSachCaNhan);
    }
}
layDanhSach();

function clearValue() {
    document.getElementById("fullName").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("address").value = "";
    document.getElementById("male").checked = "";
    document.getElementById("female").checked = "";
}

function changeSaveUpdate() {
    document.getElementById("Save").style.display = "inline-block";
    document.getElementById("Reset").style.display = "inline-block";
    document.getElementById("Update").style.display = "none";
    document.getElementById("Cancel").style.display = "none";
}

function changeUpdateSave() {
    document.getElementById("Save").style.display = "none";
    document.getElementById("Reset").style.display = "none";
    document.getElementById("Update").style.display = "inline-block";
    document.getElementById("Cancel").style.display = "inline-block";
}

function deleteDanhSach(id) {
    danhSachCaNhan.splice(id, 1);
    luuDanhSach();
    hienThiThongTin(danhSachCaNhan);
}

function loadThongTin(id) {
    danhSach = danhSachCaNhan[id];
    var genderLabel = danhSach.gender;
    document.getElementById("fullName").value = danhSach.fullName;
    document.getElementById("email").value = danhSach.email;
    document.getElementById("phone").value = danhSach.phone;
    document.getElementById("address").value = danhSach.address;
    if (genderLabel === "1") {
        document.getElementById("male").checked = genderLabel;
    } else {
        document.getElementById("female").checked = genderLabel;
    }
    changeUpdateSave();
}

function updateThongTin() {
    var fullName = document.getElementById("fullName").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var address = document.getElementById("address").value;
    var gender = "";
    if (document.getElementById("male").checked) {
        gender = document.getElementById("male").value;
    } else if (document.getElementById("female").checked) {
        gender = document.getElementById("female").value;
    }
    danhSachCaNhanMoi.push({
        fullName: fullName,
        email: email,
        phone: phone,
        address: address,
        gender: gender,
    });
    if (!(fullName.value || email.value || phone.value || address.value || gender.value)) {
        for (let i = 0; i < danhSachCaNhan.length; i++) {
            if (danhSachCaNhan[i] === danhSach) {
                danhSachCaNhan[i] = danhSachCaNhanMoi.reduce((acc, cur) => {
                    return { ...acc, ...cur };
                }, {});
            }
        };
        sweelalertSave();
        changeSaveUpdate();
    }
}

function cancelThongTin() {
    clearValue();
    changeSaveUpdate()
}

function seachThongTin() {
    let mangThongTin = [];
    var keyword = document.getElementById("form-control").value;
    for (let i = 0; i < danhSachCaNhan.length; i++) {
        let thongTin = danhSachCaNhan[i];
        keyword = keyword.toLowerCase().replace(/\s/g, '');
        if (thongTin.fullName.toLowerCase().replace(/\s/g, '').indexOf(keyword) !== -1) {
            mangThongTin.push(danhSachCaNhan[i]);
        }
    }
    if (mangThongTin.length !== 0) {
        hienThiThongTin(mangThongTin);
    } else {
        sweelalertSearch();
    };
}
var searchName = document.getElementById("form-control");
searchName.addEventListener("keyup", function (e) {
    if (e.keyCode === 13) {
        seachThongTin();
    };
})

function sweelalertSearch() {
    Swal.fire({
        title: "No information found or not available !!"
    })
}

function sweelalertSave() {
    Swal.fire({
        title: 'Are you sure?',
        text: "Do you want to save the information!",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, I want!!'
    }).then((result) => {
        if (result.value) {
            Swal.fire(
                'Success',
                'Your information has been saved',
                'success'
            )
            hienThiThongTin(danhSachCaNhan);
            clearValue();
            luuDanhSach();
        } else {
            layDanhSach();
        }
    })
}

function sweelalertDelete(id) {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
    }).then((result) => {
        if (result.value) {
            swalWithBootstrapButtons.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            )
            deleteDanhSach(id);
        } else if (
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire(
                'Cancelled',
                'Your imaginary file is safe :)',
                'error'
            )
        }
    })
}

