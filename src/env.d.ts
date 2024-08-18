/* eslint-disable unicorn/no-abusive-eslint-disable */
/* eslint-disable */
/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
type Runtime = import("@astrojs/cloudflare").Runtime<Env>;

declare namespace App {
	type Locals = {} & Runtime;
}
