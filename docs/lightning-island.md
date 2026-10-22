# Lightning Island / 闪电岛 UI

A community example by [OXOOOOX](https://github.com/OXOOOOX), adapted from their Lightning Island interface using [TuneShape](https://github.com/orocoa/TuneShape)'s source + validated configuration + implementation Prompt workflow.

## Run / 运行

```sh
git clone https://github.com/OXOOOOX/TuneShape.git
cd TuneShape
pnpm install --frozen-lockfile
pnpm dev
```

Open the URL printed by Vite, then choose **闪电岛 · Lightning Island**, or append `/#lightning-island`. The original button, tabs and dialog examples remain at `/#basic`.

## Try the interaction / 体验交互

1. Complete the fictional daily event. Its completed state adds exactly one entry to the LIVE activity list.
2. Collapse and reopen the completed card; inspect the LIVE drawer and close it with Escape.
3. Open the wooden noticeboard. Dismiss its in-preview dialog with its close control, backdrop or Escape; focus returns to the trigger.
4. Pause a transition and resume it. Reset restores the initial demonstration. System reduced-motion changes apply live.

所有任务、动态和公告都是虚构演示数据。此示例不连接闪电岛服务，不加载居民资料、照片、地图、字体文件或其他美术资源。完成任务只改变本页内存状态。

## Source, configuration and Prompt / 源码、配置与提示词

| UI | Configuration | Prompt |
| --- | --- | --- |
| 今日事件卡 / Event button | [event-button.json](../configs/lightning-island/event-button.json) | [event-button.md](../prompts/lightning-island/event-button.md) |
| LIVE 动态抽屉 / Activity drawer | [live-drawer.json](../configs/lightning-island/live-drawer.json) | [live-drawer.md](../prompts/lightning-island/live-drawer.md) |
| 木制更新牌 / Noticeboard | [update-board.json](../configs/lightning-island/update-board.json) | [update-board.md](../prompts/lightning-island/update-board.md) |

The implementation lives in [`src/lightning-island/IslandExamples.tsx`](../src/lightning-island/IslandExamples.tsx), with scoped [CSS](../src/lightning-island/style.css) and a validated [configuration loader](../src/lightning-island/configs.ts). It reuses `usePose` from `src/Preview.tsx`, `statesFor` / `transitionFor` from `src/model.ts`, the existing playback clock and the live reduced-motion hook. There are no new dependencies.

Each JSON file is a complete, unchanged **schemaVersion 1** motion document. Paste it into the original example's **Edit the exact configuration** editor to inspect its motion. The JSON controls transforms and timing; island copy, layout and colors belong to the example source and CSS. Applying a motion JSON to a basic example does not turn it into the island layout.

The drawer uses the existing `modal` motion kind for enter/exit transforms, but its DOM is a disclosure region. The noticeboard dialog is confined to the preview and uses `aria-modal="false"`; it is not a full application modal and does not trap focus.

## Adaptation / 提取方式

The blue `#087fd7` background, cream `#fff8e8` paper, `#172536` ink, coral `#ef5650`, yellow `#ffc928`, thick borders and hard shadows preserve Lightning Island's visual vocabulary. The original LIVE drawer, daily event card and CSS wooden sign inspired this standalone composition. The card's completion/collapse workflow remains, while game rules, rewards, accounts, storage and network calls are omitted.

Motion is deliberately expressed through TuneShape's shared renderer. The drawer uses a single 180 ms tween for transforms and opacity; the board uses a 160 ms smooth tween in place of the original stepped CSS entrance. These are documented adaptations, not a pixel-for-pixel export of the running game.

When reusing the components, carry over the supporting modules and scoped stylesheet listed above. For a Next.js App Router application, place the interactive entry behind a `'use client'` boundary. The original Lightning Island project is not part of this package.

## Verify and contribute / 验证与交流

```sh
pnpm test
pnpm build
```

Check pointer, Space/Enter, Escape, interrupted open/close transitions, pause/resume, live reduced motion and a mobile viewport in a browser. The configuration tests also keep the exact JSON in each Prompt synchronized with its runtime preset.

Focused feedback on the extracted interaction, configuration contract and accessibility is welcome. Follow [CONTRIBUTING.md](../CONTRIBUTING.md) for upstream contributions. This is a community example; it is not the full TuneShape editor or an official integration endorsement.

The extracted UI code and accompanying documentation are contributed under this repository's [MIT license](../LICENSE). TuneShape's attribution is preserved. This contribution does not relicense or publish the rest of the Lightning Island project.
