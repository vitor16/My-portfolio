#!/usr/bin/env bash
# ==============================================================================
# DEPLOY SCRIPT FOR UBUNTU SERVER (192.168.100.105)
# ==============================================================================
set -e

SERVER_IP="${1:-192.168.100.105}"
SERVER_USER="${2:-vic}"
PORT="${3:-80}"

echo "========================================================"
echo "🚀 Deploying Liquid Glass Portfolio to $SERVER_USER@$SERVER_IP"
echo "========================================================"

LOCAL_DIR="/home/vic/Projects/liquid-glass-portfolio"

# Check if HDD mount exists on server or fallback to /var/www
REMOTE_DEST="/var/www/liquid-portfolio"

echo "📦 Step 1: Copying files to server..."
ssh "$SERVER_USER@$SERVER_IP" "sudo mkdir -p $REMOTE_DEST && sudo chown -R \$USER:\$USER $REMOTE_DEST"
rsync -avz --delete "$LOCAL_DIR/" "$SERVER_USER@$SERVER_IP:$REMOTE_DEST/"

echo "⚙️ Step 2: Configuring Web Service (Docker / Nginx)..."
ssh "$SERVER_USER@$SERVER_IP" "bash -s" << 'EOF'
set -e

DEST="/var/www/liquid-portfolio"

# Check if Docker is available
if command -v docker >/dev/null 2>&1; then
    echo "🐳 Docker detected. Launching high-performance Nginx container..."
    docker stop liquid-portfolio-web 2>/dev/null || true
    docker rm liquid-portfolio-web 2>/dev/null || true
    
    # Try port 80, fallback to 8085 if port 80 is occupied
    if lsof -Pi :80 -sTCP:LISTEN -t >/dev/null 2>&1; then
        echo "⚠️ Port 80 is already occupied by another service. Using port 8085..."
        PORT_TO_USE=8085
    else
        PORT_TO_USE=80
    fi

    docker run -d \
      --name liquid-portfolio-web \
      --restart unless-stopped \
      -p ${PORT_TO_USE}:80 \
      -v $DEST:/usr/share/nginx/html:ro \
      nginx:alpine

    echo "✅ Container running on port $PORT_TO_USE!"
else
    echo "🌐 Docker not found. Configuring native Nginx..."
    sudo apt update && sudo apt install -y nginx
    
    cat << 'NGINX_CONF' | sudo tee /etc/nginx/sites-available/liquid-portfolio
server {
    listen 80;
    server_name _;
    root /var/www/liquid-portfolio;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg)$ {
        expires 30d;
        add_header Cache-Control "public, no-transform";
    }
}
NGINX_CONF

    sudo ln -sf /etc/nginx/sites-available/liquid-portfolio /etc/nginx/sites-enabled/
    sudo nginx -t
    sudo systemctl reload nginx
    echo "✅ Nginx reloaded successfully!"
fi
EOF

echo "========================================================"
echo "🎉 DEPLOY CONCLUÍDO COM SUCESSO!"
echo "Acesse seu portfólio em: http://$SERVER_IP"
echo "========================================================"
