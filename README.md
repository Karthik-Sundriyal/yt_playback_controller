# **🎬 YouTube Playback Controller**
A lightweight and intuitive YouTube Playback Controller Chrome Extension that gives you full control over video speed and volume — with automatic ad skipping built-in.

🎯 Set custom video playback speeds

🎧 Adjust audio volume numerically

⏩ Auto-skip ads by fast-forwarding through them

## **🚀 Features** 

>✅ Custom Playback Speed Choose from preset speeds or enter a custom one manually.

>✅ Precise Volume Control Enter an exact audio value (0–100) for fine-tuned listening.

>✅ Ad Auto-Skipper Automatically detects when an ad starts and increases the speed to skip it faster.

>✅ Simple, Clean UI User-friendly popup with dark/light theme toggle.

## **🧩 Installation**
>Clone or download this repository:

git clone [https://github.com/your-username/yt_playback_controller.git](https://github.com/your-username/yt_playback_controller.git)

>Open Chrome and navigate to chrome://extensions/.

>Enable Developer mode (toggle in top-right).

>Click "Load unpacked", and select the yt_playback_controller directory.

>Go to YouTube and enjoy enhanced playback control!

## **🗂️ File Structure**

yt_playback_controller
/
├── manifest.json     
├── content.js   
├── popup.html  
├── popup.js     
└── popup.css     

## **⚙️ How It Works**
>content.js observes the video element on YouTube.

>When an ad is detected, it temporarily increases the playback speed.

>Speed and volume settings are applied through the <video> element.

>The popup interface allows users to manually input and control settings.

## **🛠️ Technologies Used**
>HTML5

>CSS3

>JavaScript (Vanilla)

>Chrome Extensions API

>YouTube DOM manipulation

## **📌 Known Limitations**
>Ad detection is DOM-based and may break if YouTube changes their internal structure.

>Some ads (like unskippable overlays) may not be detected or sped up properly.

>Volume control is limited to HTML5 video — it may not affect certain audio-only ads.

## **📜 License**
This project is licensed under the MIT License.

## **🤝 Contributing**
Pull requests and suggestions are welcome! Feel free to fork the repo and submit a PR with improvements or bug fixes.

## **👤 Author**
Karthik Sundriyal

GitHub: @karthik-sundriyal
