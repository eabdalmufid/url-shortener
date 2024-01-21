const base_url = location.protocol + "//" + location.hostname + (location.port && ":" + location.port)
const form = document.forms['input_url']
const btn_loading = document.querySelector('.btn-loading')
const btn_kirim = document.querySelector('.btn-kirim')
const hasil = document.querySelector('#hasil')

function copyText() {
    document.getElementById('hasilnye').select()
    document.execCommand('copy')
}

function copyText2() {
    document.getElementById('hasilnye_delete').select()
    document.execCommand('copy')
}

function alert_gagal(result) {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
    <strong>Error!</strong> ${result.message}.
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>`

    hasil.append(wrapper)
}

function alert_success(result) {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = `<div class="alert alert-success" role="alert">
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    <h4 class="alert-heading">Success</h4>
    <div class="input-group mb-3">
    <input type="text" class="form-control" id="hasilnye" value="${base_url + '/'+ result.result.id}" readonly>
    <span type="button" onclick="copyText()" class="input-group-text" id="basic-addon2"><i
    class="bi bi-clipboard"></i></span>
    </div>
    <hr>
    <h5 class="alert-heading">ID Delete</h5>
    <div class="input-group mb-3">
    <input type="text" class="form-control" id="hasilnye_delete" value="${base_url + '/delete/'+ result.result.delete}" readonly>
    <span type="button" onclick="copyText2()" class="input-group-text" id="basic-addon2"><i
    class="bi bi-clipboard"></i></span>
    </div>
  </div>`

    hasil.append(wrapper)
}
$('#form-input').submit(function (e) {
    e.preventDefault()
    btn_loading.classList.toggle('d-none');
    btn_kirim.classList.toggle('d-none');
    $.ajax({
        type: "POST",
        url: base_url + '/create',
        timeout: 30000,
        data: {
            url: $('#url').val(),
            costum: $('#costum').val()
        },
        dataType: "json",
        success: function (response) {
            btn_loading.classList.toggle('d-none');
            btn_kirim.classList.toggle('d-none');
            alert_success(response)
            form.reset();
            console.log('Success!', response);
        },
        error: function (err) {
            console.log(err.responseJSON)
            btn_loading.classList.toggle('d-none');
            btn_kirim.classList.toggle('d-none');
            alert_gagal(err.responseJSON)
        }
    })
})