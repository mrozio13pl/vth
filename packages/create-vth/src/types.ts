export interface ProjectOptions {
    name: string;
    packageName: string;
    lite?: boolean;
    install?: boolean;
    nolyfill?: boolean;
    rolldown?: boolean;
    override?: boolean;
    skipPrompts: boolean;
}
