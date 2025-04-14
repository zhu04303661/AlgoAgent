# V0 界面克隆

这是一个基于Next.js和React实现的V0（Vercel）界面克隆项目，提供了类似V0的代码编辑器界面，包括可调整大小的面板、AI聊天助手和文件浏览功能。

## 功能特点

- 🎨 白色主题界面设计
- 💬 内置AI聊天助手窗口
- 📁 文件树浏览和代码查看
- ↔️ 可调整大小的面板（侧边栏、聊天窗口、文件树）
- 📱 响应式设计
- 🔍 代码语法高亮
- 📎 面板收缩功能，提供更多工作空间

## 技术栈

- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Lucide React 图标

## 如何运行项目

### 前提条件

确保你的系统已安装：

- Node.js 18.x 或更高版本
- npm 9.x 或更高版本（或者 yarn/pnpm）

### 安装步骤

1. 克隆仓库

\`\`\`bash
git clone https://github.com/yourusername/v0-interface-clone.git
cd v0-interface-clone
\`\`\`

2. 安装依赖

\`\`\`bash
npm install
# 或者使用 yarn
yarn install
# 或者使用 pnpm
pnpm install
\`\`\`

3. 启动开发服务器

\`\`\`bash
npm run dev
# 或者使用 yarn
yarn dev
# 或者使用 pnpm
pnpm dev
\`\`\`

4. 打开浏览器访问 [http://localhost:3000](http://localhost:3000)

### 构建生产版本

\`\`\`bash
npm run build
npm run start
\`\`\`

## 项目结构

\`\`\`
v0-interface-clone/
├── app/                  # Next.js App Router 目录
│   ├── page.tsx          # 主页面组件
│   ├── layout.tsx        # 应用布局
│   └── globals.css       # 全局样式
├── components/           # React 组件
│   ├── chat-window.tsx   # AI聊天窗口组件
│   ├── code-editor.tsx   # 代码编辑器组件
│   ├── file-tree.tsx     # 文件树组件
│   ├── file-tree-container.tsx # 文件树容器（带收缩功能）
│   ├── footer.tsx        # 页脚组件
│   ├── header.tsx        # 页头组件
│   ├── path-breadcrumb.tsx # 路径导航组件
│   └── sidebar.tsx       # 侧边栏组件
├── hooks/                # 自定义React钩子
│   └── use-resize.tsx    # 调整大小钩子
├── public/               # 静态资源
├── README.md             # 项目说明文档
└── package.json          # 项目依赖和脚本
\`\`\`

## 使用指南

### 界面导航

- **侧边栏菜单**：左侧提供导航选项，包括社区、库、项目和反馈
- **AI聊天窗口**：与AI助手交流，获取代码帮助
- **文件树**：浏览项目文件结构
- **代码编辑器**：查看和编辑代码文件

### 调整面板大小

1. 将鼠标悬停在任意两个面板之间的分隔线上
2. 鼠标指针会变为水平调整光标
3. 按住鼠标左键并左右拖动来调整面板宽度
4. 释放鼠标按钮以确认新的宽度

### 收缩/展开面板

- **侧边栏菜单**：点击左上角的左箭头图标收缩菜单，收缩后点击右箭头图标展开
- **AI助手窗口**：点击右上角的左箭头图标收缩窗口，收缩后点击右箭头图标展开
- **文件列表**：点击右上角的左箭头图标收缩列表，收缩后点击右箭头图标展开

## 贡献指南

欢迎提交问题和拉取请求！请确保遵循项目的代码风格和贡献指南。

## 许可证

MIT
