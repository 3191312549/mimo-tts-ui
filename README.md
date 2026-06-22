# MiMo TTS UI

基于小米 MiMo Speech Synthesis V2.5 API 的交互式语音合成网页工具。

**立即使用：** https://3191312549.github.io/mimo-tts-ui/



## 快速开始

### 1. 输入 API Key

页面右上角带密码框的输入框，填入你的 MiMo API Key。

- 输入后旁边的状态灯会变**绿色**（API Key 有效）或**红色**（无效）
- API Key 会自动保存在浏览器中，下次打开无需重新输入

### 2. 选择合成模式

左侧面板顶部有三个标签页，点击切换：

| 模式 | 适用场景 | 需配置的参数 |
|------|---------|-------------|
| **预置音色** | 使用系统提供的成熟音色 | 选择音色 + 可选风格文本 |
| **音色设计** | 用文字描述创造全新音色 | 填写音色描述 |
| **音色复刻** | 模仿某段录音的音色 | 上传参考音频 |

### 3. 输入文本并发送

底部输入框输入要合成的文本，按 **Enter** 或点击 **▶** 按钮发送。

- 生成完成后显示耗时和音频时长
- 点击消息下方的 **▶ 播放** 按钮收听语音
- 再次点击可停止播放

---

## 模式详解

### 预置音色模式

提供 8 种预训练音色：

| 音色 | 语言 | 性别 |
|------|------|------|
| Chloe | 英文 | 女性 |
| Mia | 英文 | 女性 |
| Milo | 英文 | 男性 |
| Dean | 英文 | 男性 |
| 冰糖 | 中文 | 女性 |
| 茉莉 | 中文 | 女性 |
| 苏打 | 中文 | 男性 |
| 白桦 | 中文 | 男性 |
| MiMo-默认 | 中文 | 默认 |

**风格控制**（可选）：输入情绪/语调描述，如 Happy and energetic tone、Calm and soothing 等。

### 音色设计模式

用自然语言描述你想要的音色，AI 会根据描述生成。例如：
- Young female, warm and gentle tone, natural pace.
- Deep male voice, authoritative, slow and clear.
- Cheerful teenage girl, fast speaking, energetic.

### 音色复刻模式

1. **上传参考音频**：点击上传区域或拖拽文件到该区域
2. 支持的格式：WAV / MP3 / M4A / FLAC / OGG
3. 输入要合成的文本内容（用参考音频的音色来朗读新内容）

---

## 流式输出

左侧面板底部的开关控制：

- **开启**：音频边生成边返回，首音延迟更低
- **关闭**：一次性返回完整音频

---

## Server URL（可选）

顶部 API Key 左边的输入框。**一般情况下留空即可**，页面会直连 MiMo API。

只有在浏览器提示 CORS 跨域错误时才需要配置：

1. 部署 mimo_worker.js 到 Cloudflare Workers：
   `ash
   npx wrangler deploy mimo_worker.js
   `
2. 将获得的 Worker URL（如 https://mimo-xxx.workers.dev）填入此框

---

## 本地使用

### 方式一：直接打开（推荐）

双击 index.html，浏览器中直接使用（页面直连 MiMo API）。

### 方式二：Python 本地服务器

`ash
pip install numpy openai soundfile sounddevice
python mimo_chat.py --serve
`

浏览器会自动打开 http://localhost:8765。

---

## 文件说明

| 文件 | 用途 |
|------|------|
| index.html | 主页面，可部署到 GitHub Pages |
| mimo_worker.js | Cloudflare Worker CORS 代理 |
| mimo_chat.py | Python CLI / 本地代理服务器 |

---

## 技术栈

- 纯 HTML/CSS/JS，无框架依赖
- Web Audio API 实现浏览器内 PCM 解码播放
- OpenAI 兼容 API 协议
