## vsc的样式插件
one-drak-pro

vscode-icons

settings.json
```json

{
  "c-cpp-compile-run.run-in-external-terminal": true,
  "markdown.extension.math.enabled": false,
  "[markdown]": {
    "editor.wordWrap": "on"
    // "editor.rulers": [80, 100]
  },
  "vim.easymotion": true,
  "vim.incsearch": true,
  "vim.useSystemClipboard": true,
  "vim.useCtrlKeys": true,
  "vim.hlsearch": true,
  "vim.insertModeKeyBindings": [
    {
      "before": ["j", "j"],
      "after": ["<Esc>"]
    }
  ],
  "vim.normalModeKeyBindingsNonRecursive": [
    {
      "before": ["<leader>", "d"],
      "after": ["d", "d"]
    },
    {
      "before": ["<C-n>"],
      "commands": [":nohl"]
    },
    {
      "before": ["X"],
      "after": ["\"", "_", "x"]
    }
  ],
  "vim.leader": "<space>",
  "vim.handleKeys": {
    "<C-a>": false,
    "<C-f>": false
  },
  "editor.fontFamily": "'JetBrains Mono NL', 'JetBrains Mono', 'Fira Code', 'Operator Mono'",
  "editor.renderWhitespace": "boundary",
  "terminal.external.linuxExec": "konsole",
  "files.autoGuessEncoding": true,
  "C_Cpp.errorSquiggles": "enabled",
  "explorer.confirmDragAndDrop": false,
  "files.autoSave": "afterDelay",
  "explorer.sortOrder": "type",
  "explorer.confirmDelete": false,
  "hediet.vscode-drawio.resizeImages": null,
  "workbench.colorTheme": "One Dark Pro",
  "oneDarkPro.vivid": true,
  "oneDarkPro.bold": true,
  "solidity.telemetry": true,
  "liveServer.settings.donotShowInfoMsg": true,
  "open-in-browser.default": "google-chrome",
  "editor.minimap.enabled": false,
  "eslint.codeActionsOnSave.rules": null,
  "editor.codeActionsOnSave": {
    "source.fixAll": "explicit"
  },
  "editor.formatOnSave": true,
  "editor.tabSize": 2,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "prettier.useEditorConfig": true,
  "workbench.iconTheme": "vscode-icons",
  "[cpp]": {
    "editor.defaultFormatter": "xaver.clang-format"
  },
  "files.autoSaveDelay": 60000,
  "eslint.lintTask.enable": true,
  "eslint.alwaysShowStatus": true,
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ],
  "editor.guides.bracketPairs": "active",
  "tailwindCSS.emmetCompletions": true,
  "[c]": {
    "editor.defaultFormatter": "xaver.clang-format"
  },
  "vim.commandLineModeKeyBindings": [],
  "vim.visualModeKeyBindingsNonRecursive": [
    {
      "before": ["p"],
      "after": ["\"", "_", "d", "P"]
    },
    {
      "before": ["X"],
      "after": ["\"", "_", "x"]
    }
  ],
  "terminal.integrated.fontFamily": "MesloLGS NF",
  "workbench.startupEditor": "none",
  "editor.accessibilitySupport": "off",
  "github.copilot.enable": {
    "*": true,
    "plaintext": true,
    "markdown": true,
    "scminput": false
  },
  "github.copilot.nextEditSuggestions.enabled": true,
  "cursor.cpp.disabledLanguages": ["scminput"],
  "workbench.activityBar.orientation": "vertical",
  "diffEditor.hideUnchangedRegions.enabled": true,
  "workbench.editor.wrapTabs": true,
  "workbench.editor.tabCloseButton": "right",
  "workbench.editor.tabActionLocation": "right",
  "prettier.semi": false,
  "cursor.composer.shouldAutoAcceptDiffs": false
}

```