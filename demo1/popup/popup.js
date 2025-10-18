// 当DOM内容加载完成后执行以下函数
document.addEventListener('DOMContentLoaded', function() {
    // 获取ID为'colorPicker'的HTML元素（应该是一个颜色选择器input）
    const colorPicker = document.getElementById('colorPicker');
    
    // 为颜色选择器添加change事件监听器（当用户选择新颜色时触发）
    colorPicker.addEventListener('change', function() {
        // 获取用户选择的颜色值
        const selectedColor = colorPicker.value;
        
        // 查询当前活动标签页
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            // 向当前标签页发送消息
            chrome.tabs.sendMessage(
                // 第一个参数：标签页ID
                tabs[0].id,
                // 第二个参数：要发送的消息对象
                {
                    type: "changeBackgroundColor",  // 消息类型
                    color: selectedColor            // 选择的颜色值
                },
                // 第三个参数：回调函数，处理content script的响应（如果有的话）
                function(response) {
                    // 如果收到成功响应
                    if (response && response.status === "success") {
                        // 在控制台打印成功消息
                        console.log('颜色修改成功！');
                        // 在popup页面上显示成功消息
                        document.getElementById('status').textContent = '颜色修改成功！';
                    }
                }
            );
        });
    });
});