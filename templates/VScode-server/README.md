# VSCode Server

![VSCode Server](https://raw.githubusercontent.com/nosana-ci/templates/refs/heads/main/templates/vscode-server/vscode_server.mp4)

VSCode Server allows you to run Visual Studio Code on a remote server and access it through your browser. This setup provides a consistent and powerful development environment accessible from anywhere, whether you're on a Chromebook, tablet, laptop, or desktop.

**Key Features:**

- **Remote Development:** Access your development environment from any device with a web browser.
- **Resource Efficiency:** Leverage powerful cloud servers to handle intensive computations, tests, compilations, and more.
- **Seamless Integration:** Easily integrate with GitHub by adding your SSH keys.
- **Customizable Environment:** Configure user and group IDs, timezone, and secure access with passwords.
- **Scalable:** Utilize GPU-backed nodes for enhanced performance when needed.

**Unleash the power of remote development with Nosana!** Effortlessly deploy and manage your VSCode Server instance on high-performance GPU-backed nodes, ensuring a smooth and efficient coding experience for your projects.

Whether you're developing software, managing repositories, or collaborating with a team, Nosana provides the infrastructure and tools you need to leverage VSCode Server effectively.

## Getting Started

1. **Deploy the Template:**
   Use the Nosana platform to deploy the VSCode Server template.

2. **Access the Web Interface:**
   Navigate to `https://<address>` in your web browser to access the VSCode interface.

3. **Configure GitHub Integration (Optional):**
   - Add your SSH key to `/config/.ssh` for GitHub integration.
   - Open a terminal within VSCode and set your GitHub username and email:
     ```bash
     git config --global user.name "your_username"
     git config --global user.email "your_email@example.com"
     ```

4. **Secure Your Instance:**
   - Set a strong `SUDO_PASSWORD` in the environment variables to secure terminal access.

## Configuration

- **Environment Variables:**
  - `PUID=1000`: User ID for file permissions.
  - `PGID=1000`: Group ID for file permissions.
  - `TZ=Etc/UTC`: Timezone setting.
  - `SUDO_PASSWORD=password`: Password for sudo access in the terminal.

- **Ports:**
  - `8443`: Access the VSCode web interface.

- **Volume Mappings:**
  - `/config`: Contains all relevant configuration files and settings.

## Notes

- **GPU Requirements:**
  - This container is configured to use GPU resources. Ensure your deployment node has a GPU with sufficient capabilities if needed.

- **Security:**
  - If `PASSWORD` or `HASHED_PASSWORD` is not set, there will be no authentication for the web interface. It's recommended to set at least one for security.

- **Updating:**
  - To update the container, pull the latest image and recreate the container using your deployment method (Docker Compose or Docker CLI).

---

### **Directory Structure:**

Ensure you create a new directory named `vscode-server` inside your `templates` directory. The structure should look like this:

