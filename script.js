document.addEventListener("DOMContentLoaded", function() {
    // เมื่อ DOM โหลดเสร็จสมบูรณ์ ให้ทำงานตามฟังก์ชันที่กำหนด

    // เลือก DOM element ที่มี id เป็น 'board', 'status', 'reset-btn'
    const board = document.getElementById('board');
    const status = document.getElementById('status');
    const resetBtn = document.getElementById('reset-btn');

    // กำหนดตัวแปร currentPlayer เป็น 'X' และ gameState เป็นตารางว่าง
    let currentPlayer = 'X';
    let gameState = ['', '', '', '', '', '', '', '', ''];

    // ฟังก์ชัน renderBoard() สำหรับแสดงกระดานเกม
    function renderBoard() {
        board.innerHTML = ''; // เคลียร์ค่าทุกครั้งก่อนที่จะแสดงใหม่
        gameState.forEach((cell, index) => {
            const cellElement = document.createElement('div'); // สร้าง div element สำหรับแสดงเซลล์ในกระดาน
            cellElement.classList.add('cell'); // เพิ่มคลาส 'cell' ให้กับ div element
            cellElement.textContent = cell; // กำหนดเครื่องหมายในเซลล์ตามข้อมูลใน gameState
            cellElement.addEventListener('click', () => handleCellClick(index)); // เพิ่ม event listener สำหรับคลิกเซลล์
            board.appendChild(cellElement); // เพิ่ม div element เข้าไปใน board
        });
    }

    // ฟังก์ชัน handleCellClick(index) สำหรับจัดการเมื่อคลิกเซลล์ในกระดาน
    function handleCellClick(index) {
        if (gameState[index] === '' && !checkWinner()) { // ตรวจสอบว่าเซลล์ว่างและไม่มีผู้ชนะ
            gameState[index] = currentPlayer; // กำหนดเครื่องหมายของผู้เล่นปัจจุบันในตำแหน่งที่คลิก
            renderBoard(); // แสดงกระดานเกมใหม่
            if (!checkWinner() && !checkDraw()) { // ตรวจสอบว่ายังไม่มีผู้ชนะและไม่เสมอ
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // เปลี่ยนผู้เล่นปัจจุบัน
                status.textContent = `Current Player: ${currentPlayer}`; // แสดงผู้เล่นปัจจุบันในสถานะ
            }
        }
    }

    // ฟังก์ชัน checkWinner() สำหรับตรวจสอบผู้ชนะ
    function checkWinner() {
        const winConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // แถว
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // คอลัมน์
            [0, 4, 8], [2, 4, 6] // เส้นทแยง
        ];
        for (let condition of winConditions) {
            const [a, b, c] = condition;
            if (gameState[a] !== '' && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
                status.textContent = `Player ${currentPlayer} wins!`; // แสดงผลผู้ชนะ
                return true;
            }
        }
        return false;
    }

    // ฟังก์ชัน checkDraw() สำหรับตรวจสอบเกมเสมอ
    function checkDraw() {
        if (!gameState.includes('')) { // ถ้าไม่มีเซลล์ว่างอยู่ใน gameState
            status.textContent = "It's a draw!"; // แสดงเกมเสมอ
            return true;
        }
        return false;
    }

    // ฟังก์ชัน resetGame() สำหรับรีเซ็ตเกม
    function resetGame() {
        currentPlayer = 'X'; // กำหนดผู้เล่นปัจจุบันเป็น 'X'
        gameState = ['', '', '', '', '', '', '', '', '']; // กำหนด gameState เป็นตารางว่าง

        renderBoard(); // แสดงกระดานเกมใหม่
        status.textContent = `Current Player: ${currentPlayer}`; // แสดงผู้เล่นปัจจุบันในสถานะ
    }

    resetBtn.addEventListener('click', resetGame); // เพิ่ม event listener สำหรับปุ่มรีเซ็ตเกม

    // สร้างเกมเมื่อหน้าเว็บโหลดเสร็จ
    renderBoard(); // แสดงกระดานเกม
    status.textContent = `Current Player: ${currentPlayer}`; // แสดงผู้เล่นปัจจุบันในสถานะ
});
