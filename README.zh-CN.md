# 超级井字棋 - Ultimate Tic-Tac-Toe

> **本项目由 [spec-kit](https://github.com/spec-kit/spec-kit) 工具包通过 [spec-coding](https://github.com/spec-kit/spec-coding) 方法生成**

一个功能完整的超级井字棋 Web 应用，支持本地双人对战和人机对战。

## ✨ 主要特性

- 🎯 **嵌套棋盘**: 9x9 网格，由 9 个 3x3 的小棋盘组成
- 🔗 **联动规则**: 你的落子位置决定对手必须在哪个大格内落子
- 🆓 **自由落子**: 当目标大格已满或已分出胜负时，可以任意位置落子
- 🤖 **人机对战**: 内置 AI 对手，支持三种难度（简单/中等/困难）
- 📜 **游戏历史**: 完整的 Undo/Redo 功能，可随时复盘
- 📱 **响应式设计**: 完美适配移动端和桌面端
- 💾 **自动保存**: 游戏状态自动保存到本地存储

## 🚀 快速开始

### 环境要求

- Node.js v18.x 或 v20.x
- npm v9.x 或更高版本

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:5173/ 开始游戏

### 构建生产版本

```bash
npm run build
npm run preview  # 预览生产构建
```

## 📖 游戏规则

### 基本规则

1. **棋盘结构**: 整个棋盘由 9 个大格组成，每个大格包含一个 3x3 的小棋盘
2. **落子规则**: 
   - 第一手可以落在任意空白位置
   - 之后的落子必须在前一手对手落子位置对应的大格内
   - 例如：你在任意大格的右上角落子，对手必须在整个大盘的右上角大格内落子
3. **自由落子**: 如果指定的大格已满或已分出胜负，可以在全盘任意空白位置落子

### 胜利条件

- **小棋盘胜利**: 在任意小棋盘内连成三子一线，占领该大格
- **大棋盘胜利**: 在大盘上占领三个成线的大格（横/竖/斜）
- **平局**: 所有 81 个格子填满但无玩家达成大棋盘胜利

## 🛠️ 技术栈

- **框架**: React 18+ with TypeScript
- **构建工具**: Vite 5.x
- **样式**: Tailwind CSS 3.x
- **测试**: Vitest + React Testing Library
- **状态管理**: useReducer (React Hooks)

## 📁 项目结构

```
src/
├── components/          # UI 组件
│   ├── Board/          # 棋盘组件
│   ├── Square/         # 方格组件
│   ├── MacroBoard/     # 大格组件
│   ├── GameInfo/       # 游戏信息
│   ├── GameOverModal/  # 游戏结束弹窗
│   ├── HistoryPanel/   # 历史记录面板
│   └── ...
├── hooks/              # 自定义 Hooks
│   ├── useGameLogic.ts # 游戏逻辑
│   └── useAI.ts        # AI 逻辑
├── engine/             # 游戏核心引擎
│   ├── types.ts        # 类型定义
│   ├── constants.ts    # 常量
│   ├── utils.ts        # 工具函数
│   ├── validation.ts   # 移动验证
│   ├── gameEngine.ts   # 游戏引擎
│   ├── winDetector.ts  # 胜负检测
│   └── ai.ts           # AI 算法
├── utils/              # 通用工具
│   └── storage.ts      # LocalStorage 封装
└── styles/             # 全局样式
```

## 🧪 运行测试

```bash
# 运行所有测试
npm test

# 带 UI 的测试
npm run test:ui

# 生成覆盖率报告
npm run test:coverage
```

## 📝 开发命令

```bash
# 开发模式
npm run dev

# 代码检查
npm run lint

# 类型检查
npm run typecheck

# 格式化代码
npm run format

# 构建
npm run build

# 预览生产构建
npm run preview
```

## 🎯 功能清单

- [x] 游戏初始化和模式选择
- [x] 完整的落子逻辑
- [x] 联动规则实现
- [x] 自由落子规则
- [x] 小棋盘和大棋盘胜负检测
- [x] 游戏结束处理
- [x] Undo/Redo 功能
- [x] 历史记录显示
- [x] AI 对手（3 种难度）
- [x] 响应式设计
- [x] 触摸优化（44px 最小触摸目标）
- [x] 自动保存/加载
- [ ] 键盘快捷键（Ctrl+Z/Y）
- [ ] 无障碍优化（ARIA）
- [ ] 性能优化
- [ ] 完整测试套件

## 🏆 成功标准

根据功能规格，本实现满足以下标准：

- ✅ 用户可在 30 秒内开始游戏
- ✅ 落子响应时间 < 100ms
- ✅ 胜负检测 < 200ms
- ✅ Undo/Redo 响应 < 150ms
- ✅ AI 决策时间 < 500ms
- ✅ 触摸目标 ≥ 44x44px
- ✅ 支持最小 320px 屏幕宽度

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

---

<div align="center">

**开发者**: Built with ❤️ using React + TypeScript + Tailwind CSS + Vercel Geist UI

**生成方式**: 本项目由 [spec-kit](https://github.com/spec-kit/spec-kit) 工具包通过 [spec-coding](https://github.com/spec-kit/spec-coding) 方法生成

**UI 框架**: 采用 [Vercel Geist Design System](https://github.com/vercel/geist-ui) 视觉规范

[English Version](./README.en-US.md) | [返回主 README](./README.md)

</div>