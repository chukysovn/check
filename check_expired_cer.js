<script>
document.addEventListener("DOMContentLoaded", function() {
    // Tìm bảng thứ hai (bảng chứng thư số)
    var tables = document.querySelectorAll("table");
    if(tables.length < 2) return;
    var table = tables[1]; // Bảng thứ 2

    // Lấy các dòng (tr) trong tbody, bỏ qua dòng đầu là tiêu đề
    var rows = table.querySelectorAll("tbody tr");
    for(let i = 1; i < rows.length; i++) {
        var tds = rows[i].querySelectorAll("td");
        // Nếu thiếu ô "Trạng thái" thì thêm vào
        if(tds.length === 3) {
            var trangThaiTd = document.createElement("td");
            trangThaiTd.style = tds[0].getAttribute("style");
            tds[2].after(trangThaiTd);
            tds = rows[i].querySelectorAll("td");
        }
        // Lấy ngày hết hạn (ô thứ 3)
        var ngayHetHan = tds[2].textContent.trim();
        // Chuyển định dạng dd.mm.yyyy hoặc dd/mm/yyyy sang yyyy-mm-dd
        var parts = ngayHetHan.split(/[./]/);
        if(parts.length === 3) {
            var formatted = parts[2] + '-' + parts[1].padStart(2,'0') + '-' + parts[0].padStart(2,'0');
            var dateHetHan = new Date(formatted);
            var now = new Date();
            // Đặt thời gian so sánh đến hết ngày
            dateHetHan.setHours(23,59,59,999);
            if(now > dateHetHan) {
                tds[3].textContent = "Hết hạn";
                tds[3].style.color = "#ed3338";
                tds[3].style.fontWeight = "bold";
            }
        }
    }
});
</script>
