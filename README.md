Black Screen
===

GlobalLogic UI/UX Contest task


## Issue
- Computers are enabled, and showing how much energy it's used and what we can save
- Financial, Energy related, "Earth Hours". 
- Topic should attract Building owners, and show how much money we can save/economy on shutting computers down? 


## UI Solution
- Page/Map, where we can see map/number of enabled computers in network in office.
- Control/UI to represent networks list
- Control button, for network re-scan, as a feature


## UX
- User should launch the page and understand clearly what he is looking for - map of computers
- Page should represent valuable information for the end customer


## Tech Stack
- UI: Bootstrap, Semantic UI, Materialize UI
- Server: NodeSJ, ShellJS, etc


## Technical challenge/stack
- Networking related ([`nmap`](https://nmap.org/download.html)). Download and install. On macOS `brew install nmap` installs 7.60 version
- `nmap` commands research/log/examples are in `nmap_commands.txt`
- After local run, look to `file.log` for runtime results.
- Note: Reserved Unix/Windows CLI commands: `ps`, `scan`, `uname`, `hostname`, `ping`, `tracert`, `traceroute`, so we better avoid custom file names (like scan.sh)

## Run Locally

```
npm install # first time only
npm start
```


## Presentation
- Slides
- Video can collect all issues, and we show solution.


## TODO
- Additional, future feature: Remote disable of PC


## Resources
- https://nmap.org/download.html
- https://github.com/Johnhhorton/node-nmap
- http://www.wykop.pl/ramka/3724845/tak-sie-hackuje-system-it-krok-po-kroku/
- https://expressjs.com/en/guide/routing.html
- https://github.com/shelljs/shelljs
- https://glo.globallogic.com/api_documents/ - GL APIs


## Authors
- Andrii Lundiak
- Artur Vorobiov
- Vlad Kokul


## Action Items
- Artur, research if we can scan computers returning hostnames (nmap or other command)
- Artur, research if we can scan computers and get Windows User name
- Andrii, work excel table, convert to CSV/JSON.
- Andrii, get GL map API https://portal.globallogic.com/glm/view/block/Poland/KRK/L7/120/tableid/3070
- Andrii, resreach GL API to work with Office map maybe
- Vlad, think about design, ideas, tols, frameworks, mockups, etc.