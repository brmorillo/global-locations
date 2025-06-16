# Contributing to @brmorillo/global-locations

Thank you for your interest in contributing to this project! Here are some guidelines to help you get started.

## Development Setup

1. Fork and clone the repository
2. Install dependencies: `npm install`
3. Setup husky hooks: `npm run prepare`

## Development Workflow

1. Create a new branch for your feature or bugfix
2. Make your changes
3. Run tests: `npm test`
4. Ensure code quality: `npm run lint`
5. Format code: `npm run format`
6. Commit your changes using commitizen: `npm run commit`
7. Push your branch and create a pull request

## Commit Guidelines

This project uses [Conventional Commits](https://www.conventionalcommits.org/) for commit messages. Please use the `npm run commit` command which will guide you through creating a properly formatted commit message.

## Release Process

Releases are managed using [standard-version](https://github.com/conventional-changelog/standard-version). The maintainers will handle the release process.

## Code Style

This project uses ESLint and Prettier for code style and formatting. Please ensure your code follows these standards by running:

```bash
npm run lint
npm run format
```

## Testing

Please include tests for any new features or bug fixes. Run the test suite with:

```bash
npm test
```

## License

By contributing to this project, you agree that your contributions will be licensed under the project's MIT license.