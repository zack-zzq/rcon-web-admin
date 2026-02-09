# RCON 控制面板

一个功能强大的 RCON 服务器管理 Web 界面。支持所有 RCON 服务器。

可在服务器、树莓派或任何 24/7 在线的设备上运行。即使您没有连接到界面，它也会自动执行所有任务。

## 功能特性

- 通过浏览器进行完整的服务器管理
- 支持无限数量的服务器
- 强大的组件系统
- 响应式现代设计
- 多语言界面
- 组件一键安装

## 支持的游戏

- Rust（测试最多）
- Counter-Strike: GO
- Minecraft
- 其他支持 RCON 的游戏服务器

---

## 使用 Docker 快速启动（推荐）

### 使用 Docker Compose

```bash
# 克隆仓库
git clone https://github.com/zack-zzq/rcon-web-admin.git
cd rcon-web-admin

# 使用 Docker Compose 启动
docker-compose up -d
```

访问 Web 界面：`http://localhost:4326`

### 直接使用 Docker

```bash
# 从 GitHub Container Registry 拉取镜像
docker pull ghcr.io/zack-zzq/rcon-web-admin:latest

# 运行容器
docker run -d \
  --name rcon-web-admin \
  -p 4326:4326 \
  -p 4327:4327 \
  -v rcon-db:/app/db \
  -v rcon-logs:/app/logs \
  --restart unless-stopped \
  ghcr.io/zack-zzq/rcon-web-admin:latest
```

### Docker Compose 配置示例

```yaml
version: '3.8'

services:
  rcon-web-admin:
    image: ghcr.io/zack-zzq/rcon-web-admin:latest
    container_name: rcon-web-admin
    restart: unless-stopped
    ports:
      - "4326:4326"  # Web 界面
      - "4327:4327"  # WebSocket
    volumes:
      - rcon-db:/app/db
      - rcon-logs:/app/logs
      # 可选：自定义配置
      # - ./config.js:/app/config.js:ro

volumes:
  rcon-db:
  rcon-logs:
```

### 本地构建

```bash
# 构建镜像
docker build -t rcon-web-admin .

# 运行
docker-compose up -d
```

---

## 手动安装

### 环境要求

- Node.js >= 16.x

### Windows

1. 下载并安装 [Node.js](https://nodejs.org)
2. 下载/克隆此仓库
3. 运行以下命令：

```bash
npm install
node src/main.js install-core-widgets
node src/main.js start
```

### Linux

```bash
sudo apt-get install nodejs npm
git clone https://github.com/zack-zzq/rcon-web-admin.git
cd rcon-web-admin
npm install
node src/main.js install-core-widgets
chmod 0755 -R startscripts
```

### Linux 启动/停止

```bash
sh startscripts/start-linux.sh start
sh startscripts/start-linux.sh stop
sh startscripts/start-linux.sh restart
```

### Windows 启动

```bash
startscripts/start-windows.bat
```

---

## 访问

在浏览器中打开：`http://您的服务器IP:4326`

如需修改端口或允许的主机，请参阅 `config.template.js`。

---

## 配置

将 `config.template.js` 复制为 `config.js` 并根据需要修改：

```javascript
var config = {
    "host": null,           // 绑定到特定主机（null = 所有）
    "websocketUrlSsl": null, // 代理设置的 WSS URL
    "websocketUrl": null,    // 代理设置的 WS URL  
    "port": 4326            // Web 界面端口（WebSocket = 端口 + 1）
};
```

---

## 组件

组件提供强大的仪表盘功能：

- **Console** - 直接 RCON 命令界面
- **Autobot** - 自动化编程接口
- **Rustboard** - Rust 游戏专用工具
- **Timed Commands** - 定时服务器命令

---

## 许可证

MIT 许可证 - 详见 [LICENSE](LICENSE) 文件

## 致谢

原作者：[BrainFooLong](https://github.com/brainfoolong)
