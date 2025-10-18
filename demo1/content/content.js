// 监听来自popup.js的消息
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.type === "changeBackgroundColor") {
            // 改变页面背景色
            document.body.style.backgroundColor = request.color;
            // 发送成功响应
            sendResponse({status: "success"});
        }
    }
);

// 可选：添加一个初始化函数来确保脚本正常加载
console.log("Content script loaded successfully");