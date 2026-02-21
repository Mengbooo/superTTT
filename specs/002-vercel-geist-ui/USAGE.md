# Geist Design System 使用指南

**功能**: Vercel Geist Design System 集成  
**日期**: 2026-02-21  
**版本**: 1.0.0

---

## 快速开始

### 1. 主题切换

应用已内置明暗主题切换功能，在右上角点击 🌙/☀️ 按钮即可切换。

```tsx
import { useGeistContext } from './components/GeistProvider';

function MyComponent() {
  const { theme, toggleTheme } = useGeistContext();
  
  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}
```

### 2. 使用 GeistButton

```tsx
import { GeistButton } from './components/ui';

// 主要按钮
<GeistButton variant="primary" onClick={handleClick}>
  Submit
</GeistButton>

// 次要按钮
<GeistButton variant="secondary">
  Cancel
</GeistButton>

// 危险按钮
<GeistButton variant="danger">
  Delete
</GeistButton>

// 带加载状态
<GeistButton loading onClick={handleSave}>
  Saving...
</GeistButton>
```

### 3. 使用 GeistInput

```tsx
import { GeistInput } from './components/ui';

// 基础输入框
<GeistInput
  value={email}
  onChange={setEmail}
  placeholder="Enter your email"
/>

// 带标签和辅助文本
<GeistInput
  value={username}
  onChange={setUsername}
  label="Username"
  helperText="Choose a unique username"
/>

// 错误状态
<GeistInput
  value={password}
  onChange={setPassword}
  type="password"
  label="Password"
  error="Password must be at least 8 characters"
/>
```

### 4. 使用 GeistCard

```tsx
import { GeistCard } from './components/ui';

// 默认卡片
<GeistCard title="Card Title" subtitle="Subtitle">
  Card content goes here
</GeistCard>

// elevated 卡片
<GeistCard variant="elevated">
  Elevated card with shadow
</GeistCard>

// 可点击卡片
<GeistCard 
  clickable 
  onClick={() => navigate('/details')}
>
  Clickable content
</GeistCard>
```

### 5. 使用 GeistModal

```tsx
import { GeistModal, GeistButton } from './components/ui';

function DeleteConfirmModal({ isOpen, onClose, onConfirm }) {
  return (
    <GeistModal
      isOpen={isOpen}
      onClose={onClose}
      title="Delete Item?"
      subtitle="This action cannot be undone"
      size="small"
      footer={
        <>
          <GeistButton variant="secondary" onClick={onClose}>
            Cancel
          </GeistButton>
          <GeistButton variant="danger" onClick={onConfirm}>
            Delete
          </GeistButton>
        </>
      }
    >
      <p>Are you sure you want to delete this item?</p>
    </GeistModal>
  );
}
```

---

## 设计令牌

### 颜色令牌

```css
/* 中性色 */
--neutral-50: #fafafa;   /* 最浅 */
--neutral-100: #f5f5f5;
--neutral-200: #eaeaea;  /* 边框 */
--neutral-300: #cdcdcd;
--neutral-400: #999999;
--neutral-500: #666666;
--neutral-600: #444444;
--neutral-700: #333333;
--neutral-800: #171717;
--neutral-900: #0a0a0a;  /* 最深 */

/* 强调色 */
--geist-primary: #0070F3;  /* 蓝色 */
--geist-success: #17C470;  /* 绿色 */
--geist-warning: #F5A623;  /* 橙色 */
--geist-error: #EB5757;    /* 红色 */
```

### 间距令牌

```css
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 20px;
--space-6: 24px;
--space-8: 32px;
--space-10: 40px;
```

### 排版令牌

```css
/* 字号 */
--text-display: 48px;
--text-h1: 32px;
--text-h2: 24px;
--text-h3: 20px;
--text-body: 16px;
--text-small: 14px;
--text-caption: 12px;

/* 字体 */
--font-sans: 'Geist Sans', system-ui, sans-serif;
--font-mono: 'Geist Mono', monospace;
```

### 圆角令牌

```css
--radius-sm: 8px;     /* 按钮、输入框 */
--radius-md: 12px;    /* 卡片 */
--radius-lg: 16px;    /* 模态框 */
--radius-full: 9999px; /* 徽章、标签 */
```

### 阴影令牌

```css
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
--shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.12);
```

---

## 响应式断点

```css
/* 移动优先 */
@media (min-width: 640px) { /* sm */ }
@media (min-width: 768px) { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
@media (min-width: 1536px) { /* 2xl */ }
```

---

## Bento Grid 布局

```tsx
// 使用预定义的 Bento Grid 类
<div className="bento-grid">
  <div className="bento-item">Item 1</div>
  <div className="bento-item">Item 2</div>
  <div className="bento-item bento-item--span-2">Wide Item</div>
</div>
```

---

## 无障碍访问

### 触摸目标

所有交互式元素都遵循 WCAG 标准，最小触摸目标为 **44×44px**。

### 焦点管理

- GeistModal 自动管理焦点陷阱
- 所有组件都有可见的焦点指示器
- 支持键盘导航

### 对比度

所有文本和背景组合都满足 WCAG AA 标准（≥4.5:1 对比度）。

---

## 性能优化

### 动画

- 所有过渡使用 `transform` 和 `opacity` 属性
- 动画时长：150ms（快速）、250ms（正常）、300ms（慢速）
- 缓动函数：`cubic-bezier(0.4, 0, 0.2, 1)`

### 主题切换

- 使用 CSS 自定义属性实现零延迟切换
- localStorage 持久化用户偏好
- 支持系统偏好检测

---

## 故障排除

### 问题：字体未加载

**解决方案**: 检查网络面板中的 404 错误，验证 Google Fonts URL 是否正确。

### 问题：CSS 变量未定义

**解决方案**: 确保 `geist-tokens.css` 在组件使用前已导入。

### 问题：主题闪烁

**解决方案**: GeistProvider 已在 App 根级别处理，防止未样式化内容闪烁。

---

## 测试

运行所有测试：

```bash
npm test
```

运行特定测试：

```bash
# 契约测试
npm test -- contract

# 集成测试
npm test -- integration

# 响应式测试
npm test -- responsive
```

---

**文档状态**: COMPLETE  
**最后更新**: 2026-02-21
