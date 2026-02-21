# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Convenience HTTP methods: `created`, `noContent`, `unauthorized`, `forbidden`, `notFound`, `validationError`
- Enhanced error response with `errors`, `stack`, `requestId`, and `details` fields
- TypeScript utility types: `InferData`, `InferErrorCode`
- Field-level error support for validation errors

## [1.0.0] - 2024-01-XX

### Added

- Initial release
- `success()` function for success responses
- `error()` function for error responses
- `paginate()` function for paginated responses
- TypeScript type definitions
- Zero runtime dependencies
- Framework agnostic (Express, Fastify, Node.js)
