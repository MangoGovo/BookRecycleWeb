

# 旧书回收系统 前端技术文档

### 一、技术栈概览

#### 1. 核心框架

- **Vue 3**：主框架+组合式API
- **TypeScript**：静态类型检查
- **Pinia**：状态管理（含持久化插件`pinia-plugin-persistedstate`）

#### 2. UI体系

- **Element Plus**：基础组件库
- **DaisyUI**：Tailwind CSS增强插件
- **Tailwind CSS**：原子化CSS框架

#### 3. 工程化

- **Vite**：构建工具
- **unplugin**系列：自动导入组件/API

#### 4. 特色功能库

- **go-captcha-vue**：滑动验证码组件
- **vue-hooks-plus**：增强型Hooks

------

### 二、关键技术实现

#### 1. 滑动验证码系统

**实现路径**：

- 后端生成主图、滑块图
- 渲染滑块页面，获取用户滑块参数
- 提交验证请求，继续或终止请求链路

**技术要点**：

- 双图分离式验证（主图与滑块图）
- 坐标偏移量验证机制

#### 2. 实时聊天系统

**架构设计**：

封装`useWebSocket`的Hook实现基于**WebSocket**消息订阅

**核心特性**：

- 消息分组映射（按联系人归类）

- 自动上下文消息（书籍咨询场景）
- 离线消息缓存机制

------

### 三、工程化实践

1. 使用**git**进行项目管理与协作

​	[github](https://github.com/MangoGovo/BookRecycleWeb)

2. 使用**apifox**进行前后端接口对接
