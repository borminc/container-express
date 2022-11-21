import Service from './service';

class Provider extends Service {
	/**
	 * Register services into the container
	 *
	 * Warning: Since the container is being populated with services at this stage,
	 * don't get any service from the container. Do it in boot() instead when all services
	 * are registered.
	 *
	 * @returns {void}
	 */
	register() {}

	/**
	 * Boot the module after all services are registered in the container
	 *
	 * @returns {void}
	 */
	boot() {}

	/**
	 * Do any additional configs after all services are booted
	 *
	 * @returns {void}
	 */
	booted() {}
}

export default Provider;
