# Browser Connectivity Troubleshooting

If the `browser_subagent` or any Playwright-based tool returns a connection error like:
`failed to connect to browser via CDP: http://127.0.0.1:9222. CDP port not responsive in 5s: playwright: connect ECONNREFUSED 127.0.0.1:9222`

### Root Cause
This typically means no Chromium/Chrome instance is running with the remote debugging port enabled.

### Solution
Manually start a headless Chromium instance in the background with port 9222 enabled and sandbox disabled (especially important in WSL2 environments):

```bash
google-chrome --headless --remote-debugging-port=9222 --no-sandbox --disable-setuid-sandbox --remote-allow-origins=* &
```

Once the process is running, verify it is listening on port 9222:
```bash
ss -tlnp | grep 9222
```

Then retry the browser tool.
