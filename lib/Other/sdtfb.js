exports.name = '/sdtfb';
exports.index = async(req, res, next) => {
    const axios = require("axios")
    var profileUrl = req.query.link;

    function isUrlValid(link) {
        var res = link.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
        if (res == null)
            return !1;
        else return !0
    };
    if (!profileUrl) return res.jsonp({ error: "Thiếu dữ liệu" })
    if (!isUrlValid(profileUrl)) return res.jsonp({ error: "Vui lòng nhập link facebook hợp lệ !" })
    const response = await axios.get("https://marketingtool.top/wp-admin/admin-ajax.php?action=ajax_convert_to_phone&link=" + encodeURIComponent(profileUrl) + "&security=d27499e528", {
        headers: {
            Cookie: "_ga=GA1.2.20363403.1639553883; _gid=GA1.2.409916163.1639553883; __gads=ID=3f4ff1f0002d44ca-22bd267a72cf001c:T=1639553895:RT=1639553895:S=ALNI_MYkWlLT_iLkDSXLS0390AHrsd0smw; wordpress_logged_in_badabb602034b799afaf6c1cfcd126bb=g_thuthaopham%7C1640763159%7CWGdomUceIYx4Q0DqZbhkcYfMNeR9bryVi0ghgyyp13U%7Ca13f1699d5232fcea2ce19c4d45d4e892c96024505a560880a4f9bcd8b78fde0; _gat_gtag_UA_137721328_1=1; useragent=TW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV09XNjQpIEFwcGxlV2ViS2l0LzUzNy4zNiAoS0hUTUwsIGxpa2UgR2Vja28pIENocm9tZS85NS4wLjQ2MzguODQgU2FmYXJpLzUzNy4zNg%3D%3D; _uafec=Mozilla%2F5.0%20(Windows%20NT%2010.0%3B%20WOW64)%20AppleWebKit%2F537.36%20(KHTML%2C%20like%20Gecko)%20Chrome%2F95.0.4638.84%20Safari%2F537.36;"
        }
    });
    const result = response.data.replace(/<[^>]*>/g, "");
    if (result == 'Chưa có dữ liệu này, vui lòng nhập thông tin khác!') return res.jsonp({ error: "không tìm thấy sdt của liên kết này!" })
    const sdt = result.substr(8, result.indexOf(' F') - 8)
    const link = result.substr(result.indexOf('F') + 10)
    res.json({
        data: {
            sdt,
            link
        },
        author: 'D-Jukie'
    })
}