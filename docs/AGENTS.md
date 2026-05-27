---
name: "React typescript Mobile Application Development Guide"
description: "A comprehensive development guide for building modern mobile applications using Flutter, typescript, Riverpod, Freezed, Flutter Hooks, and Supabase with best practices and performance optimization"
author: "LucasSGonza"
---

# Flutter typescript Mobile Application Development Guide

## Project Overview

This comprehensive guide outlines best practices for developing modern mobile applications using Flutter, typescript, Riverpod for state management, Freezed for immutable data classes, Flutter Hooks for lifecycle management, and Supabase for backend services. The guide emphasizes functional and declarative programming patterns, performance optimization, and maintainable code architecture.

## Tech Stack

>TODO: transformar no seguinte padrão => {Stack}: {versão} => Node: v23.11.0 

- [Node v23.11.0](https://nodejs.org/pt-br)
- [Vite v8.0.12](https://vite.dev/)
- [React v19.2.6](https://react.dev/)
  - [React Compiler](https://react.dev/learn/react-compiler/introduction)
  - [React Router](https://reactrouter.com/home)
- [Typescript v6.0.2](https://www.typescriptlang.org/)
- [Supabase](https://supabase.com/)

## Development Environment Setup

### Installation Requirements

- **TODO** completar seção

### Installation Steps

- **TODO** completar seção

```bash
# Install dependencies

# Development dependencies

# Generate code
```

## Project Structure

- **TODO** completar seção

```

```

## Key Principles and Guidelines

### Core Development Philosophy

- **TODO** completar seção, adaptando para as tecnologias do projeto.

- Write concise, technical typescript code with accurate examples
- Use functional and declarative programming patterns where appropriate
- Prefer composition over inheritance
- Use descriptive variable names with auxiliary verbs (isLoading, hasError)
- Structure files: exported widget, subwidgets, helpers, static content, types

### Naming Conventions and Code Style

```typescript
// Use descriptive variable names with auxiliary verbs
bool isLoading = false;
bool hasError = false;
bool canSubmit = true;

// **TODO** completar com padroes de projeto React, como:
//  - criação de componentes;
//  - estilização dos componentes;
//  - uso de 'useState';
// ...

```

### File Structure Convention

- **TODO** completar seção para seguir o seguinte padrao:
  - Novo diretorio com o nome do Componente contendo: Componente.tsx + index.ts
  - Dentro do diretorio especifico de cada componente, caso for necessario, criar novo diretorio chamado "components"

```typescript

```

## Core Feature Implementation

- **TODO** completar seção, se necessario

### Freezed Data Models

- **TODO** completar seção, se necessario

```typescript
```

### Error Handling and Validation

- **TODO** completar seção

```typescript

```

## Flutter Hooks Integration

- **TODO** completar seção com hooks react

### Lifecycle Management with Hooks

- **TODO** completar seção

```typescript

```

### Supabase Integration

- **TODO** completar seção apos implementar Supabase no projeto

```typescript

```

## UI Components and Performance

- **TODO** completar seção

### Responsive Design and Theming

- **TODO** completar seção, se necessario

### Navigation with React Router

- **TODO** completar seção

```typescript

```

## Best Practices Summary

- **TODO** completar seção, adaptando para o cenario do projeto

### Code Quality Guidelines

- **Use const constructors** for immutable widgets to optimize rebuilds
- **Leverage Freezed** for immutable state classes and unions
- **Prefer composition over inheritance** for better code reusability
- **Use descriptive variable names** with auxiliary verbs (isLoading, hasError)
- **Structure files properly** with exported widgets, subwidgets, helpers, and types
- **Implement proper error handling** using SelectableText.rich for error display
- **Use AsyncValue** for proper error handling and loading states

### Riverpod State Management

- **Use @riverpod annotation** for generating providers automatically
- **Prefer AsyncNotifierProvider and NotifierProvider** over StateProvider
- **Avoid StateProvider, StateNotifierProvider, and ChangeNotifierProvider**
- **Use ref.invalidate()** for manually triggering provider updates
- **Implement proper cancellation** of asynchronous operations when widgets are disposed

### Performance Optimization

- **Use const widgets** where possible to optimize rebuilds
- **Implement ListView.builder** for large lists instead of ListView with children
- **Use AssetImage for static images** and cached_network_image for remote images
- **Implement proper error handling** for Supabase operations, including network errors
- **Use RefreshIndicator** for pull-to-refresh functionality
- **Always include errorBuilder** when using Image.network

### UI and Styling Best Practices

- **Create small, private widget classes** instead of methods like Widget \_build...
- **Set appropriate textCapitalization, keyboardType, and textInputAction** in TextFields
- **Use Theme.of(context).textTheme.titleLarge** instead of deprecated headline6
- **Implement responsive design** using LayoutBuilder or MediaQuery
- **Use themes for consistent styling** across the app
- **Handle empty states** within the displaying screen

### Development Workflow

- **Use build_runner** for generating code from annotations (Freezed, Riverpod, JSON)
- **Run code generation** after modifying annotated classes
- **Use log instead of print** for debugging
- **Keep lines no longer than 80 characters** with trailing commas
- **Document complex logic** and non-obvious code decisions
- **Follow official documentation** for Flutter, Riverpod, and Supabase best practices

This comprehensive guide provides a solid foundation for building scalable, maintainable Flutter applications with modern state management, proper error handling, and performance optimization.