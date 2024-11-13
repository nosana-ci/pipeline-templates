# RStudio

![RStudio](https://raw.githubusercontent.com/nosana-ci/templates/refs/heads/main/templates/rstudio/rstudio.mp4)

RStudio Server allows you to run RStudio on a remote server and access it through your web browser. This setup provides a consistent and powerful R development environment accessible from anywhere, leveraging GPU-backed nodes for enhanced performance.

**Key Features:**

- **Remote Development:** Access your RStudio IDE from any device with a web browser.
- **Resource Efficiency:** Utilize powerful cloud servers to handle intensive computations and data processing.
- **Secure Access:** Configure user and group IDs, timezone, and secure access with passwords.
- **Scalable:** Deploy on GPU-backed nodes to accelerate your R workflows.
- **Easy Integration:** Seamlessly integrate with GitHub and other version control systems.

**Unleash the power of R development with Nosana!** Effortlessly deploy and manage your RStudio Server instance on high-performance GPU-backed nodes, ensuring a smooth and efficient coding experience for your projects.

Whether you're conducting data analysis, developing statistical models, or collaborating with a team, Nosana provides the infrastructure and tools you need to leverage RStudio effectively.

## Getting Started

1. **Deploy the Template:**
   Use the Nosana platform to deploy the RStudio template.

2. **Access the Web Interface:**
   Navigate to `https://<address>` in your web browser to access the RStudio interface.

3. **Configure RStudio:**
   - **Username:** `rstudio`
   - **Password:** Set via the `PASSWORD` environment variable in the job definition.

## Configuration

- **Environment Variables:**
  - `USER=rstudio`: Sets the RStudio user.
  - `PASSWORD=password`: Password for RStudio login.
  - `RUNROOTLESS=false`: Run RStudio as root (set to `false` for security).

- **Ports:**
  - `8787`: Access the RStudio web interface.
