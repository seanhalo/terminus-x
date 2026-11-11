name: Fetch Port Data

on:
  schedule:
    - cron: '*/15 * * * *'   # 每 15 分钟

permissions:
  contents: write

concurrency:
  group: port-data
  cancel-in-progress: false

jobs:
  update-data:
    runs-on: ubuntu-latest
    timeout-minutes: 5
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Fetch port data
        run: node fetch-port.js

      - name: Commit and push
        uses: stefanzweifel/git-auto-commit-action@v5
        with:
          commit_message: "Auto-update port data"
          file_pattern: port-data.json
