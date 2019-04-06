'use strict';

/**
 * Store.js controller
 *
 * @description: A set of functions called "actions" for managing `Store`.
 */

module.exports = {

  /**
   * Retrieve store records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.store.search(ctx.query);
    } else {
      return strapi.services.store.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a store record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    return strapi.services.store.fetch(ctx.params);
  },

  /**
   * Count store records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.store.count(ctx.query);
  },

  /**
   * Create a/an store record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.store.add(ctx.request.body);
  },

  /**
   * Update a/an store record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.store.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an store record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.store.remove(ctx.params);
  }
};
