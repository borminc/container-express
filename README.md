# Container Express

A **_quite opinionated_** starting point for express apps with built-in container implementation.

### Idea

The idea of this setup to utilize the use of a "container" to resolve dependencies. In practice, this just means that instead of creating class instances when you need their functionalities, you ask the container to provide you with those instances without **_having to care about how to create those instances yourself_**. Containers make it easy to configure your dependencies (which may have many other dependencies, which may also have other dependencies, and so on), register them in the container, and use them throughout the application.

### Implementation

The implementation of the container in this project is a _very_ simple one without too much magic or complexity. You register dependencies and use them — end of story. No automatic injection or anything.

### Modules

The project structure is organized in modules (see `src/modules`), where each module can be anything that provides some sort of functionality to the application. All you need to do to add a module is:

1. Create a new folder with the name of your module in the `src/modules`. (This is just by the project's convention).
1. The only thing a module needs is a class that extends the `Provider` class (see `src/foundation/provider.js`).

   1. In this class, you may register your services in the container in the `register()` method. Note that once registered in the container, the services can be resolved in your application code later (e.g., controller).

      Example:

      ```javascript
      // in Provider.register()
      this.container.register('auth', container => new AuthService()); // transient
      this.container.register('auth', container => new AuthService(), true); // singleton

      // somewhere else
      this.container.get('auth'); // returns an instance of AuthService
      this.container.get('auth') === this.container.get('auth'); // returns true if singleton; else false
      ```

   1. Boot your module in the `boot()` method. "Boot" is basically called when the app boots, by which time all services should already have been registered. You can do anything here; for example, you can set up routers here if you want to.

   1. There is the method `booted()` if you want to do anything after every service has booted.

   1. In the provider class, you have access to the whole app instance through `this.app`, so you can really do anything you want. For example, you have all the power with the entire express app instance: `this.app.express`.

   1. That's about it. All a module needs is this one Provider class. The rest is up to you where you put your stuff in your module (controller, route, service...). See `src/modules/auth` for an example module.

### Running the app

```bash
   npm run start
   npm run dev # watch file changes
```
