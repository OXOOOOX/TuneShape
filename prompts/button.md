# TuneShape · basic-button

Use React, TypeScript and Motion. Reproduce the interaction from src/Preview.tsx, src/model.ts and src/easing.ts in this package. Use the supporting hooks; the complete TuneShape editor is outside this package. See README.md for system-font styling and scope.

按钮按压反馈，使用时长型弹簧；420 ms / 回弹 0.25。

- 组件: 按钮按压反馈（Button Press Feedback；basic-button）
- 触发方式: 指针、空格键或 Enter 键按下时进入按压态；松开或取消按压时返回静止态。键盘焦点离开时也恢复静止态。 详情页播放按钮演示一次初态到终态再返回初态；暂停保持当前画面，再次播放继续。
- 起点与终点: 静止态：横向 0 px、纵向 0 px、缩放 1 倍（100%）、不透明度 100%。按压态：横向 0 px、纵向 2 px、缩放 0.92 倍（92%）、不透明度 100%。
- 时序与专业术语: 每次转向目标前延迟 0 ms；使用时长型弹簧（spring），时长参数 duration = 420 ms、回弹 bounce = 0.25。时长用于控制弹簧节奏，不承诺精确落稳时刻；回弹越大，越容易越过目标后返回。
- 进入与退出: 按下从静止态转向按压态，释放从当前值返回静止态；两个方向使用相同的动画参数。
- 重复操作与打断: 重复操作时采用重定向（retarget）：从当前显示值转向最新目标，不排队、不自动重复。每条新弹簧轨迹的初速度 velocity 固定为 0，不继承上一条轨迹的速度。
- 减少动态效果: 遵循系统 prefers-reduced-motion 时，跳过延迟和动画，立即到达目标终态；不执行位移、缩放或淡变过程。观察倍速只改变观察方式，不修改配置和导出参数。

## Exact configuration

```json
{
  "schemaVersion": 1,
  "component": "button",
  "mode": "beginner",
  "delayMs": 0,
  "easing": [
    0.22,
    1,
    0.36,
    1
  ],
  "bounce": 0.25,
  "stiffness": 260,
  "damping": 24,
  "mass": 1,
  "interruption": "retarget",
  "reducedMotion": "instant",
  "animation": "spring",
  "durationMs": 420,
  "x": 0,
  "y": 2,
  "scale": 0.92
}
```

## Motion state and transition contract

```json
{
  "component": "button",
  "terminology": {
    "id": "basic-button",
    "name": "按钮按压反馈",
    "englishTerm": "Button Press Feedback"
  },
  "states": {
    "rest": {
      "x": 0,
      "y": 0,
      "scale": 1,
      "opacity": 1
    },
    "active": {
      "x": 0,
      "y": 2,
      "scale": 0.92,
      "opacity": 1
    }
  },
  "transition": {
    "type": "spring",
    "duration": 0.42,
    "bounce": 0.25,
    "velocity": 0,
    "delay": 0
  },
  "events": {
    "pointerDown": "active",
    "keyDownSpaceOrEnter": "active",
    "pointerUpOrCancel": "rest",
    "keyUpSpaceOrEnter": "rest",
    "blur": "rest"
  },
  "policies": {
    "interruption": "retarget",
    "startFrom": "currentRenderedValue",
    "queue": false,
    "repeat": 0,
    "newSpringVelocity": 0,
    "reducedMotion": {
      "trigger": "prefers-reduced-motion",
      "behavior": "instant",
      "delay": 0,
      "duration": 0,
      "animateTransform": false,
      "animateOpacity": false
    },
    "observationSpeed": "Preview only; excluded from configuration and animation parameters"
  }
}
```

Acceptance: JSON round trips unchanged, source and transitions agree, pointer and keyboard work, and reduced motion skips animation. Install and build using the locked instructions in README.md.
