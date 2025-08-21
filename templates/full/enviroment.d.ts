interface Env {
    PORT: string;
    BETTER_AUTH_URL: string;
}

namespace NodeJS {
    interface ProcessEnv extends Env {};
}

interface ImportMetaEnv extends Env {};
