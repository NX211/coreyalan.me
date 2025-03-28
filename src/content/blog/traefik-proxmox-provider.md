---
title: 'Streamlining Homelab Routing with Traefik Proxmox Provider'
excerpt: 'How to automatically configure Traefik routing for your Proxmox VMs and containers without manual intervention'
date: '2024-03-28'
author: 'Corey Stone'
coverImage: '/images/blog/traefik-proxmox-provider.png'
tags: ['homelab', 'proxmox', 'traefik', 'routing', 'automation']
---

# Streamlining Homelab Routing with Traefik Proxmox Provider

If you're running a Proxmox-based homelab, you've likely encountered the challenge of efficiently managing routing to your various services. The Traefik Proxmox Provider solves this problem elegantly by automatically discovering your Proxmox VMs and containers, then configuring Traefik routing based on metadata you define.

## What is Traefik Proxmox Provider?

The Traefik Proxmox Provider is a plugin for [Traefik](https://traefik.io/) that automatically configures routing based on your Proxmox virtual machines and containers. Instead of manually updating Traefik configurations when you create, update, or remove services in your Proxmox environment, this provider dynamically handles routing through simple metadata tags.

Key features include:
- Automatic discovery of Proxmox VMs and containers
- Configuration of routing based on VM/container notes
- Support for both HTTP and HTTPS endpoints
- Configurable polling interval
- Full support for Traefik's routing, middleware, and TLS options

## Why Use It in Your Homelab?

In a homelab environment, you're likely running multiple services across VMs and containers. Manually updating reverse proxy configurations each time you modify your environment is tedious and error-prone. With this provider:

1. You get **zero-touch provisioning** - newly created services are automatically discovered
2. Your routing configuration lives with the service itself (in Proxmox notes)
3. You maintain a single source of truth for service configuration
4. You can easily move services between hosts without reconfiguring your routing

## Setting Up Traefik Proxmox Provider in Your Homelab

### Prerequisites

- Proxmox VE installation
- Traefik v2.x running in your homelab
- Basic understanding of Traefik concepts (routers, services, middleware)

### Step 1: Set Up Proxmox API Token

The provider needs an API token with the right permissions to read your VM and container information:

```bash
# Create a role with minimum required permissions
pveum role add traefik-provider -privs "VM.Audit,VM.Monitor,Sys.Audit,Datastore.Audit"

# Create an API token for your user (use your username)
pveum user token add root@pam traefik_homelab

# Assign the role to the token
pveum acl modify / -token 'root@pam!traefik_homelab' -role traefik-provider
```

**Important:** Save the API token value displayed after creation, as it won't be shown again.

### Step 2: Add the Plugin to Traefik

Edit your Traefik static configuration file (typically `traefik.yaml` or `traefik.toml`) to include the plugin:

```yaml
experimental:
  plugins:
    traefik-proxmox-provider:
      moduleName: github.com/NX211/traefik-proxmox-provider
      version: v0.7.0
```

### Step 3: Configure the Provider

Add the provider configuration to your Traefik dynamic configuration:

```yaml
providers:
  plugin:
    traefik-proxmox-provider:
      pollInterval: "30s"
      apiEndpoint: "https://proxmox.homelab.local"
      apiTokenId: "root@pam!traefik_homelab"
      apiToken: "your-api-token-value"
      apiLogging: "info"
      apiValidateSSL: "true"
```

Adjust the `apiEndpoint` to match your Proxmox server's URL and set the correct token values.

### Step 4: Solving the Network Connectivity Challenge

One of the biggest challenges when using the Traefik Proxmox Provider is ensuring network connectivity between your Traefik container and the Proxmox VMs/containers. By default, Docker's network isolation prevents Traefik from reaching your Proxmox services directly.

Here are solutions for different Docker deployment scenarios:

#### For Docker Standalone

Use the macvlan network driver to give your Traefik container direct access to your physical network:

```bash
# Create a macvlan network that shares your host's physical network
docker network create -d macvlan \
  --subnet=192.168.1.0/24 \
  --gateway=192.168.1.1 \
  -o parent=eth0 \
  proxmox-access

# Run Traefik with access to both networks
docker run -d \
  --name traefik \
  --network proxmox-access \
  --network-alias traefik \
  --ip 192.168.1.50 \
  -p 80:80 -p 443:443 \
  -v $PWD/traefik.yaml:/etc/traefik/traefik.yaml \
  traefik:latest
```

Adjust the subnet, gateway, and parent interface to match your network configuration. The `--ip` flag assigns a static IP on your physical network to the Traefik container.

#### For Docker Compose

Add macvlan network configuration to your docker-compose.yml:

```yaml
version: '3'

networks:
  traefik-network:
    driver: bridge
  proxmox-network:
    driver: macvlan
    driver_opts:
      parent: eth0
    ipam:
      config:
        - subnet: "192.168.1.0/24"
          gateway: "192.168.1.1"

services:
  traefik:
    image: traefik:latest
    container_name: traefik
    networks:
      - traefik-network
      - proxmox-network
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./traefik.yaml:/etc/traefik/traefik.yaml
```

Adjust network settings to match your environment.

#### For Docker Swarm

For Docker Swarm, you'll need to create the macvlan network as attachable and then use it in your stack:

```bash
# Create the macvlan network
docker network create \
  --driver=macvlan \
  --subnet=192.168.1.0/24 \
  --gateway=192.168.1.1 \
  -o parent=eth0 \
  --scope=swarm \
  --attachable \
  proxmox-access
```

In your stack YAML:

```yaml
version: '3.8'

networks:
  traefik-network:
    external: true
  proxmox-access:
    external: true

services:
  traefik:
    image: traefik:latest
    networks:
      - traefik-network
      - proxmox-access
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./traefik.yaml:/etc/traefik/traefik.yaml
    deploy:
      placement:
        constraints:
          - node.role == manager
```

#### Alternative Solution: DNS Configuration

If macvlan networking isn't an option, you can also solve the problem by configuring DNS:

```yaml
services:
  traefik:
    image: traefik:latest
    dns:
      - 192.168.1.1  # Your network DNS server that can resolve Proxmox hostnames
    dns_search:
      - homelab.local  # Your local domain
    # ... other configuration ...
```

#### Using IP Addresses Instead of Hostnames

As a simpler alternative, you can use IP addresses in your Proxmox VM notes instead of hostnames:

```
traefik.enable=true
traefik.http.routers.mywebsite.rule=Host(`website.homelab.local`)
traefik.http.services.mywebsite.loadbalancer.server.url=http://192.168.1.100:8080
```

This approach avoids hostname resolution issues entirely.

### Step 5: Label Your VMs and Containers

This is where the magic happens! Edit the "Notes" section of your VMs or containers in the Proxmox web UI:

1. Select your VM/container
2. Click on the "Notes" field in the Summary tab
3. Add Traefik labels, one per line

At minimum, add:
```
traefik.enable=true
```

For a basic web service, you might use:
```
traefik.enable=true
traefik.http.routers.mywebsite.rule=Host(`website.homelab.local`)
traefik.http.services.mywebsite.loadbalancer.server.port=8080
```

### Step 6: Restart Traefik

Restart your Traefik instance to load the new configuration:

```bash
sudo systemctl restart traefik
```

## Real-World Examples for Your Homelab

### Media Server (Jellyfin)

```
traefik.enable=true
traefik.http.routers.jellyfin.rule=Host(`media.homelab.local`)
traefik.http.services.jellyfin.loadbalancer.server.port=8096
```

### Home Assistant with HTTPS

```
traefik.enable=true
traefik.http.routers.homeassistant.rule=Host(`hass.homelab.local`)
traefik.http.routers.homeassistant.entrypoints=websecure
traefik.http.routers.homeassistant.tls=true
traefik.http.services.homeassistant.loadbalancer.server.port=8123
```

### Multiple Services on One VM

```
traefik.enable=true
traefik.http.routers.dashboard.rule=Host(`dashboard.homelab.local`)
traefik.http.services.dashboard.loadbalancer.server.port=3000
traefik.http.routers.api.rule=Host(`api.homelab.local`)
traefik.http.services.api.loadbalancer.server.port=8080
```

## How It Works Behind the Scenes

The provider polls your Proxmox API at regular intervals (default 30s) and:

1. Discovers all running VMs and containers
2. Reads the notes field of each VM/container
3. Extracts Traefik labels from the notes
4. Creates Traefik router and service configurations
5. Provides these configurations to Traefik
6. Traefik applies the routing rules dynamically

## Troubleshooting Tips

If your services aren't getting routed correctly:

1. Enable debug logging with `apiLogging: "debug"`
2. Verify your VM/container has `traefik.enable=true` in its notes
3. Check that the VM/container is running
4. Verify network connectivity between Traefik and the VM/container:
   - Try `ping` from the Docker host to Proxmox VMs
   - For macvlan networks, ensure the IP allocation doesn't conflict
   - Check if you're getting 502 Bad Gateway errors (indicates network connectivity issues)
5. Check the Traefik logs for any routing errors
6. If using hostnames, verify DNS resolution works within the Traefik container

## Conclusion

The Traefik Proxmox Provider is a game-changer for homelab enthusiasts using Proxmox. It eliminates the need for manual routing configuration while giving you the full power and flexibility of Traefik's routing capabilities. By storing routing configuration as metadata on your VMs and containers, you maintain a clean, self-documenting system that scales with your homelab's growth.

With the right network configuration, Traefik can seamlessly connect to your Proxmox environment, creating a unified, easy-to-manage infrastructure for all your homelab services.

Try it out in your environment, and experience the convenience of automatic service discovery and routing!
