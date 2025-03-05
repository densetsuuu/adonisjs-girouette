<div align="center">
  <a href="https://discord.gg/9sHEwRUxFk">
    <img src="https://dcbadge.vercel.app/api/server/9sHEwRUxFk">
  </a>
</div>

</br>
</br>

![Statements](https://img.shields.io/badge/statements-98.02%25-brightgreen.svg?style=flat)
![Branches](https://img.shields.io/badge/branches-90.8%25-brightgreen.svg?style=flat)
![Functions](https://img.shields.io/badge/functions-96.96%25-brightgreen.svg?style=flat)
![Lines](https://img.shields.io/badge/lines-98.02%25-brightgreen.svg?style=flat)

# Girouette

> Elegant decorator-based routing for AdonisJS v6

## Introduction

Girouette provides a beautiful, fluent API for defining your AdonisJS routes using decorators. By bringing route definitions closer to your controller methods, Girouette makes your application's routing more intuitive and maintainable.

## Installation

You can install Girouette via the AdonisJS CLI:

```bash
node ace add @softwarecitadel/girouette
```

## Basic Routing

After installation, you can start using decorators to define your routes.

By convention, Girouette will scan all files in the `./app` folder that end with `_controller.ts`.

Import the decorators you need in your controller:

```typescript
import {
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Any,
  Middleware,
  ResourceMiddleware,
  GroupMiddleware,
  Resource,
  Except,
  Only,
  ApiOnly,
  Where,
  Group,
  GroupDomain,
} from '@softwarecitadel/girouette'
import { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  @Get('/users')
  async index({ response }: HttpContext) {
    // Handle GET request
  }

  @Post('/users')
  async store({ request }: HttpContext) {
    // Handle POST request
  }
}
```

## Route Groups

Girouette provides several decorators for grouping routes:

```typescript
import { Group, GroupMiddleware, GroupDomain } from '@softwarecitadel/girouette'
import { middleware } from '#start/kernel'

@Group({ name: 'admin', prefix: '/admin' }) // Name prefix and URL prefix
@GroupMiddleware([middleware.auth()]) // Shared middleware
@GroupDomain('admin.example.com') // Domain restriction
export default class AdminController {
  @Get('/dashboard', 'admin.dashboard') // Final URL: /admin/dashboard
  async index() {
    // Route name: admin.dashboard
    // Protected by auth middleware
    // Only accessible via admin.example.com
  }
}
```

The `@Group` decorator accepts a configuration object with the following options:

```typescript
// Just a name prefix
@Group({ name: 'api' })
export class ApiController {}

// Just a URL prefix
@Group({ prefix: '/api' })
export class ApiController {}

// Both at once
@Group({ name: 'api', prefix: '/api/v1' })
export class ApiController {}
```

## Route Middleware

You can protect your routes using middleware through the `Middleware` decorator:

```typescript
import { Get, Middleware } from '@softwarecitadel/girouette'
import { middleware } from '#start/kernel'

export default class UsersController {
  @Get('/profile')
  @Middleware([middleware.auth()])
  async show({ auth }: HttpContext) {
    // Only authenticated users can access this route
  }
}
```

## Resource Controllers

For RESTful resources, Girouette provides a `Resource` decorator that automatically defines conventional routes:

```typescript
import { Resource } from '@softwarecitadel/girouette'

@Resource('/posts', 'posts')
export default class PostsController {
  async index() {} // GET /posts
  async create() {} // GET /posts/create
  async store() {} // POST /posts
  async show() {} // GET /posts/:id
  async edit() {} // GET /posts/:id/edit
  async update() {} // PUT/PATCH /posts/:id
  async destroy() {} // DELETE /posts/:id
}
```

## Route Constraints

Use the `Where` decorator to add constraints to your route parameters:

```typescript
import { Get, Where } from '@softwarecitadel/girouette'

export default class PostsController {
  @Get('/posts/:slug')
  @Where('slug', /^[a-z0-9-]+$/)
  async show({ params }: HttpContext) {
    // Only matches if slug contains lowercase letters, numbers, and hyphens
  }
}
```

## Available Decorators

### HTTP Methods

- `@Get(pattern: string, name?: string)`
- `@Post(pattern: string, name?: string)`
- `@Put(pattern: string, name?: string)`
- `@Patch(pattern: string, name?: string)`
- `@Delete(pattern: string, name?: string)`
- `@Any(pattern: string, name?: string)`

### Route Configuration

- `@Group(name?: string)` - Define optional route name prefix
- `@GroupDomain(domain: string)` - Restrict routes to a specific domain
- `@GroupMiddleware(middleware: Middleware[])` - Apply middleware to all routes
- `@Middleware(middleware: Middleware[])` - Apply middleware to a single route
- `@Resource(pattern: string, name?: string)` - Create RESTful resource routes
- `@Except(actions: ResourceActionNames | ResourceActionNames[])` - Exclude route actions from the resource
- `@Only(actions: ResourceActionNames | ResourceActionNames[])` - Include only specified route actions in the resource
- `@ApiOnly()` - Include only API resource actions in the resource (index, store, show, update, destroy)
- `@ResourceMiddleware(actions: string | string[], middleware: Middleware[])` - Apply middleware to resource actions
- `@Where(param: string, matcher: string | RegExp | Function)` - Add route parameter constraints

## Advanced Usage

### Combining Multiple Decorators

Decorators can be combined to create sophisticated routing configurations:

```typescript
import { Get, Middleware, Where } from '@softwarecitadel/girouette'
import { middleware } from '#start/kernel'

@Group('/api')
export default class ArticlesController {
  @Get('/articles/:id')
  @Middleware([middleware.auth()])
  @Where('id', /^\d+$/)
  async show({ params }: HttpContext) {
    // Protected route with parameter validation
  }
}
```

### Resource Middleware

Apply middleware to specific resource actions:

```typescript
import { Resource, ResourceMiddleware } from '@softwarecitadel/girouette'
import { middleware } from '#start/kernel'

@Resource('/admin/posts', 'admin.posts')
@ResourceMiddleware(['store', 'update', 'destroy'], [middleware.auth()])
export default class AdminPostsController {
  // Only store, update, and destroy methods are protected
}
```

Removing route actions from the resource (e.g., `destroy`):

```typescript
import { Resource, Except } from '@softwarecitadel/girouette'

@Resource('/admin/posts', 'admin.posts')
@Except('destroy')
export default class AdminPostsController {
  // The destroy method is not included in the resource
}
```

Api only resource:

```typescript
import { Resource, ApiOnly } from '@softwarecitadel/girouette'

@Resource('/admin/posts', 'admin.posts')
@ApiOnly()
export default class AdminPostsController {
  // The create and edit methods are not included in the resource, because they are
  // meant to display forms, which is not needed in an API
}
```

## Compatibility with others third-party packages

### [Tuyau](https://tuyau.julr.dev/docs/installation)

Tuyau is a set of tools created to build typesafe APIs with AdonisJS. Girouette is fully compatible with Tuyau **E2E Typesafe client**, and you can use both packages together to create a powerful and elegant API.

Feel free to check out the [Tuyau documentation](https://tuyau.julr.dev/docs/installation) to learn more about how to use it.

## License

Girouette is open-sourced software licensed under the [MIT license](./LICENSE.md).
