import { HttpContext } from '@adonisjs/core/http'
import { NextFn } from '@adonisjs/core/types/http'

export const fakeMiddleware = async ({}: HttpContext, next: NextFn) => {
  next()
}

export interface Route {
  domain: string
  pattern: string
  matchers: Record<string, unknown>
  meta: Record<string, unknown>
  name: string
  handler: {
    reference: any[]
    name: string
    handle: (...args: any[]) => Promise<any>
  }
  methods: string[]
  middleware: unknown
  execute: (...args: any[]) => any
}

export interface ResourceRoute {
  routes: Route[]
}

export const parseControllerMethod = (route: any) => {
  return route.split('.').at(-1)
}

export const HTTP_METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'ANY', 'HEAD']

export const RESOURCE_METHODS = ['index', 'store', 'show', 'update', 'destroy', 'edit', 'create']
