# Contributing to Rojifi Documentation

Thank you for your interest in contributing to the Rojifi API documentation! We welcome contributions from the community to help us improve our documentation.

## How to Contribute

1.  **Fork the Repository**: Start by forking this repository to your own GitHub account.
2.  **Create a New Branch**: Create a new branch for your changes (e.g., `git checkout -b fix/typo-correction`).
3.  **Make Changes**:
    *   **Content Changes**: Most documentation content is located in `src/data/docs.ts`. Edit this file to add or update documentation pages.
    *   **Code Changes**: If you're updating the documentation site itself (React components), make your changes in the `src/` directory.
4.  **Test Your Changes**: Run the development server locally to verify your changes.
    ```bash
    npm run dev
    ```
    Ensure `VITE_DOCS_ENV=development` is set if you are working on DEV-only content.
5.  **Commit Your Changes**: Commit your changes with a clear and descriptive commit message.
6.  **Push and Open a Pull Request**: Push your branch to your fork and open a Pull Request against the `main` branch of this repository.

## Style Guide

*   **Clarity and Conciseness**: Keep documentation clear and to the point.
*   **Code Examples**: Provide code examples whenever possible, especially for API endpoints.
*   **Consistency**: Follow the existing structure and tone of the documentation.
*   **Status**: Use `status: 'DEV'` for work-in-progress or internal-only features.

## Reporting Issues

If you find a bug or have a suggestion, please open an issue on GitHub. Include as much detail as possible to help us reproduce or understand the problem.

Thank you for helping us make the Rojifi documentation better!
