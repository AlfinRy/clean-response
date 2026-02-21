# Contributing to clean-response

Thank you for your interest in contributing to `clean-response`! This document provides guidelines and instructions for contributing.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Commit Messages](#commit-messages)
- [Pull Request Process](#pull-request-process)

## Code of Conduct

Be respectful, inclusive, and constructive. We aim to maintain a welcoming community for everyone.

## Getting Started

### Prerequisites

- Node.js >= 16.0.0
- npm (or yarn/pnpm)

### Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/your-username/clean-response.git
   cd clean-response/package
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Development Workflow

1. **Create a branch** from `main` or `master`:

   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

2. **Make your changes** following the coding standards below.

3. **Test your changes**:

   ```bash
   npm run test
   npm run lint
   npm run build
   ```

4. **Commit your changes** with a descriptive message (see [Commit Messages](#commit-messages)).

5. **Push to your fork**:

   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request** (see [Pull Request Process](#pull-request-process)).

## Coding Standards

### TypeScript

- Use TypeScript for all code
- Enable strict mode in `tsconfig.json`
- Provide JSDoc comments for all public APIs
- Use meaningful variable and function names

### Code Style

- Follow the existing code style
- Use 2 spaces for indentation
- Use single quotes for strings
- Add semicolons
- Use ESLint and Prettier (run `npm run lint:fix` before committing)

### Documentation

- Update README.md if you change the API
- Add examples for new features
- Update types.ts documentation

## Testing

- Write tests for all new features
- Maintain 100% test coverage
- Run tests with `npm run test`
- Use Vitest for testing

### Example Test

```typescript
import { describe, it, expect } from 'vitest';
import { success } from './success';

describe('success', () => {
  it('should create a success response', () => {
    const response = success({ id: 1 }, 'User created');
    expect(response).toEqual({
      success: true,
      message: 'User created',
      data: { id: 1 },
      timestamp: expect.any(String),
    });
  });
});
```

## Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Types

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples

```bash
feat: add validationError helper function
fix: resolve timestamp issue in error responses
docs: update README with new examples
test: add tests for paginate function
```

## Pull Request Process

1. Ensure your code passes all tests and linting
2. Update documentation if needed
3. Add a description of your changes in the PR
4. Reference related issues (e.g., "Fixes #123")
5. Wait for code review approval
6. Make requested changes if needed

### PR Title Format

Use the same format as commit messages:

```
feat: add validationError helper
fix: resolve timestamp in error responses
docs: update installation instructions
```

## Questions?

Feel free to open an issue with the `question` label if you have any questions about contributing.
