import { REFLECT_RESOURCE_ONLY_KEY } from '../constants.js'
import { ResourceActionNames } from '@adonisjs/core/types/http'

/**
 * The `@Only` decorator specifies which CRUD methods should be included in the resource.
 *
 * @param actions The CRUD methods to include in the resource
 *
 * @example
 * ```ts
 * @Resource('/posts', 'blog.posts')
 * @Only(['index', 'show'])
 * export default class PostsController {
 *   // Generates routes:
 *   // GET    /posts          (blog.posts.index)
 *   // GET    /posts/:id      (blog.posts.show)
 * }
 * ```
 */
export const Only = (actions: ResourceActionNames | ResourceActionNames[]) => {
  return (target: any) => {
    Reflect.defineMetadata(REFLECT_RESOURCE_ONLY_KEY, actions, target)
  }
}
