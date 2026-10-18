# TuneShape · basic-tabs

Use React, TypeScript and Motion. Reproduce the interaction from src/Preview.tsx, src/model.ts and src/easing.ts in this package. Use the supporting hooks; the complete TuneShape editor is outside this package. See README.md for system-font styling and scope.

标签页切换，使用缓动动画；320 ms。

- 组件: 标签页切换（Tab Transition；basic-tabs）
- 触发方式: 点击或用键盘激活另一个 Tab 时切换；当前 Tab 再次激活不重播。 详情页播放按钮演示一次初态到终态再返回初态；暂停保持当前画面，再次播放继续。
- 起点与终点: 隐藏态：横向 24 px、纵向 0 px、缩放 0.98 倍（98%）、不透明度 0%。显示态：横向 0 px、纵向 0 px、缩放 1 倍（100%）、不透明度 100%。
- 时序与专业术语: 每次转向目标前延迟 0 ms；使用缓动动画（tween），单程时长 duration = 320 ms，三次贝塞尔曲线 cubic-bezier(0.22, 1, 0.36, 1)；曲线控制同一段时长内的速度变化。
- 进入与退出: 新面板从隐藏态进入显示态，旧面板从当前值退出至隐藏态；新内容与仍在退出的内容层同时交叉淡入淡出（crossfade），使用相同的动画参数。快速连续切换时，可能暂时有多个退出层。旧内容在退出开始时移出可访问树并停止接收操作，退出结束后隐藏。Tab 指示状态即时更新。
- 重复操作与打断: 重复操作时采用重定向（retarget）：从当前显示值转向最新目标，不排队、不自动重复。新面板从隐藏态进入；仍在退出的同一面板被重新选中时，从当前值重新进入。
- 减少动态效果: 遵循系统 prefers-reduced-motion 时，跳过延迟和动画，立即到达目标终态；不执行位移、缩放或淡变过程。观察倍速只改变观察方式，不修改配置和导出参数。

## Exact configuration

```json
{
  "schemaVersion": 1,
  "component": "tabs",
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
  "animation": "tween",
  "durationMs": 320,
  "x": 24,
  "y": 0,
  "scale": 0.98
}
```

## Motion state and transition contract

```json
{
  "component": "tabs",
  "terminology": {
    "id": "basic-tabs",
    "name": "标签页切换",
    "englishTerm": "Tab Transition"
  },
  "states": {
    "rest": {
      "x": 24,
      "y": 0,
      "scale": 0.98,
      "opacity": 0
    },
    "active": {
      "x": 0,
      "y": 0,
      "scale": 1,
      "opacity": 1
    }
  },
  "transition": {
    "type": "tween",
    "duration": 0.32,
    "ease": [
      0.22,
      1,
      0.36,
      1
    ],
    "delay": 0
  },
  "events": {
    "activateNewTab": {
      "incoming": "active",
      "outgoing": "rest",
      "simultaneous": true
    },
    "reactivateCurrentTab": "no-op"
  },
  "policies": {
    "interruption": "retarget",
    "startFrom": "currentRenderedValue",
    "queue": false,
    "repeat": 0,
    "newPanelStartsAt": "rest",
    "reselectedExitingPanelStartsAt": "currentRenderedValue",
    "concurrentExitLayers": true,
    "hideAfterExit": true,
    "accessibilityHiddenAt": "exitStart",
    "interactionDisabledAt": "exitStart",
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
