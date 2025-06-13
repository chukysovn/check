<script>
// Hàm chuyển ngày dạng dd.mm.yyyy hoặc dd/mm/yyyy hoặc dd-mm-yyyy thành đối tượng Date
function parseVNDate(str) {
    var parts = str.trim().split(/[./-]/);
    if(parts.length === 3) {
        var d = parts[0].padStart(2, '0');
        var m = parts[1].padStart(2, '0');
        var y = parts[2];
        // Thêm giờ để tránh lỗi múi giờ khi tạo đối tượng Date
        return new Date(`${y}-${m}-${d}T23:59:59`);
    }
    return null;
}

document.addEventListener("DOMContentLoaded", function() {
    // Cấu hình cho từng bảng
    var configs = [
        { tableIdx: 0, dateCol: 3, statusCol: 4 }, // Bảng 1: THỜI HẠN cột 4, TRẠNG THÁI cột 5
        { tableIdx: 1, dateCol: 2, statusCol: 4 }  // Bảng 2: NGÀY HẾT HẠN cột 3, TRẠNG THÁI cột 5
    ];

    var tables = document.querySelectorAll("table");
    var now = new Date();
    now.setHours(0,0,0,0);

    configs.forEach(function(cfg) {
        var tbl = tables[cfg.tableIdx];
        if(!tbl) return;
        var rows = tbl.querySelectorAll("tbody tr");
        for(let i = 1; i < rows.length; i++) {
            var tds = rows[i].querySelectorAll("td");
            // Nếu chưa có ô "TRẠNG THÁI" thì thêm vào cuối
            if(tds.length <= cfg.statusCol) {
                var trangThaiTd = document.createElement("td");
                if (tds[0]) trangThaiTd.style = tds[0].getAttribute("style");
                rows[i].appendChild(trangThaiTd);
                tds = rows[i].querySelectorAll("td");
            }
            // Lấy ngày ở cột quy định
            var ngayStr = tds[cfg.dateCol].textContent.trim();
            var dateHetHan = parseVNDate(ngayStr);
            if(dateHetHan) {
                var diffTime = dateHetHan - now;
                var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                var trangThai = tds[cfg.statusCol];
                // Reset style trước
                trangThai.style.fontWeight = "bold";
                if(now > dateHetHan) {
                    trangThai.textContent = "Hết hạn";
                    trangThai.style.color = "#ed3338";
                } else if(diffDays <= 90) {
                    trangThai.textContent = "Còn " + diffDays + " ngày hết hạn";
                    trangThai.style.color = "#e89113"; // Cam
                } else {
                    trangThai.textContent = "Còn " + diffDays + " ngày hết hạn";
                    trangThai.style.color = "#08911b"; // Xanh lá
                }
            }
        }
    });
});
</script>
