import { REFLECT_RESOURCE_KEY, REFLECT_RESOURCE_NAME_KEY } from '../constants.js'

/**
 * The Resource decorator automatically defines RESTful routes for a controller.
 *
 * @param pattern The base URL pattern for the resource
 * @param name Optional name prefix for the resource routes
 *
 * @example
 * ```ts
 * @Resource('/posts', 'blog.posts')
 * export default class PostsController {
 *   // Generates routes:
 *   // GET    /posts          (blog.posts.index)
 *   // GET    /posts/create   (blog.posts.create)
 *   // POST   /posts          (blog.posts.store)
 *   // GET    /posts/:id      (blog.posts.show)
 *   // GET    /posts/:id/edit (blog.posts.edit)
 *   // PUT    /posts/:id      (blog.posts.update)
 *   // DELETE /posts/:id      (blog.posts.destroy)
 * }
 * ```
 */
export const Resource = (pattern: string, name?: string) => {
  return (target: any) => {
    Reflect.defineMetadata(REFLECT_RESOURCE_KEY, pattern, target)
    if (name) {
      Reflect.defineMetadata(REFLECT_RESOURCE_NAME_KEY, name, target)
    }
  }
}
