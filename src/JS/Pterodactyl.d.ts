import NodeactylApplication from "nodeactyl/src/application/Application";

declare module 'Pterodactyl'
export default class Pterodactyl {
    private panel: NodeactylApplication;
    private id: string
    public runCommand(command: string)
    constructor(host: string | undefined, key: string | undefined, id: string | undefined)
}