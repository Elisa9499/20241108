let fonts; // 載入字型變數
let points = []; // 儲存點陣列
let angle = 0;
let r = 0;
let g = 0;
let b = 0;
let centerX = 0;
let centerY = 0;

function preload() { // 在執行 setup() 前先載入字型
    fonts = loadFont("fonts/NotoSansTC-VariableFont_wght.ttf"); // 確保字型路徑正確
}

function setup() { // 設定視窗內容，只會執行一次
    createCanvas(windowWidth, windowHeight); // 產生一個畫布
    angleMode(DEGREES); // 設定三角函數的角度
    background("#caf0e8"); // 設定背景為藍色(天空色)

    // points
    points = fonts.textToPoints("ELISA", -300, 80, 150, {
        sampleFactor: 0.2
    });

    // 計算文字點陣的中心位置
    let totalX = 0;
    let totalY = 0;
    for (let i = 0; i < points.length; i++) {
        totalX += points[i].x;
        totalY += points[i].y;
    }
    centerX = totalX / points.length;
    centerY = totalY / points.length;
}

function draw() { // 畫圖，重複每秒60次
    background("#0077b6"); // 設定背景色為藍色(天空色)
    rectMode(CENTER); // 設定畫正方形時在左上角
    noFill(); // 以下所有的值如果不設定就會自動疊色
    stroke("#03045e"); // 線條顏色
    strokeWeight(3); // 線條的粗細

    // 繪製背景矩陣
    var rect_width = 50 + mouseX / 10;
    var bc_width = 50 + mouseX / 10;
    var sc_width = 25 + mouseX / 100;
    for (let i = 0; i < 30; i++) {
        for (let j = 0; j < 29; j++) {
            if (j < 10) {
                stroke("#03045e");
            } else if (j < 15) {
                stroke("#2a6f97");
            } else if (j < 20) {
                stroke("#dee2e6");
            } else {
                stroke("#03045e");
            }
            ellipse(25 + 50 * i, 25 + 50 * j, bc_width);
            rect(25 + 50 * i, 25 + 50 * j, rect_width);
            ellipse(50 + 50 * i, 50 + 50 * j, sc_width);
        }
    }

    // 更新顏色變量
    r = (r + 1) % 256;
    g = (g + 2) % 256;
    b = (b + 3) % 256;

    // 使用變色顏色繪製字型點陣
    push();
    translate(width / 2, height / 2); // 將畫布的中心移至視窗中心
    rotate(angle); // 以計算出的中心位置進行旋轉
    angle += 1; // 更新旋轉角度

    for (let i = 0; i < points.length - 1; i++) {
        stroke(r, g, b); // 使用變色顏色
        strokeWeight(2);
        // 平移至中心點後繪製點陣文字
        line(points[i].x - centerX, points[i].y - centerY, points[i + 1].x - centerX, points[i + 1].y - centerY);
    }
    pop();
}
