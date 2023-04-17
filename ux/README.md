# Food Trucks client/server UX demo

The folders, `./crafted` and `./service` contain the pieces of user experience for a food truck tracker.  The service returns a curated list to the "card based" (read:  CSS grid) browser client.

## Service

The service runs on `node:18` via Docker Swarm fronted by Traefik V2 in my homelab.  You can run it similarly, locally, by building the image and exposing port `9001`.  **NOTE**:  In the UX project, you'll need to shift the URL from `https://trucks.crafton.dev/` to `http://localhost:9001/`.  I've included a convenient `sed` command for that.

**MAC USERS**:  You may need to add an extension to the command, like so:  `sed -i ".bak"`.

```shell
> sed -i 's/https/http/g;s/trucks\.crafton\.dev/localhost\:9001/g;' ./ux/crafted/assets/scripts/default.js
```