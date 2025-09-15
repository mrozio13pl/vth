export interface ProjectOptions {
    name: string;
    packageName: string;
    lite?: boolean;
    nolyfill?: boolean;
    rolldown?: boolean;
    override?: boolean;
    skipPrompts: boolean;
}
