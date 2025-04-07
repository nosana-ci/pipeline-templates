# Nosana Jobs Templates

This repository contains job definition file templates that can be used to post jobs to the Nosana Network.

## Nosana Builder Challenge

![nosana_builders_challenge](https://github.com/user-attachments/assets/d239f83c-59db-4203-8f5d-7ff9eebf2203)

We’re thrilled to launch the **Nosana Builder Challenge**, a developer-focused contest designed to push the boundaries of AI model deployment on the **Nosana Network**. This is your chance to showcase your skills, gain visibility, learn new tools — and compete for over **$3,000 USDC in prizes**!

Read more about the [Nosana Builder Challenge](https://nosana.com/blog/nos_challenge?utm_source=github&utm_medium=post&utm_campaign=challenge_1)

## TL;DR

- Create reusable Nosana Templates for deploying AI models.
- Submit via GitHub PR to win USDC prizes.
- **$3,000+** USDC total rewards for top 10 submissions.
- Deadline and details: [Builders Challenge Page](https://earn.superteam.fun/listing/nosana-builders-challenge/)

### Submission Requirements

- [ ] Pull Request to the [Nosana Template GitHub](https://github.com/nosana-ci/pipeline-templates/) Repo with the following files:
  - [ ] `job-definition.json`: Standard Nosana Job Definition JSON File
  - [ ] `info.json`: JSON file with display information for the dashboard
  - [ ] `README.md`: README file with a description of the Job Definition, Models, any other relevant information about the job.
- [ ] Make sure that running `npm run validate` passes without any errors.
- [ ] Social Media Post: Must briefly describe your template and tag [@nosana_ai](https://x.com/nosana_ai) on <https://x.com>
- [ ] Starring the [Nosana CLI](https://github.com/nosana-ci/nosana-cli), [Nosana SDK](https://github.com/nosana-ci/nosana-sdk), and [Nosana Template](https://github.com/nosana-ci/pipeline-templates/) GitHub repositories.
- [ ] Include a link to a successful run of your submission Template, for example: [Example succesfull Nosana Job](https://dashboard.nosana.com/jobs/BkKFtUqMi2UmX8RMnsYKiKXHJ9bVYkVyo2vyJz4dBxKc)
- [ ] Do not copy or plagiarize someone else's work.
- [ ] Multiple Submissions are allowed, but must be done via `1` Pull Request.

## Templates

- [Hello World](/templates/hello-world/)
- [Jupyter Notebook](/templates/jupyter-notebook/)
- [Open WebUI](/templates/open-webui/)
- [Stable Diffusion](/templates/stable-diffusion/)

# Contribution Guide

Thank you for your interest in contributing to our repository! By adding your own job definition templates, you’re helping to build a valuable resource for the Nosana Network community.

Follow the steps below to submit a Pull Request (PR) with a new template:

## 1. Fork the Repository

1. Go to the repository page on GitHub.
2. Click on the "Fork" button in the upper-right corner to create your own copy of the repository.

## 2. Clone the Forked Repository

After forking, clone your copy to your local machine:

```bash
git clone https://github.com/your-username/templates.git
cd templates
```

## 3. Create a New Branch

Create a new branch for your template submission:

```bash
git checkout -b add-template-your-template-name
```

## 4. Add Your Template

Create a new folder for your template inside the `templates` directory. Each template folder must contain the following files:

### 4.1 `info.json`

This file should provide basic information about your template using the following structure:

```json
{
  "id": "your-template-id",
  "name": "Your Template Name",
  "description": "A brief description of what the template does",
  "category": ["Your Category"], 
  "icon": "https://link-to-an-icon-for-your-template"
}
```

- **id**: A unique identifier for your template.
- **name**: The name of the template.
- **description**: A concise description of what the job does.
- **category**: Relevant categories (can be multiple).
- **icon**: A URL link to an icon (e.g., a logo or related image).

### 4.2 `job-definition.json`

This file should contain the job definition JSON. Refer to the [Nosana Documentation](https://docs.nosana.io/inference/writing_a_job.html) for details on writing a job definition file.

### 4.3 `README.md`

Include a `README.md` file with the following:

- **Title**: The name of your template.
- **Description**: A detailed description of the template, how it works, and any requirements.
- **Screenshot/Video**: Add an image, screenshot, or video showing the result of using your template (optional but encouraged). Make sure to only use absolute URLs.

Example `README.md`:

```markdown
# Your Template Name

## Description
A brief explanation of what the template does and how it works.

## Screenshot/Video
![Screenshot](https://link-to-screenshot)
```

## 5. Commit Your Changes

After adding your template, run the following command to validate that your template is correctly formatted:

```bash
npm run validate
```

Then commit your changes:

```bash
git add .
git commit -m "Add new template: your-template-name"
```

## 6. Push Your Branch

Push the branch to your forked repository:

```bash
git push origin add-template-your-template-name
```

## 7. Open a Pull Request

1. Go to your forked repository on GitHub.
2. Click the "Compare & pull request" button.
4. Submit the pull request for review.

---

## Contribution Guidelines

- Ensure that the `info.json` and `job-definition.json` files are properly formatted and contain all necessary information.
- Make sure your `README.md` is clear, descriptive, and includes a screenshot or video (if available).
- Test your job definition to ensure it works as expected.
- Make sure your PR only contains the necessary files for your template.

We appreciate your contribution! Once your PR passes the validation tests, is reviewed, and approved, it will be merged into the main repository.
