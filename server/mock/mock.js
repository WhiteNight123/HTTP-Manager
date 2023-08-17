
// 该文件由接口管理工具自动生成，请勿手动修改
const router = require("express").Router();
const Mock = require("mockjs");
router.patch("/api/interface/:interfaceId", function (req, res) {
    const requiredHeaders = ["authorization"];
    for (const header of requiredHeaders) {
        if (!req.headers[header]) {
            return res.status(400).json({
                status: 400,
                msg: "Missing required parameter"
            });
        }
    }
    const requiredPathParams = ["interfaceId","interfaceId2"];
    for (const param of requiredPathParams) {
        if (!req.params[param] && !req.query[param]) {
            return res.status(400).json({
                status: 400,
                msg: "Missing required path parameter"
            });
        }
    }
    response = {"contentType":"application/json","content":[{"code":"200","msg":"@csentence","data":{"_id":"@string(26)","name":"@cname","historys":[{"historyname":"@ctitle"}]}},{"code":"300","msg":"失败了"},{"code":"400","msg":"失败了"}]};  
    const responseContent = response.content;
    if (responseContent.length === 0) {
        return res.status(200).json({
            status: 200,
            msg: "No response content",
        });
    }
    if (response.contentType === 'application/file') {
        const path = require('path');
        const filePath = path.join(__dirname, '..', 'public', 'upload', 'HTTP-Manager.openapi.json');
        return res.sendFile(filePath);
    }
    // 从响应内容中随机选择一个响应
    let selectedResponse;
    if (responseContent.length === 1) {
        selectedResponse = responseContent[0];
    } else {
        const successResponses = responseContent.filter(resp => resp.code >= 200 && resp.code < 300);
        if (successResponses.length > 0) {
            // 90% 的概率返回成功的响应
            const successProbability = 0.9;
            const randomNum = Math.random();
            selectedResponse = randomNum < successProbability
            ? successResponses[Math.floor(Math.random() * successResponses.length)]
            : responseContent[Math.floor(Math.random() * responseContent.length)];
        } else {
            selectedResponse = responseContent[Math.floor(Math.random() * responseContent.length)];
        }
    }
    const statusCode = parseInt(selectedResponse.code);
    if (response.contentType === 'application/xml') {
        const js2xmlparser = require('js2xmlparser');
        selectedResponse = js2xmlparser.parse('response', selectedResponse);
    } else if (response.contentType === 'application/yaml') {
        const yaml = require('js-yaml');
        selectedResponse = yaml.dump(selectedResponse);
    }
    const mockResponse = Mock.mock(selectedResponse);
    res.status(statusCode).json(mockResponse);
});
module.exports = router;
