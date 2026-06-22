# MiMo TTS UI

&#x1f399; 基于小米 MiMo Speech Synthesis V2.5 API 的交互式语音合成网页工具。

**在线使用：** https://3191312549.github.io/mimo-tts-ui/

## 功能

- **三种合成模式**：预设音色 / 音色设计 / 音色复刻
- **8种预设音色**：中文（冰糖、茉莉、苏打、白桦）/ 英文（Chloe、Mia、Milo、Dean）
- **流式输出**：实时流式合成，边生成边播放
- **浏览器内播放**：使用 Web Audio API 直接解码 PCM 音频
- **纯静态页面**：无需后端，打开即用

## 使用方法

1. 打开页面，输入你的 MiMo API Key
2. 选择合成模式（预设 / 设计 / 复刻）
3. 输入文本，点击发送
4. 点击播放按钮收听语音

### 三种模式

| 模式 | 说明 |
|------|------|
| 预设音色 | 从8种预设音色中选择，可添加风格控制文本 |
| 音色设计 | 用自然语言描述你想要的音色 |
| 音色复刻 | 上传一段参考音频，克隆其音色 |

## CORS 代理

页面默认直连 MiMo API。如遇跨域限制，可部署 mimo_worker.js 到 Cloudflare Workers 作为代理：

`ash
npx wrangler deploy mimo_worker.js
`

将获得的 Worker URL 填入页面顶部的 Server URL 即可。

## 本地使用

双击 index.html 即可在浏览器中打开使用。

也可配合 Python 本地服务器：

`ash
pip install numpy openai soundfile sounddevice
python mimo_chat.py --serve
`

## 文件说明

- index.html - 主页面，可直接部署到 GitHub Pages
- mimo_worker.js - Cloudflare Worker CORS 代理（可选）
- mimo_chat.py - Python CLI / 本地代理服务器（可选）
