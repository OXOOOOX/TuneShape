# TuneShape · 随形

Independently runnable **basic motion examples** for button press feedback, tab transitions and an in-page dialog. [Try the complete online editor](https://kai-nex.com/tuneshape/).

本仓库只公开三个基础示例、对应配置、Prompt 和必要说明。完整在线编辑器、参数面板、目录、启动动画及高级效果的工程源码不包含在此仓库。历史完整应用发布包已撤下；此前已获取的副本不受此操作控制。

## Run

Use Node.js >=22.12 and the pnpm version pinned in `package.json`.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

```sh
pnpm test
pnpm build
pnpm preview
```

No account, API key, database, CDN or TuneShape service is required. The build is a static site. The link to the online editor is optional.

## Reproduce and inspect

- `src/Preview.tsx` is the same basic interaction renderer used by the online editor; `src/model.ts` and `src/easing.ts` define validated parameters, state mapping and transitions. Supporting playback and reduced-motion hooks are included.
- Choose button, tabs or modal in the demo. Edit `config.json` before starting, or paste a schemaVersion 1 configuration into the demo's JSON editor. Observation speed is not persisted.
- `configs/` and `prompts/` contain matching default snapshots for all three components. Prompt files reference the exact included implementation; do not claim a natural-language prompt alone guarantees identical generated code.
- `SOURCE_MANIFEST.json` lists exported files and SHA-256 checksums. Its own checksum is omitted to avoid a circular digest.
- Examples use system fonts and a small demo stylesheet. They reproduce the basic interaction and parameters, not the complete online editor's fonts, panel UI or page layout.
- Pointer cancellation, keyboard activation, tab arrow navigation, dialog close/Escape, animation interruption, pause/resume and live reduced-motion preferences are retained. This dialog is an **in-page demonstration** (`aria-modal=false`), not an application-wide modal/focus trap.

## Public scope and license

Only files included in this repository are offered here under MIT; see `LICENSE`. React, React DOM, Motion and development dependencies retain their upstream licenses. No third-party reference artwork or bundled fonts are included. User-provided content retains its own rights.

Local operational records, deployment configuration and the complete website are outside this repository. Future updates publish this allowlisted example package, never a recursive copy of the local application or its Git history.

公开示例可独立运行并检查实现；高级效果的在线配置、规格和离线 HTML 是另外的复用方式，不能据此声称完整网站工程已开源。
