FROM mcr.microsoft.com/devcontainers/javascript-node:1-22-bookworm
LABEL authors="kanium"

RUN wget -qO- https://get.pnpm.io/install.sh | ENV="$HOME/.shrc" SHELL="$(which sh)" sh -

RUN SHELL="$(which sh)" sh -c source /root/.shrc

RUN pnpm env use --global 22.17.1
