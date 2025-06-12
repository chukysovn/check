// check_expired.js

// Hàm chuyển đổi định dạng ngày dd/mm/yyyy hoặc dd.mm.yyyy sang đối tượng Date
function parseDate(str) {
    if (!str) return null;
    str = str.trim().replace(/-/g, '/').replace(/\./g, '/');
    let parts = str.split('/');
    if (parts.length === 3) {
        let day = parseInt(parts[0], 10);
        let month = parseInt(parts[1], 10) - 1; // tháng bắt đầu từ 0
        let year = parseInt(parts[2], 10);
        return new Date(year, month, day);
    }
    return null;
}

function checkExpired() {
    var today = new Date();

    // Lặp qua tất cả các bảng trong trang
    document.querySelectorAll('table').forEach(function(table) {
        let headers = Array.from(table.querySelectorAll('th')).map(th => th.textContent.trim().toLowerCase());
        
        // Kiểm tra bảng 1
        let idxThoiHan = headers.indexOf('thời hạn');
        let idxTrangThai = headers.indexOf('trạng thái');
        if (idxThoiHan !== -1 && idxTrangThai !== -1) {
            table.querySelectorAll('tbody tr').forEach(function(row) {
                let cells = row.querySelectorAll('td');
                if (cells.length === headers.length) {
                    let thoiHanText = cells[idxThoiHan].textContent.trim();
                    let date = parseDate(thoiHanText);
                    if (!date) return;
                    if (date < today) {
                        let trangThaiCell = cells[idxTrangThai];
                        if (!trangThaiCell.textContent.trim()) {
                            trangThaiCell.textContent = "Hết hạn";
                            trangThaiCell.style.color = "#ed3338";
                            trangThaiCell.style.fontWeight = "bold";
                        }
                    }
                }
            });
        }

        // Kiểm tra bảng 2
        let idxNgayHetHan = headers.indexOf('ngày hết hạn');
        let idxTrangThai2 = headers.indexOf('trạng thái');
        if (idxNgayHetHan !== -1 && idxTrangThai2 !== -1) {
            table.querySelectorAll('tbody tr').forEach(function(row) {
                let cells = row.querySelectorAll('td');
                if (cells.length === headers.length) {
                    let ngayHetHanText = cells[idxNgayHetHan].textContent.trim();
                    let date = parseDate(ngayHetHanText);
                    if (!date) return;
                    if (date < today) {
                        let trangThaiCell = cells[idxTrangThai2];
                        if (!trangThaiCell.textContent.trim()) {
                            trangThaiCell.textContent = "Hết hạn";
                            trangThaiCell.style.color = "#ed3338";
                            trangThaiCell.style.fontWeight = "bold";
                        }
                    }
                }
            });
        }
    });
}

// Chạy script sau khi trang đã tải xong
window.addEventListener('DOMContentLoaded', checkExpired);
