// Allow importing local .js modules without declaration files
declare module '*.js';
// uuid v9 ships types but doesn't expose them via Node module resolution
declare module 'uuid';
