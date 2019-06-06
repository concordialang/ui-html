import { Command, flags } from '@oclif/command';
export default class Generate extends Command {
    static description: string;
    static flags: {
        help: import("@oclif/parser/lib/flags").IBooleanFlag<void>;
        features: flags.IOptionFlag<string>;
        outputDir: flags.IOptionFlag<string>;
    };
    run(): Promise<void>;
}
